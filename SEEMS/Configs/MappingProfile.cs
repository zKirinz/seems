using AutoMapper;

using SEEMS.Data.DTO;
using SEEMS.Data.DTOs;
using SEEMS.Data.Models;
using SEEMS.DTOs;
using SEEMS.Models;

namespace SEEMS.Configs
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{

			CreateMap<Event, EventDTO>();
			CreateMap<EventDTO, Event>();
			CreateMap<CommentDTO, Comment>().ForMember(x => x.Id, opt => opt.Ignore())
											.ForMember(x => x.CreatedAt, opt => opt.Ignore())
											.ForMember(x => x.ModifiedAt, opt => opt.Ignore());
			CreateMap<Comment, CommentDTO>();
			CreateMap<ChainOfEventForCreationDto, ChainOfEvent>();
			CreateMap<ChainOfEventForUpdateDTO, ChainOfEvent>().ForMember(x => x.Id, opt => opt.Ignore());
			CreateMap<User, User>().ForMember(x => x.Id, opt => opt.Ignore());
			CreateMap<RoleToUpdateDto, UserMeta>().ForMember(x => x.MetaValue, opt => opt.MapFrom(e => e.Role));
			CreateMap<StatusToUpdateDto, User>().ForMember(x => x.Active, opt => opt.MapFrom(e => e.Active));
			CreateMap<ReservationDTO, Reservation>().ForMember(x => x.Attend, opt => opt.Ignore());
		}
	}
}
