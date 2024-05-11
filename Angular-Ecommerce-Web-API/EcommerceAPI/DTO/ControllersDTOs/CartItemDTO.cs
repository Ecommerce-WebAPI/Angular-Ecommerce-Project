namespace EcommerceAPI.DTO.ControllersDTOs
{
    public class CartItemDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
    }
}
