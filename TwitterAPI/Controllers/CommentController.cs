using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TwitterAPI.Entities;
using TwitterAPI.Repositories;

namespace TwitterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        // Add a new comment to a tweet
        [HttpPost, Route("AddComment")]
        //[Authorize(Roles = "User")]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _commentRepository.AddCommentAsync(comment);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while adding the comment.");
            }
        }



        // Get comments for a specific tweet
        [HttpGet, Route("GetCommentsByTweetId/{tweetId}")]
        //[Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetCommentsByTweetId(int tweetId)
        {
            try
            {
                var comments = await _commentRepository.GetCommentByTweetIdAsync(tweetId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while retrieving comments.");
            }
        }

        // Get comments by a specific user
        [HttpGet, Route("GetCommentsByUserId/{userId}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetCommentsByUserId(string userId)
        {
            try
            {
                var comments = await _commentRepository.GetCommentByUserIdAsync(userId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while retrieving comments.");
            }
        }

        // Update a comment
        [HttpPut, Route("UpdateComment")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateComment([FromBody] Comment comment)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _commentRepository.UpdateCommentAsync(comment);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while updating the comment.");
            }
        }

        // Delete a comment
        [HttpDelete, Route("DeleteComment/{commentId}")]
        [Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            try
            {
                await _commentRepository.DeleteCommentAsync(commentId);
                return Ok();
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while deleting the comment.");
            }
        }
    }
}
