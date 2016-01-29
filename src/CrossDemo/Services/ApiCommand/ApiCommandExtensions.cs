using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MatrixContent.Framework
{
    /// <summary>
    /// 
    /// </summary>
    public static class ApiCommandExtensions
    {
        static BindingFlags DiscoveryFlag = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;

        /// <summary>
        /// Discoveries the commands.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public static IEnumerable<KeyValuePair<string,Func<object,object>>> DiscoveryApiCommands(this object instance)
        {
            var type = instance.GetType();
            var commands = type.GetMethods(DiscoveryFlag)
                     .Where(x => x.GetCustomAttributes(typeof(ApiCommandAttribute),false).Count() > 0)
                     .Select(x =>
                     {
                         var attribute = x.GetCustomAttribute<ApiCommandAttribute>(false);

                         return new KeyValuePair<string,Func<object,object>>(attribute.Name,
                             args => { return x.Invoke(instance,new object[] { args }); });
                     });

            return commands;
        }
    }
}
