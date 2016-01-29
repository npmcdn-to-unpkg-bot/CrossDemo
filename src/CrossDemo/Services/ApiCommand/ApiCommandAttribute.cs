using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatrixContent.Framework
{
    /// <summary>
    /// 
    /// </summary>
    public class ApiCommandAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ApiCommandAttribute"/> class.
        /// </summary>
        /// <param name="name">The name.</param>
        public ApiCommandAttribute(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException(nameof(name));
            Name = name;
        }
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }
    }
}
