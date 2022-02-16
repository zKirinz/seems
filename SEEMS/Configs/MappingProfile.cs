using AutoMapper;

using SEEMS.Data.DTO;
using SEEMS.Data.DTOs;
using SEEMS.DTOs;
using SEEMS.Models;

namespace SEEMS.Configs
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{

			CreateMap<Event, EventDTO>().ForMember(x => x.IsFree, opt => opt.Ignore());
			CreateMap<EventDTO, Event>();
			CreateMap<CommentDTO, Comment>();
			CreateMap<Comment, CommentDTO>();
			CreateMap<ChainOfEventForCreationDto, ChainOfEvent>();
		}
	}
}
