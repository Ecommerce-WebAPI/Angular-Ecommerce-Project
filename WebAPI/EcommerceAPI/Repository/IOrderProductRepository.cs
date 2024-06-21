using EcommerceAPI.Models;

namespace EcommerceAPI.Repository
{
    public interface IOrderProductRepository
    {
        public Task CreateOrder(Order order);
        public Task Save();
    }
}
