using Carts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Carts.Controllers.API
{
    [ApiController]
    [Route("Carts/[controller]")]
    public class CartBug : ControllerBase
    {
        private readonly ApplicationDB _db;
        public CartBug(ApplicationDB db)
        {
            _db = db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_db.CartBugs.Take(20));
        }
        [HttpGet("{number}")]
        public IActionResult Get(string number)
        {
            var tempCarts = _db.Carts.Where(x => x.Number.ToLower().Contains(number.ToLower())).Include(x=>x.CartBugs);
            return new JsonResult(tempCarts.Take(20));
        }
        [HttpPost("{CartNumber}")]
        public IActionResult Post(string CartNumber, [FromBody] Carts.Models.CartBug data)
        {
            try
            {
                var tempCart = _db.Carts.Where(x=>x.Number.ToLower() == CartNumber.ToLower()).Include(x=>x.CartBugs).FirstOrDefault();
                if (tempCart == null)
                    return BadRequest();
                data.Security = new Guid();
                tempCart.CartBugs.Add(data);
                tempCart.Changed = DateTime.Now;
                _db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody] Carts.Models.CartBug data)
        {
            try
            {
                var tempCartBug = _db.CartBugs.Where(x => x.Id == id).Include(x=>x.Cart).FirstOrDefault();

                if (tempCartBug == null)
                    return BadRequest();
                if (tempCartBug.Security != data.Security)
                    return BadRequest();
                
                if(data.StartTime == null)
                    tempCartBug.StartTime = DateTime.Now;
                else
                    tempCartBug.StartTime = data.StartTime;

                tempCartBug.EndTime = data.EndTime;
                tempCartBug.Descrition = data.Descrition;
                tempCartBug.Cart.Changed = DateTime.Now;
                _db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var tempCarts = _db.Carts.FirstOrDefault(x => x.Id == id);
            if (tempCarts != null)
                _db.Remove(tempCarts);
            else
                return BadRequest();
            _db.SaveChanges();
            return Ok();
        }
    }
}
