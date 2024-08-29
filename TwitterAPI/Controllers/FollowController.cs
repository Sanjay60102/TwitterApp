using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TwitterAPI.Entities;
using TwitterAPI.Repositories;

namespace TwitterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;
        public FollowController(IFollowRepository followRepository)
        {
            _followRepository = followRepository;
        }

        //Add a new following relationship
        [HttpPost, Route("AddFollowing")]
        //[Authorize(Roles = "User")] //Restrict access by roles
        public async Task<IActionResult> AddFollowing([FromBody] Follow follow)
        {
            if(follow == null || follow.UserId == follow.FollowingId)
            {
                return BadRequest(new { Message = "Invalid following data." });
            }
            try
            {
                await _followRepository.AddFollowing(follow);
                return Ok(new { Message = "Following added successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                return StatusCode(500, "An error occurred while adding the following relationship.");
            }
        }

        // Remove a following relationship
        [HttpDelete, Route("RemoveFollowing/{userId}/{followingId}")]
        //[Authorize(Roles = "User")] //Restrict access by roles
        public async Task<IActionResult> RemoveFollowing(string userId, string followingId)
        {
            try
            {
                await _followRepository.RemoveFollowing(userId, followingId);
                return Ok(new { Message = "Following removed successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                return StatusCode(500, "An error occurred while removing the following relationship.");
            }
        }

        // Get all followers for a specific user
        [HttpGet, Route("GetFollowers/{followingId}")]
        //Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> GetFollowers(string followingId)
        {
            try
            {
                var followers = await _followRepository.GetFollowers(followingId);
                return Ok(followers);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                return StatusCode(500, "An error occurred while retrieving the followers.");
            }
        }

        // Get all followings for a specific user
        [HttpGet, Route("GetFollowings/{userId}")]
        //[Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> GetFollowings(string userId)
        {
            try
            {
                var followings = await _followRepository.GetFollowings(userId);
                return Ok(followings);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                return StatusCode(500, "An error occurred while retrieving the followings.");
            }
        }
    }
}
