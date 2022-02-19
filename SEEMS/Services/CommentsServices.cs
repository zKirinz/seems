using AutoMapper;
using Microsoft.Net.Http.Headers;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services
{
    public class CommentsServices
    {
        public static CommentValidationInfo GetValidatedToCreateComment(CommentDTO commentDto, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            bool failCheck = false;

            if (commentDto.EventId == null)
            {
                commentValidationInfo.EventId = "EventId is required field.";
                failCheck = true;
            } else
            {
                if (dbContext.Events.FirstOrDefault(x => x.Id == commentDto.EventId) == null)
                {
                    commentValidationInfo.EventId = "EventId does not exist.";
                    failCheck = true;
                }
            }
            
            if (commentDto.CommentContent != null)
            {
                if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
                {
                    commentValidationInfo.CommentContent = "Comment content from 1 to 500 character.";
                    failCheck = true;
                }
            } else
            {
                commentValidationInfo.CommentContent = "CommentContent is required field.";
                failCheck = true;
            }

            if (commentDto.ParentCommentId != null)
            {
                if (dbContext.Comments.FirstOrDefault(x => x.Id == commentDto.ParentCommentId) == null)
                {
                    commentValidationInfo.ParentCommentId = "ParentCommentId does not exist.";
                    failCheck = true;
                }
            }
            
            return failCheck ? commentValidationInfo : null;

        }

        public static CommentValidationInfo GetValidatedToEditComment(int? userId, CommentDTO commentDto, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            var userIdByCommentId = GetUserIdOfComment(commentDto.Id, dbContext);

            bool failCheck = false;

            if (CheckValidCommentId(commentDto.Id, dbContext))
            {
                if (userId != userIdByCommentId)
                {
                    commentValidationInfo.ValidToAffectComment = "You can not edit this comment.";
                    failCheck = true;
                }
            } else
            {
                commentValidationInfo.Id = "CommentId does not exist.";
                failCheck = true;
            }

            if (commentDto.CommentContent != null)
            {
                if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
                {
                    commentValidationInfo.CommentContent = "Comment content from 1 to 500 character.";
                    failCheck = true;
                }
            }
            else
            {
                commentValidationInfo.CommentContent = "CommentContent is required field.";
                failCheck = true;
            }

            return failCheck ? commentValidationInfo : null;
        }

        public static CommentValidationInfo GetValidToDeleteComment(int? userId, string role, int commentId, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            var userIdOfComment = GetUserIdOfComment(commentId, dbContext);
            bool failCheck = false;

            if (CheckValidCommentId(commentId, dbContext))
            {
                if (userId != userIdOfComment || role.Contains(RoleTypes.CUSR))
                {
                    commentValidationInfo.ValidToAffectComment = "You can not edit this comment.";
                    failCheck = true;
                }
            }
            else
            {
                commentValidationInfo.Id = "CommentId does not exist.";
                failCheck = true;
            }

            return failCheck ? commentValidationInfo : null;
        }

        public static int GetUserIdByEmail(string email, ApplicationDbContext dbContext)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Email == email);
            var userIdOfEmail = (int)user.Id;
            return userIdOfEmail;
        }

        public static string GetRoleByEmail(string email, ApplicationDbContext dbContext)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.Email == email);
            var userMeta = dbContext.UserMetas.FirstOrDefault(u => u.User == user);
            var roleOfEmail = (string)userMeta.MetaValue;
            return roleOfEmail;
        }

        public static int GetUserIdOfComment(int? commentId, ApplicationDbContext dbContext)
        {
            var comment = dbContext.Comments.FirstOrDefault(x => x.Id == commentId);
            var userIdOfComment = (int)comment.UserId;
            return userIdOfComment;
        }

        public static string GetUserNameByUserId(int? userId, ApplicationDbContext dbContext)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            var userName = (string)user.UserName;
            return userName;
        }

        public static string GetImageUrlNameByUserId(int? userId, ApplicationDbContext dbContext)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            var imageUrl = (string)user.ImageUrl;
            return imageUrl;
        }

        public static string GetEmailByUserId(int? userId, ApplicationDbContext dbContext)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            var email = (string)user.Email;
            return email;
        }

        public static bool CheckValidEventId(int eventId, ApplicationDbContext dbContext)
        {
            var events = dbContext.Events.FirstOrDefault(x => x.Id == eventId);
            return events != null ? true : false;  
        }

        public static bool CheckValidCommentId(int? commentId, ApplicationDbContext dbContext)
        {
            var comments = dbContext.Comments.FirstOrDefault(x => x.Id == commentId);
            return comments != null ? true : false;
        }

        public static CommentDTO AddMoreInformationsToComment(Comment comment, ApplicationDbContext dbContext, IMapper mapper)
        {
            var userId = comment.UserId;
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userId);
            var userName = user.UserName;
            var imageUrl = user.ImageUrl;
            var email = user.Email;
            var responseComment = mapper.Map<CommentDTO>(comment);
            responseComment.ImageUrl = imageUrl;
            responseComment.UserName = userName;
            responseComment.Email = email;
            responseComment.CreatedAt = comment.CreatedAt;
            responseComment.ModifiedAt = comment.ModifiedAt;
            return responseComment;
        }

        public static int? GetUserIdByToken(string token, IAuthManager authManager, ApplicationDbContext dbContext) 
        {
                var jwtToken = authManager.DecodeToken(token);

                var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "email").Value;
    
                var user = dbContext.Users.FirstOrDefault(x => x.Email == emailClaim);
                //string roleBaseEmail = dbContext.UserMetas.FirstOrDefault(x => x.User == userBasedEmail).MetaValue;

                if (user != null)
                {
                    return user.Id;
                }
                else
                {
                    return null;
                }
        }

        public static string? GetRoleByToken(string token, IAuthManager authManager, ApplicationDbContext dbContext)
        {
                var jwtToken = authManager.DecodeToken(token);

                var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "email").Value;
                var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role").Value;

                var user = dbContext.Users.FirstOrDefault(x => x.Email == emailClaim);
                var userMeta = dbContext.UserMetas.FirstOrDefault(x => x.User == user);
                var role = userMeta.MetaValue;

                if (user != null || !role.Contains(roleClaim))
                {
                    return userMeta.MetaValue;
                }
                else
                {
                    return null;
                }
        }
    }
}
