using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CrossDemo.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Microsoft.AspNet.Mvc.Controller" />
    public class ViewsController:Controller
    {
        /// <summary>
        /// Indexes the specified view name.
        /// </summary>
        /// <param name="viewName">Name of the view.</param>
        /// <returns></returns>
        public IActionResult GetView(string viewName)
        {
            return PartialView(string.Format("_{0}View",NormalizeName(viewName)));
        }

        /// <summary>
        /// Normalizes the name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        string NormalizeName(string name)
        {
            name = name.ToLowerInvariant();

            return $"{name.FirstOrDefault().ToString().ToUpper()}{name.Substring(1)}";
        }
    }
}
