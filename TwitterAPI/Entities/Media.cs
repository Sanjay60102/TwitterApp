using System.ComponentModel.DataAnnotations;

namespace TwitterAPI.Entities
{
    public class Media
    {
        [Key]
        public int MediaId { get; set; }

        public string FilePath { get; set; } // Path where the media file is stored

        public string FileType { get; set; } // e.g., "image", "video"

        public int TweetId { get; set; }

        // Navigation property to Tweet
        public Tweet? Tweet { get; set; } 
    }
}
