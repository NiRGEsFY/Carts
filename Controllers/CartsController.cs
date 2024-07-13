using Carts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Carts.Controllers
{
    public class CartsController : Controller
    {
        private readonly ApplicationDB _context;
        public CartsController(ApplicationDB contex) 
        {
            _context = contex;
        }
        public IActionResult Index(string number) 
        {
            var tempCarts = new List<Cart>();
            if (!String.IsNullOrEmpty(number))
            {
                tempCarts.AddRange(_context.Carts.Where(x => x.Number.ToLower().Contains(number.ToLower())).Take(20).Include(x=>x.CartBugs));
                ViewBag.Number = number;
            }
            else
                tempCarts.AddRange(_context.Carts.Take(20).Include(x=>x.CartBugs));
            
            return View(tempCarts);
        }
    }
}
