using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Controller
{
	[Route("api/[controller]")]
	[ApiController]
	[ApiExplorerSettings(GroupName = "v1")]
	public class EventController : ControllerBase

	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		public EventController()
		{
		}

		//[HttpGet()]
		//public async Task<ActionResult<List<Event>>> Get()
		//{
		//	try
		//	{
		//		return Ok(new Response(ResponseStatusEnum.Success, _context.Events.ToList()));
		//	}
		//	catch (Exception ex)
		//	{
		//		return Ok(new Response(ResponseStatusEnum.Error, ex.Message));
		//	}
		//}

		//[HttpGet("{id}")]
		//public async Task<ActionResult<Event>> Get(int id)
		//{
		//need to replace by EF 
		//var anEvent = events.Find(h => h.Id == id);
		//if (anEvent == null)
		//    return BadRequest("Event not found.");
		//return Ok(anEvent);
		//}

		[HttpPost]
		public async Task<ActionResult> AddEvent(EventDTO anEvent)
		{
			try
			{
				if (anEvent.EventTitle == "3")
				{
					return BadRequest(new Response(ResponseStatusEnum.Fail, new { Title = "Id cannot null" }));
				}
				else
				{
					_context.Events.Add(_mapper.Map<Event>(anEvent));
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success, _context.Events.ToList()));
				}
			}
			catch (Exception ex)
			{
				return Ok(new Response(ResponseStatusEnum.Error, ex.Message));
			}
		}

	}
}
