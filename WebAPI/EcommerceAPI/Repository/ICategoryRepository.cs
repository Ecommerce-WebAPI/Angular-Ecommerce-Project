namespace EcommerceAPI.Repository
{
    public interface ICategoryRepository<T>
    {
        public Task<string> GetCategoryNameById(int id);
    }
}
