﻿using EcommerceAPI.Models;
using EcommerceAPI.Repository;

namespace EcommerceAPI.Unit_Of_Work
{
    public class unitOfWork
    {
        EcommerceContext db;
        public unitOfWork(EcommerceContext db)
        {
            this.db = db;
            productGenericRepository = new GenericRepository<Product>(db);
        }

        public async Task<int> Save()
        {
            return await db.SaveChangesAsync();
        }

        private GenericRepository<Product> productGenericRepository;
        public GenericRepository<Product> ProductGenericRepository
        {
            get
            {
                //if (productGenericRepository == null)
                //    productGenericRepository = new GenericRepository<Product>(db); 
                //return productGenericRepository;

                return productGenericRepository ?? (productGenericRepository = new GenericRepository<Product>(db));
            }
        }

        private OrderProductRepository orderProductRepository;
        public OrderProductRepository OrderProductRepository
        {
            get
            {
                return orderProductRepository ?? (orderProductRepository = new OrderProductRepository(db));
            }
        }

        private GenericRepository<Order> orderGenericRepository;
        public GenericRepository<Order> OrderGenericRepository
        {
            get
            {
                return orderGenericRepository ?? (orderGenericRepository = new GenericRepository<Order>(db));
            }
        }

        private GenericRepository<OrderProduct> orderProductGenericRepository;
        public GenericRepository<OrderProduct> OrderProductGenericRepository
        {
            get
            {
                return orderProductGenericRepository ?? (orderProductGenericRepository = new GenericRepository<OrderProduct>(db));
            }
        }

        private GenericRepository<Category> categoryGenericRepository;
        public GenericRepository<Category> CategoryGenericRepository
        {
            get
            {
                return categoryGenericRepository ?? (categoryGenericRepository = new GenericRepository<Category>(db));
            }
        }

        private CategoryRepository categoryRepository;
        public CategoryRepository CategoryRepository
        {
            get
            {
                return categoryRepository ?? (categoryRepository = new CategoryRepository(db));
            }
        }

        private CartRepository cartRepository;
        public CartRepository CartRepository
        {
            get
            {
                return cartRepository ?? (cartRepository = new CartRepository(db));
            }
        }

        private GenericRepository<Cart> cartGenericRepository;
        public GenericRepository<Cart> CartGenericRepository
        {
            get
            {
                return cartGenericRepository ?? (cartGenericRepository = new GenericRepository<Cart>(db));
            }
        }

        private GenericRepository<CartItem> cartItemGenericRepository;
        public GenericRepository<CartItem> CartItemGenericRepository
        {
            get
            {
                return cartItemGenericRepository ?? (cartItemGenericRepository = new GenericRepository<CartItem>(db));
            }
        }

        private GenericRepository<Review> reviewGenericRepository;
        public GenericRepository<Review> ReviewGenericRepository
        {
            get
            {
                return reviewGenericRepository ?? (reviewGenericRepository = new GenericRepository<Review>(db));
            }
        }

        private GenericRepository<Coupon> couponGenericRepository;
        public GenericRepository<Coupon> CouponGenericRepository
        {
            get
            {
                return couponGenericRepository ?? (couponGenericRepository = new GenericRepository<Coupon>(db));
            }
        }

        private GenericRepository<Wishlist> wishlistGenericRepository;
        public GenericRepository<Wishlist> WishlistGenericRepository
        {
            get
            {
                return wishlistGenericRepository ?? (wishlistGenericRepository = new GenericRepository<Wishlist>(db));
            }
        }

        private GenericRepository<WishlistItem> wishlistItemGenericRepository;
        public GenericRepository<WishlistItem> WishlistItemGenericRepository
        {
            get
            {
                return wishlistItemGenericRepository ?? (wishlistItemGenericRepository = new GenericRepository<WishlistItem>(db));
            }
        }

    }
}
