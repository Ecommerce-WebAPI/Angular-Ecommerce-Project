using EcommerceAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.DTO.AuthenticationDTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType("DataType.Password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password")]
        [DataType("DataType.Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string? LastName { get; set; } = string.Empty;

        [Required]
        public string? Address { get; set; } = string.Empty;

        public string? ProfileImage { get; set; }

        [Required]
        public string? PhoneNumber { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public List<string>? Roles { get; set; }
    }
}