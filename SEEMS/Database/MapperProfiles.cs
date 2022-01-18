using AutoMapper;
using SEEMS.DTOs;
using SEEMS.Models;

namespace SEEMS.Database
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<CommentDto, Comment>();
        }
    }
}