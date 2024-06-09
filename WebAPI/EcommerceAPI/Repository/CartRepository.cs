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

        public async Task<Cart?> GetCartByUserId(string uid)
        {
            var cart = await db.Carts.Include(c => c.CartItems).FirstOrDefaultAsync(c => c.UserId == uid);
            return cart;
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

        public async Task<CartItem> AddCartItem(CartItem cartItem)
        {
            db.CartItems.Add(cartItem);
            return cartItem;
        }

        public async Task DeleteCartItem(CartItem cartItem)
        {
            db.CartItems.Remove(cartItem);
        }

        public async Task SaveCartItem()
        {
            await db.SaveChangesAsync();
        }
    }
}
