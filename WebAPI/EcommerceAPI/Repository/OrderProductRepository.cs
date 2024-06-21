using EcommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Repository
{
    public class OrderProductRepository: IOrderProductRepository
    {
        public EcommerceContext db;
        public OrderProductRepository(EcommerceContext db)
        {
            this.db = db;
        }

        public async Task CreateOrder(Order order)
        {
            await db.Orders.AddAsync(order);
        }

        public async Task Save()
        {
            await db.SaveChangesAsync();
        }
    }
}
