using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TwitterAPI.Entities;
using TwitterAPI.Models;
using TwitterAPI.Repositories;

namespace TwitterAPI.Controllers
{
    // Defines routes for Follow-related actions and inherits from ControllerBase
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        // Constructor to initialize follow repository dependency and configuration
        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        //Register User
        [HttpPost, Route("Register")]
        [AllowAnonymous] // Allows access without login
        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _userRepository.Register(user); // Register the user
                return Ok(user); // Return success response with user data
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while registering the user.");
            }
        }

        // Validate user credentials / Login
        [HttpPost]
        [Route("Validate")]
        [AllowAnonymous] // Allows access without login
        public async Task<IActionResult> ValidUser(Login login)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await _userRepository.ValidUser(login.Email, login.Password); // Validate user
                if (user == null)
                    return Unauthorized(); // Return unauthorized if user not found

                var authResponse = new AuthResponse
                {
                    UserId = user.UserId,
                    Role = user.Role,
                    Token = GetToken(user), // Generate JWT token
                };

                return Ok(authResponse); // Return success response with auth data
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while validating the user.");
            }

        }

        //Get Users by email
        [HttpGet, Route("GetUserByEmail/{email}")]
        [Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var users = await _userRepository.GetByEmail(email);
                return Ok(users);
            }
            catch(Exception ex)
            {
                // Log exception here
                return StatusCode(500, ex.Message);
            }
        }

        // Get all users
        [HttpGet, Route("GetAllUsers")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while retrieving users.");
            }
        }

        //Edit User Profile
        [HttpPut, Route("EditProfile")]
        [Authorize(Roles ="User,Admin")] //Restrict access by roles
        public async Task<IActionResult> Edit([FromBody]User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _userRepository.Update(user); // Update user profile
                return Ok(user); // Return success response with updated user data
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while updating the user profile.");
            }
        }

        //Delete User Profile
        [HttpDelete, Route("DeleteProfile/{id}")]
        [Authorize(Roles = "User,Admin")] //Restrict access by roles
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _userRepository.Delete(id); // Delete user by ID
                return Ok(); // Return success response
            }
            catch (Exception ex)
            {
                // Log exception here
                return StatusCode(500, "An error occurred while deleting the user profile.");
            }
        }

        //Generating Token
        private string GetToken(User user)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            //Header section
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
            );
            //Payload section
            var subject = new ClaimsIdentity(new[]
            {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(ClaimTypes.Role, user.Role),
                    });

            var expires = DateTime.UtcNow.AddMinutes(10); //token will expire after 10min

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            //Generate token using tokenDescription
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            return jwtToken;
        }
        
        
    }
}
