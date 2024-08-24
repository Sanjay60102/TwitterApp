using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TwitterAPI.Models;

namespace TwitterAPI.Entities
{
    public class Tweet
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TweetId { get; set; } //Primary key with Auto Increment
        [Required]
        [StringLength(25)]
        [ForeignKey("Users")]
        public string UserId { get; set; }
        [Required,MaxLength(250)]
        public string Message { get; set; }
        [Required]
        public DateTime Created {  get; set; } = DateTime.Now;

        //Navigation Peoperty
        [JsonIgnore]
        public User? User { get; set; }

        
    }
}
