using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TwitterAPI.Entities;
using TwitterAPI.Repositories;

namespace TwitterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetController : ControllerBase
    {
        private readonly ITweetRepository _tweetRepository;
        private readonly IMediaRepository _mediaRepository;
        // Constructor to initialize tweet repository
        public TweetController(ITweetRepository tweetRepository, IMediaRepository mediaRepository)
        {
            _tweetRepository = tweetRepository;
            _mediaRepository = mediaRepository;
        }

        // Add a new tweet
        [HttpPost, Route("AddTweet")]
        [Authorize(Roles = "Admin, User")] //Restrict access by roles

        public async Task<IActionResult> Add(Tweet tweet)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _tweetRepository.Add(tweet);
                return Ok(tweet); // Return success response with tweet data
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while adding the tweet.");
            }
        }

        // Get all tweets
        [HttpGet, Route("GetTweets")]
        [Authorize(Roles = "Admin, User")] //Restrict access by roles
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var tweets = await _tweetRepository.GetAll();
                return Ok(tweets);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while retrieving the tweets.");
            }
        }

        //Get tweet by Id
        [HttpGet, Route("GetById/{tweetId}")]
        //[Authorize(Roles = "User,Admin")]
        public async Task<IActionResult> GetById(int tweetId)
        {
            try
            {
                var tweet = await _tweetRepository.GetById(tweetId);
                return Ok(tweet);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Get tweets by user ID
        [HttpGet, Route("GetTweetsByUserId/{userId}")]
        // [Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> GetByUserId(string userId)
        {
            try
            {
                var tweets = await _tweetRepository.GetByUserIdAsync(userId);
                return Ok(tweets);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, ex.Message);
            }
        }

        // Edit an existing tweet
        [HttpPut, Route("EditTweet")]
        // [Authorize(Roles = "User")] //Restrict access by roles
        public async Task<IActionResult> Edit([FromBody] Tweet tweet)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _tweetRepository.Update(tweet);
                return Ok(tweet); // Return success response with updated tweet data
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while updating the tweet.");
            }
        }

        // Delete a tweet by its ID
        [HttpDelete, Route("DeleteTweet/{id}")]
        // [Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _tweetRepository.Delete(id);
                return Ok(); // Return success response after deletion
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while deleting the tweet.");
            }
        }
    }
}
