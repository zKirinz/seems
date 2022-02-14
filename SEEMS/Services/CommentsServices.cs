using SEEMS.Contexts;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Infrastructures.Commons;

namespace SEEMS.Services
{
    public class CommentsServices
    {

        public static CommentValidationInfo GetValidatedToCreateComment(CommentDto commentDto)
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
           
            if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
            {
                commentValidationInfo.CommentContent = "Comment content from 1 to 500 character";
                failCheck = true;
            }

            return failCheck ? commentValidationInfo : null;

        }

        public static CommentValidationInfo GetValidatedToDeleteComment(int commentId, string role, int userId, ApplicationDbContext dbContext)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            var comment = dbContext.Comments.FirstOrDefault(x => x.Id == commentId);
            bool failCheck = false;

            if (comment.UserId != userId && role.Contains(RoleTypes.CUSR))
            {
                commentValidationInfo.ValidToAffectComment = "You can not delete this comment";
                failCheck = true;
            }

            return failCheck ? commentValidationInfo : null;
        }

        public static CommentValidationInfo GetValidatedToEditComment(CommentDto commentDto, int userId)
        {
            CommentValidationInfo commentValidationInfo = new CommentValidationInfo();
            bool failCheck = false;

            if (userId != commentDto.UserId)
            {
                commentValidationInfo.ValidToAffectComment = "You can not edit this comment";
                failCheck = true;
            }

            if (commentDto.CommentContent.Length < CommentValidationInfo.MinLengthCommentContent ||
                commentDto.CommentContent.Length > CommentValidationInfo.MaxLengthCommentContent)
            {
                commentValidationInfo.CommentContent = "Comment content from 1 to 500 character";
                failCheck = true;
            }

            return failCheck ? commentValidationInfo : null;
        }
    }
}
