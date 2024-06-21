using EcommerceAPI.Models;

namespace EcommerceAPI.Repository
{
    public interface ICartRepository<T>
    {
        public Task<Cart?> GetCartByUserId(string userId);

        public Task<List<CartItem>?> GetUserCartItemsByCartId(int cartId);

        public Task<Cart?> GetCartById(int id);

        public Task<Cart> Add(Cart cart);

        public Task Delete(Cart cart);

        public Task Save();

        // for cart items

        public Task<CartItem?> GetCartItemByProductIdAndUserId(int productId, string userId);

        public Task<CartItem> AddCartItem(CartItem cartItem);

        public Task UpdateCartItem(CartItem cartItem);

        public Task DeleteCartItem(CartItem cartItem);

        public Task SaveCartItem();

        public Task DeleteCartItemsByCartId(int cartId);
    }
}