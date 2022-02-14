using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Authorization;
using SEEMS.Contexts;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controller
{
    [Route("api/[controller]")]
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
        [AuthorizationFilter(RoleTypes.CUSR , RoleTypes.ORG , RoleTypes.ADM)]
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
        [AuthorizationFilter(RoleTypes.CUSR, RoleTypes.ORG, RoleTypes.ADM)]
        public IActionResult Post([FromBody] CommentDto item)
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

            return Ok(new Response(ResponseStatusEnum.Success, newComment));


        }

        // PUT api/<CommentController>/
        // Edit comment by Id
        [HttpPut("{id}")]
        [AuthorizationFilter(RoleTypes.CUSR, RoleTypes.ORG, RoleTypes.ADM)]
        public IActionResult Put(int id, [FromBody] CommentDto newComment)
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
        [AuthorizationFilter(RoleTypes.CUSR, RoleTypes.ORG, RoleTypes.ADM)]
        public ActionResult Delete(int id)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (comment == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "This comment does not exist"));
            }

            var email =(string)HttpContext.Items["email"];

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

    }
}
