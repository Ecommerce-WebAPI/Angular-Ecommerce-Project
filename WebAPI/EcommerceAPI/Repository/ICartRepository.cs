using EcommerceAPI.Models;

namespace EcommerceAPI.Repository
{
    public interface ICartRepository<T>
    {
        public Task<Cart?> GetCartByUserId(string uid);
        public Task<Cart?> GetCartById(int id);
        public Task<Cart> Add(Cart cart);
        public Task Delete(Cart cart);
        public Task Save();
        public Task<CartItem> AddCartItem(CartItem cartItem);
        public Task DeleteCartItem(CartItem cartItem);
        public Task SaveCartItem();
    }
}