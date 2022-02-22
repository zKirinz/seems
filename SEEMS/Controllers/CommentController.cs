using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controller
{
    [Route("api/Comments")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "v1")]
    public class CommentController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthManager _authManager;
        private IRepositoryManager _repoManager;
        public CommentController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager, IRepositoryManager repoManager)
        {
            _context = context;
            _mapper = mapper;
            _authManager = authManager;
            _repoManager = repoManager;
        }

        // POST api/Comments/
        // Create a comment
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentDTO item)
        {
            CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToCreateComment(item);
            
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));

                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    if (commentValidationInfo != null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                    }

                    string checkReference = CheckValidCheckReference(item.EventId, item.ParentCommentId);

                    if (!checkReference.Contains("OK"))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", checkReference));
                    }

                    var newComment = _mapper.Map<Comment>(item);
                    newComment.UserId = userId;

                    _context.Comments.Add(newComment);
                    _context.SaveChanges();

                    var responseComment = CommentsServices.AddMoreInformationsToComment(newComment, _context, _mapper);
                    return Ok(new Response(ResponseStatusEnum.Success, responseComment));
                } else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }

        }

        // PUT api/Comments/
        // Edit comment by Id
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CommentDTO newComment)
        {
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToEditComment(newComment);

                    if (!CheckValidCommentId(id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));
                    }

                    if (commentValidationInfo != null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                    }

                    if (!CheckValidToAffectComment(userId, null, id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have the permission to edit this comment."));
                    }

                    var comment = _context.Comments.FirstOrDefault(c => c.Id == id);
                    comment.CommentContent = newComment.CommentContent;
                    _context.Comments.Update(comment);
                    _context.SaveChanges(true);

                    var responseComment = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                    return Ok(new Response(ResponseStatusEnum.Success, responseComment));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to edit comment"));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }
        }

        //PUT api/Comments
        //Like and unlike Comment
        [HttpPut]
        public async Task<IActionResult> ReactComment([FromForm] CommentId comment)
        {
            var commentId = comment.reactCommentId;
            if (!CheckValidCommentId(commentId))
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Fail"));
            }

            var currentUser = GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Fail"));
            }
            var userId = currentUser.Id;

            var likeComment = _context.LikeComments.Where(c => c.UserId == userId).Where(c => c.CommentId == commentId).FirstOrDefault();
            if (likeComment == null)
            {
                LikeComment newLikeComment = new LikeComment
                {
                    CommentId = commentId,
                    UserId = userId,
                };

                _context.LikeComments.Add(newLikeComment);
            }
            else
            {
                _context.LikeComments.Remove(likeComment);
            }

            _context.SaveChanges();
            var numberLikeComment = _context.LikeComments.Where(c => c.CommentId == commentId).Count();

            return Ok(new Response(ResponseStatusEnum.Success, numberLikeComment));
        }

        // DELETE api/Comments/
        // Delete comment by Id
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    var role = GetCurrentUserMeta(currentUser).MetaValue;

                    if (!CheckValidCommentId(id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));
                    }

                    if (!CheckValidToAffectComment(userId, role, id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have the permission to delête this comment."));
                    }

                    var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
                    var listSubComment = _context.Comments.Where(x => x.ParentCommentId == id).ToList();
                    foreach (var subComment in listSubComment)
                    {
                        _context.Comments.Remove(subComment);
                    }
                    _context.Comments.Remove(comment);
                    _context.SaveChanges(true);

                    return Ok(new Response(ResponseStatusEnum.Success, "", "Delete successfully"));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to delete comment"));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }
        }

        // POST api/Comments/
        // Load comment
        [HttpPost("{id}")]
        public async Task<IActionResult> LoadComments(int id, [FromBody] CommentsLoadMoreDTO data)
        {
            try
            {
                var user = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                var userId = user.Id;

                if (data.numberComments == null || data.numberComments <= 0)
                {
                    data.numberComments = 5;
                }
                int numberComments = (int)data.numberComments;             

                if (data.action.Contains("load"))
                {
                    if (!CommentsServices.CheckValidEventId(id, _context))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid EventId."));
                    }

                    var listComment = _context.Comments.Where(x => x.EventId == id).Where(x => x.ParentCommentId == null).ToList();
                    listComment = listComment.OrderByDescending(x => x.CreatedAt).ToList();
                    List<CommentDTO> listResponseComments = new List<CommentDTO>();
                    foreach (var comment in listComment)
                    {
                        CommentDTO commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                        commentDTO.NumberReplyComment = _context.Comments.Where(x => x.ParentCommentId == comment.Id).Count();
                        if (commentDTO.NumberReplyComment == 0)
                        {
                            commentDTO.NumberReplyComment = null;
                        }
                        var numberLikeComment = _context.LikeComments.Where(c => c.CommentId == comment.Id).Count();
                        if (user != null)
                        {
                            var likeComment = _context.LikeComments.Where(c => c.UserId == userId).Where(c => c.CommentId == comment.Id).FirstOrDefault();
                            if (likeComment == null)
                            {
                                commentDTO.IsLike = false;
                            }
                            else
                            {
                                commentDTO.IsLike = true;
                            }
                        }
                        else
                        {
                            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid token."));
                        }
                        listResponseComments.Add(commentDTO);
                    }

                    bool hasMoreComment = (listResponseComments.Count > numberComments);

                    if (data.lastCommentId == null)
                    {
                        listResponseComments = listResponseComments.GetRange(0, Math.Min(listResponseComments.Count(), numberComments)).ToList();
                    }
                    else
                    {
                        var lastCommentId = (int)data.lastCommentId;
                        var lastCommentIndex = listResponseComments.FindIndex(x => x.Id == lastCommentId);
                        int range = Math.Min(listResponseComments.Count() - (lastCommentIndex + 1), numberComments);
                        if (lastCommentIndex != -1)
                        {
                            hasMoreComment = ((listResponseComments.Count() - (lastCommentIndex + 1)) > numberComments);
                            listResponseComments = listResponseComments.GetRange(lastCommentIndex + 1, range).ToList();
                        }
                        else
                        {
                            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid LastCommentId."));
                        }
                    }

                    return Ok(new Response(ResponseStatusEnum.Success,
                                           new
                                           {
                                               hasMoreComment,
                                               listResponseComments,
                                           }));
                } 
                else if (data.action.Contains("reply")) 
                {
                    if (!CommentsServices.CheckValidCommentId(id, _context))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));
                    }

                    var listReplyComment = _context.Comments.Where(x => x.ParentCommentId == id).ToList();
                    listReplyComment = listReplyComment.OrderByDescending(x => x.CreatedAt).ToList();
                    List<CommentDTO> listResponseReplyComments = new List<CommentDTO>();
                    foreach (var comment in listReplyComment)
                    {
                        CommentDTO commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                        var numberLikeComment = _context.LikeComments.Where(c => c.CommentId == comment.Id).Count();
                        if (user != null)
                        {
                            var likeComment = _context.LikeComments.Where(c => c.UserId == userId).Where(c => c.CommentId == comment.Id).FirstOrDefault();
                            if (likeComment == null)
                            {
                                commentDTO.IsLike = false;
                            }
                            else
                            {
                                commentDTO.IsLike = true;
                            }
                        }
                        else
                        {
                            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid token."));
                        }
                        listResponseReplyComments.Add(commentDTO);
                    }

                    bool hasMoreComment = (listResponseReplyComments.Count > numberComments);

                    if (data.lastCommentId == null)
                    {
                        listResponseReplyComments = listResponseReplyComments.GetRange(0, Math.Min(listResponseReplyComments.Count(), numberComments)).ToList();
                    }
                    else
                    {
                        var lastCommentId = (int)data.lastCommentId;
                        var lastCommentIndex = listResponseReplyComments.FindIndex(x => x.Id == lastCommentId);
                        int range = Math.Min(listResponseReplyComments.Count() - (lastCommentIndex + 1), numberComments);
                        if (lastCommentIndex != -1)
                        {
                            hasMoreComment = ((listResponseReplyComments.Count() - (lastCommentIndex + 1)) > numberComments);
                            listResponseReplyComments = listResponseReplyComments.GetRange(lastCommentIndex + 1, range).ToList();
                        }
                        else
                        {
                            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid commentId"));
                        }
                    }

                    return Ok(new Response(ResponseStatusEnum.Success,
                                           new
                                           {
                                               hasMoreComment,
                                               listResponseReplyComments,
                                           }));
                } 
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid action"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }

        }

        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);

        private UserMeta GetCurrentUserMeta(User user)
        {
            var userMeta = _context.UserMetas.FirstOrDefault(x => x.User == user);
            return userMeta;
        }

        private string CheckValidCheckReference(int? eventId, int? parentCommentId)
        {
            var anEvent = _context.Events.FirstOrDefault(x => x.Id == eventId);
            var anComment = _context.Comments.FirstOrDefault(x => x.Id == parentCommentId);

            if (anEvent == null)
            {
                if (anComment == null && parentCommentId != null)
                {
                    return "Invalid EventId and ParentCommentId."; //eventId and parentCommentId are not valid
                }
                else
                {
                    return "Invalid EventId."; //eventId is not valid
                }
            }
            else if (anComment == null && parentCommentId != null)
            {
                return "Invalid ParentCommentId"; //parentCommentId is not valid
            }
            else
            {
                return "OK";  //eventId and parentCommentId are valid
            }
        }

        private bool CheckValidCommentId(int? commentId)
        {
            var comment = _context.Comments.FirstOrDefault(x => x.Id == commentId);
            return comment != null;
        }

        private bool CheckValidToAffectComment(int? userId, string? role, int? commentId)
        {
            var comment = _context.Comments.FirstOrDefault(x => x.Id == commentId);

            if (role == null)
            {
                if (userId != comment.UserId)
                {
                    return false;
                }
            }
            else
            {
                if (userId != comment.UserId && role.Contains(RoleTypes.CUSR))
                {
                    return false;
                }
            }

            return true;
        }

        private IActionResult ResponseComment(List<Comment> listComments, int? lastCommentId, int numberComments, int id, string action)
        {
            listComments = listComments.OrderByDescending(x => x.CreatedAt).ToList();
            List<CommentDTO> listResponseComments = new List<CommentDTO>();
            foreach (var comment in listComments)
            {
                CommentDTO commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                if (action.Contains("load"))
                {
                    commentDTO.NumberReplyComment = _context.Comments.Where(x => x.ParentCommentId == comment.Id).Count();
                    if (commentDTO.NumberReplyComment == 0)
                    {
                        commentDTO.NumberReplyComment = null;
                    }
                }
                listResponseComments.Add(commentDTO);
            }

            bool hasMoreComment = (listResponseComments.Count > numberComments);
            if (lastCommentId == null)
            {
                listResponseComments = listResponseComments.GetRange(0, Math.Min(listResponseComments.Count(), numberComments)).ToList();
            }
            else
            {
                var lastCommentIndex = listResponseComments.FindIndex(x => x.Id == lastCommentId);
                int range = Math.Min(listResponseComments.Count() - (lastCommentIndex + 1), numberComments);
                if (lastCommentIndex != -1)
                {
                    hasMoreComment = ((listResponseComments.Count() - (lastCommentIndex + 1)) > numberComments);
                    listResponseComments = listResponseComments.GetRange(lastCommentIndex + 1, range).ToList();
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid LastCommentId."));
                }
            }

            return Ok(new Response(ResponseStatusEnum.Success,
                                           new
                                           {
                                               hasMoreComment,
                                               listResponseComments,
                                           }));
        }
    }
}
