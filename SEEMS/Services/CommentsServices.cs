using AutoMapper;
using SEEMS.Contexts;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Services
{
    public class CommentsServices
    {
        public static CommentValidationInfo GetValidatedToCreateComment(CommentDTO commentDto, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            bool failCheck = false;

            if (commentDto.UserId == null)
            {
                commentValidationInfo.UserId = "UserId cannot be null";
                failCheck = true;
            } 

            if (commentDto.EventId == null)
            {
                commentValidationInfo.EventId = "EventId cannot be null";
                failCheck = true;
            }
            
            if (commentDto.CommentContent != null)
            {
                if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
                {
                    commentValidationInfo.CommentContent = "Comment content from 1 to 500 character";
                    failCheck = true;
                }
            } else
            {
                commentValidationInfo.CommentContent = "Comment cannot be null";
                failCheck = true;
            }
            
            return failCheck ? commentValidationInfo : null;

        }

        public static CommentValidationInfo GetValidatedToEditComment(int commentId, CommentDTO commentDto, string email, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            bool failCheck = false;
            var userIdOfEmail = GetUserIdByEmail(email, dbContext);
            var userIdOfComment = GetUserIdOfComment(commentId, dbContext);

            if (userIdOfEmail != userIdOfComment)
            {
                commentValidationInfo.ValidToAffectComment = "You can not edit this comment";
                failCheck = true;
            }

            if (commentDto.CommentContent != null)
            {
                if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
                {
                    commentValidationInfo.CommentContent = "Comment content from 1 to 500 character";
                    failCheck = true;
                }
            }
            else
            {
                commentValidationInfo.CommentContent = "Comment cannot be null";
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

        public static int GetUserIdOfComment(int commentId, ApplicationDbContext dbContext)
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
    }
}
