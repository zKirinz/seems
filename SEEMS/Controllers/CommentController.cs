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


    }
}
