using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
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
        }

        // POST api/<CommentController>
        // Create a comment
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentDTO item)
        {
            CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToCreateComment(item);
            
            try
            {
                if (commentValidationInfo != null)
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                }
                
                int numberOfError = CheckValidCheckReference(item.EventId, item.ParentCommentId);

                switch (numberOfError)
                {
                    case 1: return BadRequest(new Response(ResponseStatusEnum.Fail, "", "EventId does not exist."));

                    case 2: return BadRequest(new Response(ResponseStatusEnum.Fail, "", "ParentCommentId does not exist."));

                    case 3: return BadRequest(new Response(ResponseStatusEnum.Fail, "", "EventId and ParentCommentId do not exist."));
                }

                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                var userId = currentUser.Id;
                var newComment = _mapper.Map<Comment>(item);
                newComment.UserId = userId;

                _context.Comments.Add(newComment);
                _context.SaveChanges();

                var responseComment = CommentsServices.AddMoreInformationsToComment(newComment, _context, _mapper);
                return Ok(new Response(ResponseStatusEnum.Success, responseComment));

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }

        }

        // PUT api/<CommentController>/
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
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "CommentId does not exist."));
                    }

                    if (commentValidationInfo != null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                    }

                    if (!CheckValidToAffectComment(userId, null, id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have the permission to edit this comment."));
                    }

                    var comment = _context.Comments.FirstOrDefault(c => c.Id == newComment.Id);
                    comment.CommentContent = newComment.CommentContent;
                    _context.Comments.Update(comment);
                    _context.SaveChanges(true);

                    var responseComment = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                    return Ok(new Response(ResponseStatusEnum.Success, responseComment));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }
        }

        // DELETE api/<CommentController>/
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
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "CommentId does not exist."));
                    }

                    if (!CheckValidToAffectComment(userId, role, id))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have the permission to delête this comment."));
                    }

                    var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
                    _context.Comments.Remove(comment);
                    _context.SaveChanges(true);

                    return Ok(new Response(ResponseStatusEnum.Success, "", "Delete successfully"));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }
        }

        [HttpPost("{id}")]
        public IActionResult LoadComments(int id, [FromBody] CommentsLoadMoreDTO data)
        {
            try
            {
                int numberComments;

                if (data.numberComments == null || data.numberComments <= 0)
                {
                    numberComments = 5;
                }
                else
                {
                    numberComments = (int)data.numberComments;
                }

                if (!CommentsServices.CheckValidEventId(id, _context))
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This events does not exist"));
                }

                var listComment = _context.Comments.Where(x => x.EventId == id).Where(x => x.ParentCommentId == null).ToList();

                listComment = listComment.OrderByDescending(x => x.CreatedAt).ToList();
                List<CommentDTO> listResponseComments = new List<CommentDTO>();
                foreach (var comment in listComment)
                {
                    CommentDTO commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
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
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid comment id"));
                    }
                }

                return Ok(new Response(ResponseStatusEnum.Success,
                                       new
                                       {
                                           hasMoreComment,
                                           listResponseComments,
                                       }));
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

        private int CheckValidCheckReference(int? eventId, int? parentCommentId)
        {
            var anEvent = _context.Events.FirstOrDefault(x => x.Id == eventId);
            var anComment = _context.Comments.FirstOrDefault(x => x.Id == parentCommentId);

            if (anEvent == null)
            {
                if (anComment == null && parentCommentId != null)
                {
                    return 3;
                }
                else
                {
                    return 1;
                }
            }
            else if (anComment == null && parentCommentId != null)
            {
                return 2;
            }
            else
            {
                return 0;
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

    }
}
