using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatrixContent.Framework
{
    /// <summary>
    /// API Commands provider
    /// </summary>
    public interface IApiCommandProvider
    {
        /// <summary>
        /// Gets the commands.
        /// </summary>
        /// <returns></returns>
        IDictionary<string,Func<object,object>> GetCommands();
    }
}
