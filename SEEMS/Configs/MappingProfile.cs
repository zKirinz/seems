using AutoMapper;
using SEEMS.Data.DTO;
using SEEMS.Data.DTOs;
using SEEMS.Data.DTOs.Event;
using SEEMS.Data.DTOs.FeedBack;
using SEEMS.Data.Models;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Configs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Event, EventDTO>();
        CreateMap<EventDTO, Event>();
        CreateMap<EventForUpdateDTO, Event>()
            .ForMember(e => e.EventTitle, opt => opt.MapFrom(e => e.EventTitle))
            .ForMember(e => e.EventDescription, opt => opt.MapFrom(e => e.EventDescription))
            .ForMember(e => e.Location, opt => opt.MapFrom(e => e.Location))
            .ForMember(e => e.ImageUrl, opt => opt.MapFrom(e => e.ImageUrl))
            .ForMember(e => e.StartDate, opt => opt.MapFrom(e => e.StartDate))
            .ForMember(e => e.EndDate, opt => opt.MapFrom(e => e.EndDate))
            .ForMember(e => e.RegistrationDeadline, opt => opt.MapFrom(e => e.RegistrationDeadline))
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<CommentDTO, Comment>().ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.CreatedAt, opt => opt.Ignore())
            .ForMember(x => x.ModifiedAt, opt => opt.Ignore());
        CreateMap<Comment, CommentDTO>();
        CreateMap<User, User>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.OrganizationName, opt => opt.Ignore())
            .ForMember(x => x.Active, opt => opt.Ignore());
        CreateMap<RoleToUpdateDto, UserMeta>().ForMember(x => x.MetaValue, opt => opt.MapFrom(e => e.Role));
        CreateMap<UserForUpdateDto, User>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.Email, opt => opt.Ignore())
            .ForMember(x => x.ImageUrl, opt => opt.Ignore())
            .ForMember(x => x.OrganizationName, opt => opt.MapFrom(x => OrganizationEnumHelper.ToEnum(x.Organization)))
            .ForMember(x => x.Active, opt => opt.MapFrom(x => x.Active));
        CreateMap<ReservationDTO, Reservation>().ForMember(x => x.Attend, opt => opt.Ignore());
        CreateMap<User, ReservationForAttendanceResDTO>();
        CreateMap<Event, Event>();
        CreateMap<Reservation, Reservation>()
            .ForMember(x => x.User, opt => opt.Ignore())
            .ForMember(x => x.Event, opt => opt.Ignore());
        CreateMap<Event, RegisteredEventsDTO>();
        CreateMap<FeedBackDTO, FeedBack>();
        CreateMap<FeedBack, FeedBackForResponse>();
    }
}