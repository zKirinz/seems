using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.DTOs;
using SEEMS.Models;

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
        public IActionResult Get(int id)
        {

            var events = _context.Events.FirstOrDefault(e => e.Id == id);

            if(events == null)
            {
                return BadRequest();
            }

            var listComment = _context.Comments.Where(c => c.EventId == id).ToList();

            if (!listComment.Any())
            {
                return NotFound();
            }

            return Ok(listComment);

        }

        // POST api/<CommentController>
        // Create a comment
        [HttpPost]
        public IActionResult Post([FromBody] CommentDto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            item.CreateAt = DateTime.Now;
            var newComment = _mapper.Map<Comment>(item);

            try
            {
                _context.Comments.Add(newComment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(newComment);


        }


        // DELETE api/<CommentController>/
        // Delete comment by Id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (comment == null)
            {
                return BadRequest();
            }

            var events = _context.Events.FirstOrDefault(e => e.Id == comment.EventId);

            if (events == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges(true);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
