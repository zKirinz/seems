using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controller;

[Route("api/Comments")]
[ApiController]
[ApiExplorerSettings(GroupName = "v1")]
public class CommentController : ControllerBase
{
    private readonly IAuthManager _authManager;

    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public CommentController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager,
        IRepositoryManager repoManager)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _repoManager = repoManager;
    }

    // POST api/Comments/
    // Create a comment
    [HttpPost]
    [CheckUserStatus]
    public async Task<IActionResult> Post([FromBody] CommentDTO item)
    {
        var commentValidationInfo = CommentsServices.GetValidatedToCreateComment(item);

        try
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));

            if (currentUser != null)
            {
                var userId = currentUser.Id;
                if (commentValidationInfo != null)
                    return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));

                var checkReference = CheckValidCheckReference(item.EventId, item.ParentCommentId);

                if (!checkReference.Contains("OK"))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", checkReference));

                var newComment = _mapper.Map<Comment>(item);
                newComment.UserId = userId;

                _context.Comments.Add(newComment);
                _context.SaveChanges();

                var responseComment = CommentsServices.AddMoreInformationsToComment(newComment, _context, _mapper);
                return Ok(new Response(ResponseStatusEnum.Success, responseComment));
            }

            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to comment"));
        }
        catch (Exception ex)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
        }
    }

    // PUT api/Comments/
    // Edit comment by Id
    [HttpPut("{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> Put(int id, [FromBody] CommentDTO newComment)
    {
        try
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser != null)
            {
                var userId = currentUser.Id;
                var commentValidationInfo = CommentsServices.GetValidatedToEditComment(newComment);

                if (!CheckValidCommentId(id))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));

                if (commentValidationInfo != null)
                    return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));

                if (!CheckValidToAffectComment(userId, null, id))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "",
                        "You do not have the permission to edit this comment."));

                var comment = _context.Comments.FirstOrDefault(c => c.Id == id);
                comment.CommentContent = newComment.CommentContent;
                _context.Comments.Update(comment);
                _context.SaveChanges(true);

                var responseComment = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                return Ok(new Response(ResponseStatusEnum.Success, responseComment));
            }

            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to edit comment"));
        }
        catch (Exception ex)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
        }
    }

    //PUT api/Comments
    //Like and unlike Comment
    [HttpPut]
    [CheckUserStatus]
    public async Task<IActionResult> ReactComment([FromBody] CommentId comment)
    {
        try
        {
            var commentId = comment.reactCommentId;
            if (!CheckValidCommentId(commentId)) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Fail"));

            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Fail"));
            var userId = currentUser.Id;

            var likeComment = _context.LikeComments.Where(c => c.UserId == userId).Where(c => c.CommentId == commentId)
                .FirstOrDefault();
            bool isLike;
            if (likeComment == null)
            {
                var newLikeComment = new LikeComment
                {
                    CommentId = commentId,
                    UserId = userId
                };

                _context.LikeComments.Add(newLikeComment);
                isLike = true;
            }
            else
            {
                _context.LikeComments.Remove(likeComment);
                isLike = false;
            }

            _context.SaveChanges();
            var numberLikeComment = _context.LikeComments.Where(c => c.CommentId == commentId).Count();

            return Ok(new Response(ResponseStatusEnum.Success,
                new
                {
                    numberLikeComment,
                    isLike
                }));
        }
        catch (Exception ex)
        {
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
        }
    }

    // DELETE api/Comments/
    // Delete comment by Id
    [HttpDelete("{id}")]
    [CheckUserStatus]
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
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));

                if (!CheckValidToAffectComment(userId, role, id))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "",
                        "You do not have the permission to delête this comment."));

                var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
                var listSubComment = _context.Comments.Where(x => x.ParentCommentId == id).ToList();
                foreach (var subComment in listSubComment)
                {
                    DeleteLikeComment(subComment);
                    _context.Comments.Remove(subComment);
                }
                DeleteLikeComment(comment);
                _context.Comments.Remove(comment);
                _context.SaveChanges(true);
                var numberCommentDeleted = listSubComment.Count() + 1;

                return Ok(new Response(ResponseStatusEnum.Success,
                    new
                    {
                        numberCommentDeleted
                    }, "Delete successfully"));
            }

            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to delete comment"));
        }
        catch (Exception ex)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
        }
    }

    // POST api/Comments/
    // Load comment
    [HttpPost("{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> LoadComments(int id, [FromBody] CommentsLoadMoreDTO data)
    {
        try
        {
            var user = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            var userId = user.Id;

            if (data.numberComments == null || data.numberComments <= 0) data.numberComments = 5;
            var numberComments = (int) data.numberComments;

            if (data.action.Contains("load"))
            {
                if (!CommentsServices.CheckValidEventId(id, _context))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid EventId."));

                var listComment = _context.Comments.Where(x => x.EventId == id).Where(x => x.ParentCommentId == null)
                    .ToList();
                listComment = listComment.OrderByDescending(x => x.CreatedAt).ToList();
                var listResponseComments = new List<CommentDTO>();
                foreach (var comment in listComment)
                {
                    var commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                    commentDTO.IsLike = CommentsServices.CheckCurrentUserHasLikeComment(userId, comment.Id, _context);
                    listResponseComments.Add(commentDTO);
                }

                var hasMoreComment = listResponseComments.Count > numberComments;

                if (data.lastCommentId == null)
                {
                    listResponseComments = listResponseComments
                        .GetRange(0, Math.Min(listResponseComments.Count(), numberComments)).ToList();
                }
                else
                {
                    var lastCommentId = (int) data.lastCommentId;
                    var lastCommentIndex = listResponseComments.FindIndex(x => x.Id == lastCommentId);
                    var range = Math.Min(listResponseComments.Count() - (lastCommentIndex + 1), numberComments);
                    if (lastCommentIndex != -1)
                    {
                        hasMoreComment = listResponseComments.Count() - (lastCommentIndex + 1) > numberComments;
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
                        listResponseComments
                    }));
            }

            if (data.action.Contains("reply"))
            {
                if (!CommentsServices.CheckValidCommentId(id, _context))
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid CommentId."));

                var listReplyComment = _context.Comments.Where(x => x.ParentCommentId == id).ToList();
                listReplyComment = listReplyComment.OrderByDescending(x => x.CreatedAt).ToList();
                var listResponseReplyComments = new List<CommentDTO>();
                foreach (var comment in listReplyComment)
                {
                    var commentDTO = CommentsServices.AddMoreInformationsToComment(comment, _context, _mapper);
                    commentDTO.IsLike = CommentsServices.CheckCurrentUserHasLikeComment(userId, comment.Id, _context);
                    listResponseReplyComments.Add(commentDTO);
                }

                var hasMoreComment = listResponseReplyComments.Count > numberComments;

                if (data.lastCommentId == null)
                {
                    listResponseReplyComments = listResponseReplyComments
                        .GetRange(0, Math.Min(listResponseReplyComments.Count(), numberComments)).ToList();
                }
                else
                {
                    var lastCommentId = (int) data.lastCommentId;
                    var lastCommentIndex = listResponseReplyComments.FindIndex(x => x.Id == lastCommentId);
                    var range = Math.Min(listResponseReplyComments.Count() - (lastCommentIndex + 1), numberComments);
                    if (lastCommentIndex != -1)
                    {
                        hasMoreComment = listResponseReplyComments.Count() - (lastCommentIndex + 1) > numberComments;
                        listResponseReplyComments =
                            listResponseReplyComments.GetRange(lastCommentIndex + 1, range).ToList();
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
                        listResponseReplyComments
                    }));
            }

            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid action"));
        }
        catch (Exception ex)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, "", ex.Message));
        }
    }

    private Task<User> GetCurrentUser(string email)
    {
        return _repoManager.User.GetUserAsync(email, false);
    }

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
                return "Invalid EventId and ParentCommentId."; //eventId and parentCommentId are not valid
            return "Invalid EventId."; //eventId is not valid
        }

        if (anComment == null && parentCommentId != null)
            return "Invalid ParentCommentId"; //parentCommentId is not valid
        return "OK"; //eventId and parentCommentId are valid
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
            if (userId != comment.UserId) return false;
        }
        else
        {
            if (userId != comment.UserId && role.Contains(RoleTypes.User)) return false;
        }

        return true;
    }

    private void DeleteLikeComment(Comment comment)
    {
        var listLikeComments = _context.LikeComments.Where(x => x.CommentId == comment.Id).ToList();
        if (listLikeComments.Any())
        {
            listLikeComments.ForEach(x =>
            {
                _context.LikeComments.Remove(x);
            });
            _context.SaveChanges();
        }
    }
}