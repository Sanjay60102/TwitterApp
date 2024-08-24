using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TwitterAPI.Entities
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        [Required]
        [MaxLength(280)]
        public string Content { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Foreign Key
        [Required]
        public int TweetId { get; set; }
        [ForeignKey("TweetId")]
        [JsonIgnore]
        public Tweet? Tweet { get; set; }

        // Foreign Key for User
        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
