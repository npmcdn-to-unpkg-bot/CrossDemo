using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MatrixContent.Framework
{
    /// <summary>
    /// 
    /// </summary>
    public interface IApiCommandRepository
    {
        /// <summary>
        /// Determines whether the specified command is supported.
        /// </summary>
        /// <param name="command">The command.</param>
        /// <returns></returns>
        bool IsSupported(ApiCommand command);

        /// <summary>
        /// Invokes the specified command.
        /// </summary>
        /// <param name="command">The command.</param>
        /// <returns></returns>
        object Invoke(ApiCommand command);
    }
}
