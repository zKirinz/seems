using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
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
        public CommentController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager)
        {
            this._context = context;
            this._mapper = mapper;
            this._authManager = authManager;
        }

        // GET api/<CommentController>
        // Get all comment by EventId

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if (!CommentsServices.CheckValidEventId(id, _context))
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This event does not exist"));
                }

                var listComment = _context.Comments.Where(c => c.EventId == id).ToList();

                if (!listComment.Any())
                {
                    return NotFound(new Response(ResponseStatusEnum.Success, "", "This event has no comments"));
                }

                List<CommentDTO> listResponseComments = new List<CommentDTO>();
                foreach (var comment in listComment)
                {
                    CommentDTO commentDTO = _mapper.Map<CommentDTO>(comment);
                    commentDTO.ImageUrl = CommentsServices.GetImageUrlNameByUserId(comment.UserId, _context);
                    commentDTO.UserName = CommentsServices.GetUserNameByUserId(comment.UserId, _context);
                    commentDTO.Email = CommentsServices.GetEmailByUserId(comment.UserId, _context);
                    listResponseComments.Add(commentDTO);
                }

                listResponseComments = listResponseComments.OrderByDescending(x => x.CreatedAt).ToList();
                return Ok(new Response(ResponseStatusEnum.Success, listResponseComments));
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }

        }

        // POST api/<CommentController>
        // Create a comment
        [HttpPost]
        public IActionResult Post([FromBody] CommentDTO item)
        {
            try
            {
                int? userId = null;
                if (Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
                {
                    string token = headers.First();
                    userId = CommentsServices.GetUserIdByToken(token, _authManager, _context);
                    if (userId == null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You don't have permission for this request"));
                    }
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

                CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToCreateComment(item, _context);

                if (commentValidationInfo != null)
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                }

                item.UserId = userId;
                var newComment = _mapper.Map<Comment>(item);

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
        public IActionResult Put(int id, [FromBody] CommentDTO newComment)
        {
            try
            {
                newComment.Id = id;
                int? userId = null;
                if (Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
                {
                    string token = headers.First();
                    userId = CommentsServices.GetUserIdByToken(token, _authManager, _context);
                    if (userId == null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You don't have permission for this request"));
                    }
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

                CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToEditComment(userId, newComment, _context);
                if (commentValidationInfo != null)
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
                }

                var comment = _context.Comments.FirstOrDefault(c => c.Id == id);
                comment.CommentContent = newComment.CommentContent;
                _context.Comments.Update(comment);
                _context.SaveChanges(true);

                var responseComment = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                return Ok(new Response(ResponseStatusEnum.Success, responseComment));

            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
            }
        }

        // DELETE api/<CommentController>/
        // Delete comment by Id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                int? userId = null;
                string role;
                if (Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
                {
                    string token = headers.First();
                    userId = CommentsServices.GetUserIdByToken(token, _authManager, _context);
                    role = CommentsServices.GetRoleByToken(token, _authManager, _context);
                    if (userId == null || role == null)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You don't have permission for this request"));
                    }
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

                if (userId == null || role == null)
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
                }

                var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
                _context.Comments.Remove(comment);
                _context.SaveChanges(true);

                return Ok(new Response(ResponseStatusEnum.Success, "", "Delete successfully"));
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
    }
}
