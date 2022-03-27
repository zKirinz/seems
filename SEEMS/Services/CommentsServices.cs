using AutoMapper;
using SEEMS.Contexts;
using SEEMS.Data.ValidationInfo;
using SEEMS.DTOs;
using SEEMS.Models;

namespace SEEMS.Services;

public class CommentsServices
{
    public static CommentValidationInfo GetValidatedToCreateComment(CommentDTO commentDto)
    {
        var commentValidationInfo = new CommentValidationInfo();
        var failCheck = false;

        if (commentDto.EventId == null)
        {
            commentValidationInfo.EventId = "EventId is required field.";
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

    public static CommentValidationInfo GetValidatedToEditComment(CommentDTO commentDto)
    {
        var commentValidationInfo = new CommentValidationInfo();
        var failCheck = false;

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

    public static CommentDTO AddMoreInformationsToComment(Comment comment, ApplicationDbContext dbContext,
        IMapper mapper)
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
        responseComment.NumberReplyComment = dbContext.Comments.Where(x => x.ParentCommentId == comment.Id).Count();
        responseComment.NumberLikeComment = dbContext.LikeComments.Where(x => x.CommentId == comment.Id).Count();
        return responseComment;
    }

    public static bool CheckCurrentUserHasLikeComment(int userId, int commentId, ApplicationDbContext dbContext)
    {
        var likeComment = dbContext.LikeComments.Where(x => x.UserId == userId && x.CommentId == commentId)
            .FirstOrDefault();
        return likeComment != null ? true : false;
    }
}