using System.ComponentModel.DataAnnotations;

namespace TwitterAPI.Models
{
    public class Edit
    {
        [MaxLength(30)]
        public string UserName { get; set; }
        [MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; }
        [MaxLength(50)]
        public string Password { get; set; }
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Mobile number must be exactly 10 digits.")]
        public string MobileNumber { get; set; }
    }
}
