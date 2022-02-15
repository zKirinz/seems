using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;

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
        public CommentController(ApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        // GET api/<CommentController>
        // Get all comment by EventId

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var events = _context.Events.FirstOrDefault(e => e.Id == id);
                
            if (events == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This event does not exist"));
            }

            var listComment = _context.Comments.Where(c => c.EventId == id).ToList();

            if (!listComment.Any())
            {
                return NotFound(new Response(ResponseStatusEnum.Success, "", "This event has no comments"));
            }

            return Ok(new Response(ResponseStatusEnum.Success, listComment));

        }

        // POST api/<CommentController>
        // Create a comment
        [HttpPost]
        public IActionResult Post([FromBody] CommentDTO item)
        {
            var email = (string)HttpContext.Items["email"];
            CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToCreateComment(item, email, _context);

            if (commentValidationInfo != null)
            {
                return BadRequest(commentValidationInfo);
            }

            var newComment = _mapper.Map<Comment>(item);

            try
            {
                _context.Comments.Add(newComment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, ""));
            }

            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            var userName = user.UserName;
            var imageUrl = user.ImageUrl;
            var responseComment = _mapper.Map<CommentDTO>(newComment);
            responseComment.ImageUrl = imageUrl;
            responseComment.UserName = userName;
            responseComment.createdAt = newComment.CreatedAt;
            responseComment.modifiedAt = newComment.ModifiedAt;
            return Ok(new Response(ResponseStatusEnum.Success, responseComment));


        }

        // PUT api/<CommentController>/
        // Edit comment by Id
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CommentDTO newComment)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (comment == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This comment does not exist"));
            }

            var email = (string)HttpContext.Items["email"];

            CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToEditComment(id, newComment, email, _context);

            if (commentValidationInfo != null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
            }

            comment.CommentContent = newComment.CommentContent;

            try
            {
                _context.Comments.Update(comment);
                _context.SaveChanges(true);
            }
            catch (Exception)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, ""));
            }

            return Ok(new Response(ResponseStatusEnum.Success, comment));
        }

        // DELETE api/<CommentController>/
        // Delete comment by Id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (comment == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This comment does not exist"));
            }

            var email = (string)HttpContext.Items["email"];

            CommentValidationInfo commentValidationInfo = CommentsServices.GetValidatedToDeleteComment(id, email, _context);

            if (commentValidationInfo != null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, commentValidationInfo));
            }

            try
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges(true);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Error, ""));
            }

            return Ok(new Response(ResponseStatusEnum.Success, "", "Delete successfully"));
        }

        [HttpPost("{id}")]
        public IActionResult LoadComments(int id,[FromBody] LoadCommentsRequest data)
        {

            int numberComments;

            if (data.numberComments == null)
            {
                numberComments = 5;
            } else
            {
                numberComments = (int)data.numberComments;
            }

            var anEvent = _context.Events.FirstOrDefault(x => x.Id == id);

            if (anEvent == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This events does not exist"));
            }

            var listComment = _context.Comments.Where(x => x.EventId == id).Where(x => x.ParentCommentId == null).ToList();

            if (!listComment.Any())
            {
                return Ok(new Response(ResponseStatusEnum.Success, "", "This events no has comment"));
            }

            listComment = listComment.OrderByDescending(x => x.CreatedAt).ToList();
            List<CommentDTO> listResponseComments = new List<CommentDTO>();
            foreach (var comment in listComment)
            {               
                CommentDTO commentDTO = _mapper.Map<CommentDTO>(comment);
                commentDTO.ImageUrl = CommentsServices.GetImageUrlNameByUserId(comment.UserId, _context);
                commentDTO.UserName = CommentsServices.GetUserNameByUserId(comment.UserId, _context);
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
                if (lastCommentIndex >= 0)
                {
                    listResponseComments = listResponseComments.GetRange(lastCommentIndex + 1, Math.Min(listResponseComments.Count() - lastCommentIndex - 1, numberComments)).ToList();
                } else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid id"));
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
