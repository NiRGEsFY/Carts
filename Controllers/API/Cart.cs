using Carts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Carts.Controllers.API
{
    [ApiController]
    [Route("Carts/[controller]")]
    public class Cart : ControllerBase
    {
        private readonly ApplicationDB  _db;
        public Cart(ApplicationDB db)
        {
            _db = db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_db.Carts.Take(20));
        }
        [HttpGet("{number}")]
        public IActionResult Get(string number)
        {
            var tempCarts = _db.Carts.Where(x => x.Number.ToLower().Contains(number.ToLower()));
            return new JsonResult(tempCarts.Take(20));
        }
        [HttpPost]
        public IActionResult Post([FromBody] Carts.Models.Cart data)
        {
            try
            {
                data.Changed = DateTime.Now;
                data.Security = Guid.NewGuid();
                _db.Carts.Add(data);
                _db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPost("{id}")]
        public IActionResult Post(int id,[FromBody] Carts.Models.Cart data)
        {
            try
            {
                var tempCart = _db.Carts.FirstOrDefault(x=>x.Id == id);
                
                if(tempCart == null)
                    return BadRequest();
                if(tempCart.Security != data.Security)
                    return BadRequest();
                tempCart.Security = Guid.NewGuid();
                tempCart.Mark = data.Mark;
                tempCart.Weight = data.Weight;
                tempCart.Number = data.Number;
                tempCart.Changed = DateTime.Now;
                _db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpDelete("{number}")]
        public IActionResult Delete(string number)
        {
            var tempCarts = _db.Carts.Where(x => x.Number.ToLower() == number.ToLower()).Include(x=>x.CartBugs).FirstOrDefault();
            if (tempCarts != null)
                if (tempCarts.CartBugs.Where(x => x.EndTime == null || x.EndTime > DateTime.Now).Count() == 0)
                {
                    _db.Remove(tempCarts);
                }
            else
                return BadRequest();
            _db.SaveChanges();
            return Ok();
        }
    }
}
