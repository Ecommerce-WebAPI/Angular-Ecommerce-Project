using AutoMapper;
using EcommerceAPI.DTO.ControllersDTOs;
using EcommerceAPI.Models;
using EcommerceAPI.Unit_Of_Work;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceAPI.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly unitOfWork unitOfWork;

        public CartItemController(unitOfWork unitOfWork, IMapper mapper)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves all categories.
        /// </summary>
        /// <returns>A list of cartItem DTOs.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CartItemDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var Categories = await unitOfWork.CartItemGenericRepository.GetAll();
                var CDTOs = Categories.Select(p => mapper.Map<CartItemDTO>(p));
                return Ok(CDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }



        /// <summary>
        /// Retrieves a cartItem by ID.
        /// </summary>
        /// <param name="id">The ID of the cartItem to retrieve.</param>
        /// <returns>The cartItem DTO.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CartItemDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCartItemByID(int id)
        {
            try
            {
                var cartItem = await unitOfWork.CartItemGenericRepository.GetById(id);
                if (cartItem == null)
                {
                    return BadRequest("No such cartItem with the provided id");
                }
                var CDTO = mapper.Map<CartItemDTO>(cartItem);
                return Ok(CDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }



        /// <summary>
        /// Updates a cartItem.
        /// </summary>
        /// <param name="productId">The product ID of the cartItem to update.</param>
        /// <param name="cartItem">The updated cartItem object.</param>
        /// <returns>The updated cartItem object.</returns>
        [HttpPut("{productId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutCartItem(int productId, CartItem cartItem)
        {
            if (cartItem == null)
            {
                return BadRequest("Please provide item data");
            }

            // Retrieve the user ID from the authenticated user context
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is missing");
            }

            // Ensure the IDs match
            if (productId != cartItem.ProductId)
            {
                return BadRequest("Product ID in the URL does not match the Product ID in the cart item");
            }

            CartItem existedCartItem = await unitOfWork.CartRepository.GetCartItemByProductIdAndUserId(productId, userId);
            if (existedCartItem == null)
            {
                return NotFound($"No cart item found with Product ID: {productId} and User ID: {userId}");
            }

            try
            {
                existedCartItem.Quantity = cartItem.Quantity;
                existedCartItem.Price = cartItem.Price;

                await unitOfWork.CartRepository.UpdateCartItem(existedCartItem);
                await unitOfWork.CartRepository.SaveCartItem();
                await unitOfWork.Save();
                return Ok(existedCartItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        /// <summary>
        /// Adds a new cartItem.
        /// </summary>
        /// <param name="cartItem">The cartItem object to add.</param>
        /// <returns>The added cartItem object.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddCartItem(CartItem cartItem)
        {
            if (cartItem == null)
            {
                return BadRequest("Please, enter cartItem's data");
            }

            try
            {
                cartItem = await unitOfWork.CartItemGenericRepository.Add(cartItem);
                await unitOfWork.Save();
                return CreatedAtAction(nameof(GetCartItemByID), new { id = cartItem.Id }, cartItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        /// <summary>
        /// Deletes a cartItem by product ID.
        /// </summary>
        /// <param name="productId">The product ID of the cartItem to delete.</param>
        /// <returns>The deleted cartItem object.</returns>
        [HttpDelete("{productId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteCartItem(int productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is missing");
            }

            CartItem cartItem = await unitOfWork.CartRepository.GetCartItemByProductIdAndUserId(productId, userId);
            if (cartItem == null)
            {
                return NotFound("CartItem doesn't exist");
            }
            try
            {
                await unitOfWork.CartItemGenericRepository.Delete(cartItem);
                await unitOfWork.CartRepository.SaveCartItem();
                await unitOfWork.Save();
                return Ok(cartItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        /// <summary>
        /// Adds a product to the cart.
        /// </summary>
        /// <param name="productId">The ID of the product to add to the cart.</param>
        /// <returns>The added cart item.</returns>
        [HttpPost("{productId}")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddToCart(int productId)
        {
            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
                var cart = await unitOfWork.CartRepository.GetCartByUserId(userId);
                if (cart == null)
                {
                    cart = new Cart { UserId = userId, Timestamp = DateTime.UtcNow, TotalPrice = 0 };
                    await unitOfWork.CartRepository.Add(cart);
                }

                var product = await unitOfWork.ProductGenericRepository.GetById(productId);
                if (product == null)
                {
                    return BadRequest("Invalid product ID");
                }

                var cartItem = new CartItem
                {
                    Quantity = 1,
                    CartId = cart.Id,
                    Name = product.Name,
                    ProductId = productId,
                    Price = product.Price,
                    ImageUrl = product.Image
                };

                await unitOfWork.CartItemGenericRepository.Add(cartItem);
                await unitOfWork.Save();

                return CreatedAtAction(nameof(GetCartItemByID), new { id = cartItem.Id }, cartItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is missing");
            }

            Cart cart = await unitOfWork.CartRepository.GetCartByUserId(userId);
            if (cart == null)
            {
                return NotFound("Cart doesn't exist");
            }

            try
            {
                await ProcessOrder(cart);
                await unitOfWork.CartRepository.DeleteCartItemsByCartId(cart.Id);
                await unitOfWork.CartRepository.Save();
                await unitOfWork.Save();

                return Ok("Checkout successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private async Task ProcessOrder(Cart cart)
        {
            decimal totalAmount = cart.CartItems.Sum(item => item.Quantity * item.Price);

            Order order = new Order
            {
                UserId = cart.UserId,
                Timestamp = DateTime.Now,
                TotalPrice = totalAmount,
                ShippingAddress = "Delivery",
                PaymentMethod = 1,
                OrderStatus = 1,
                User = cart.User,
                OrderProducts = cart.CartItems.Select(cartItem => new OrderProduct
                {
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    UnitPrice = cartItem.Price
                }).ToList()
            };

            await unitOfWork.OrderProductRepository.CreateOrder(order);
            await unitOfWork.OrderProductRepository.Save();
        }


    }
}