using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Database;
using SEEMS.DTOs;
using SEEMS.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public CommentController(ApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }


        // POST api/<CommentController>
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
                _context.Add(newComment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(newComment);


        }


        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var comment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (comment == null)
            {
                return BadRequest();
            }

            var events = _context.Event.FirstOrDefault(e => e.Id == comment.EventId);

            if (events == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Remove(events);
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
