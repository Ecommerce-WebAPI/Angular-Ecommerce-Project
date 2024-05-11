namespace EcommerceAPI.DTO.AuthenticationDTOs
{

    /// <summary>
    /// 
    /// </summary>
    public class UserDetailsDTO
    {
        /// <summary>
        /// 
        /// </summary>
        public string? Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? FirstName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? LastName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string[]? Roles { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? PhoneNumberConfirmed { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? TwoFactorEnabled { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? AccessFailedCount { get; set; }
    }
}
