using EcommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Repository
{
    public class CartRepository : ICartRepository<Cart>
    {
        public EcommerceContext db;
        public CartRepository(EcommerceContext db)
        {
            this.db = db;
        }

        public async Task<Cart?> GetCartByUserId(string userId)
        {
            return await db.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == userId);

        }

        public async Task<List<CartItem>?> GetUserCartItemsByCartId(int cartId)
        {
            var cartItems = await db.CartItems.Where(ci => ci.CartId == cartId).ToListAsync();
            return cartItems;
        }

        public async Task<Cart?> GetCartById(int id)
        {
            var cart = await db.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.Id == id);
            return cart;
        }

        public async Task<Cart> Add(Cart cart)
        {
            db.Carts.Add(cart);
            return cart;
        }

        public async Task Delete(Cart cart)
        {
            db.Carts.Remove(cart);
        }

        public async Task Save()
        {
            await db.SaveChangesAsync();
        }

        // for cart items
        private async Task<int> GetUserCartId(string userId)
        {
            return await db.Carts.Where(c=>c.UserId == userId).Select(c => c.Id).FirstOrDefaultAsync();
        }
        public async Task<CartItem?> GetCartItemByProductIdAndUserId(int productId, string userId)
        {
            //return await db.CartItems.FindAsync(productId, userId);
            int cartId = await GetUserCartId(userId);
            return await db.CartItems.FirstOrDefaultAsync(ci => ci.ProductId == productId && ci.CartId == cartId);
        }

        public async Task<CartItem> AddCartItem(CartItem cartItem)
        {
            db.CartItems.Add(cartItem);
            return cartItem;
        }

        public async Task UpdateCartItem(CartItem cartItem)
        {
            db.CartItems.Update(cartItem);
        }

        public async Task DeleteCartItem(CartItem cartItem)
        {
            db.CartItems.Remove(cartItem);
        }

        public async Task SaveCartItem()
        {
            await db.SaveChangesAsync();
        }

        public async Task DeleteCartItemsByCartId(int cartId)
        {
            var cartItems = await db.CartItems.Where(ci => ci.CartId == cartId).ToListAsync();
            db.CartItems.RemoveRange(cartItems);
        }
    }
}
