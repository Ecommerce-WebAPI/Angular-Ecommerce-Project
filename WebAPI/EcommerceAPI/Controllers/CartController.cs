using AutoMapper;
using EcommerceAPI.DTO.ControllersDTOs;
using EcommerceAPI.Models;
using EcommerceAPI.Unit_Of_Work;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAPI.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly unitOfWork unitOfWork;
        private UserManager<ApplicationUser> userManager;
        public CartController(unitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.userManager = userManager;
        }

        /// <summary>
        /// add to cart
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CartItem))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToCart(int productId)
        {
            try
            {
                var user = await userManager.GetUserAsync(User);
                if (user == null)
                {
                    return Unauthorized();
                }

                var cart = await unitOfWork.CartRepository.GetCartByUserId(user.Id);
                if (cart == null)
                {
                    cart = new Cart { UserId = user.Id, Timestamp = DateTime.UtcNow, TotalPrice = 0 };
                    await unitOfWork.CartRepository.Add(cart);
                    await unitOfWork.Save();
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
                return Ok("Product added to cart successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Retrieves all categories.
        /// </summary>
        /// <returns>A list of cart DTOs.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CartDTO>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var Categories = await unitOfWork.CartGenericRepository.GetAll();
                var CDTOs = Categories.Select(p => mapper.Map<CartDTO>(p));
                return Ok(CDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }

        /// <summary>
        /// get cart items using cart id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetUserCartItemsByCartID/{id:int}")]
        public async Task<IActionResult> GetUserCartItemsByCartID(int id)
        {
            try
            {
                var cartItems = await unitOfWork.CartRepository.GetUserCartItemsByCartId(id);
                if (cartItems == null)
                {
                    return BadRequest("No such items in this cart id");
                }
                return Ok(cartItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }

        
        /// <summary>
        /// Retrieves a cart by ID.
        /// </summary>
        /// <param name="id">The ID of the cart to retrieve.</param>
        /// <returns>The cart DTO.</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CartDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCartByID(int id)
        {
            try
            {
                var cart = await unitOfWork.CartGenericRepository.GetById(id);
                if (cart == null)
                {
                    return BadRequest("No such cart with the provided id");
                }
                var CDTO = mapper.Map<CartDTO>(cart);
                return Ok(CDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }
       
        
        // PUT: api/Cart/5
        /// <summary>
        /// Updates a cart.
        /// </summary>
        /// <param name="id">The ID of the cart to update.</param>
        /// <param name="cart">The updated cart object.</param>
        /// <returns>The updated cart object.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Cart))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (cart == null)
            {
                return BadRequest("Please provide student data");
            }
            Cart existedCart = await unitOfWork.CartGenericRepository.GetById(id);
            if (existedCart != null && existedCart.Id != cart.Id)
            {
                return NotFound($"There is a cart with this ID : {id}, Please, Change it");
            }

            try
            {
                unitOfWork.CartGenericRepository.Update(id, cart);
                await unitOfWork.Save();
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error !!");
            }
        }

        /// <summary>
        /// Adds a new cart.
        /// </summary>
        /// <param name="cart">The cart object to add.</param>
        /// <returns>The added cart object.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Cart))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddCart(Cart cart)
        {
            if (cart == null)
            {
                return BadRequest("Please, enter cart's data");
            }

            try
            {
                cart = await unitOfWork.CartGenericRepository.Add(cart);
                await unitOfWork.Save();
                return CreatedAtAction(nameof(GetCartByID), new { id = cart.Id }, cart);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a cart by ID.
        /// </summary>
        /// <param name="id">The ID of the cart to delete.</param>
        /// <returns>The deleted cart object.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Cart))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteCart(int id)
        {
            Cart cart = await unitOfWork.CartGenericRepository.GetById(id);
            if (cart == null)
            {
                return NotFound("Cart doesn't exist");
            }
            await unitOfWork.CartGenericRepository.Delete(cart);
            await unitOfWork.Save();
            return Ok(cart);
        }

    }
}