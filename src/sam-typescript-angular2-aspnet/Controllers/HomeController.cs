using Microsoft.AspNet.Mvc;

namespace sam_typescript_angular2_aspnet.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }

        public IActionResult Error() {
            return View();
        }
    }
}