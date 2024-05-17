using EcommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Repository
{
    public class CategoryRepository : ICategoryRepository<Category>
    {

        public EcommerceContext db;
        public CategoryRepository(EcommerceContext db)
        {
            this.db = db;
        }

        public async Task<string?> GetCategoryNameById(int id)
        {
            return (await db.Categories.FirstOrDefaultAsync(cat => cat.Id == id))?.Name;
        }
    }
}
