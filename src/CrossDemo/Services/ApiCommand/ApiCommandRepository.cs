using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace MatrixContent.Framework
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="MatrixContent.Framework.IApiCommandRepository" />
    public class ApiCommandRepository:IApiCommandRepository
    {
        readonly IServiceProvider mServiceProvider;
        readonly IDictionary<string,Func<object,object>> mCommands = new Dictionary<string,Func<object,object>>();
        bool mIsBuilt = false;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApiCommandRepository"/> class.
        /// </summary>
        /// <param name="serviceProvider">The service provider.</param>
        public ApiCommandRepository(IServiceProvider serviceProvider)
        {
            mServiceProvider = serviceProvider;
        }

        /// <summary>
        /// Builds the commands.
        /// </summary>
        void BuildCommands()
        {
            if(mIsBuilt)
                return;

            var providers = mServiceProvider.GetServices<IApiCommandProvider>();

            foreach(var item in providers.SelectMany(x => x.GetCommands()))
            {
                if(!mCommands.ContainsKey(item.Key))
                    mCommands.Add(item.Key,item.Value);
                else
                    Debug.WriteLine(string.Format("{0} was not registered for there is a command with the same name already.",item.Key));
            }
            mIsBuilt = true;
        }

        /// <summary>
        /// Invokes the specified command.
        /// </summary>
        /// <param name="command">The command.</param>
        /// <returns></returns>
        public object Invoke(ApiCommand command)
        {
            BuildCommands();

            if(IsSupported(command))
            {
                var function = mCommands[command.Name];
                return function(command.Parameters);
            }

            return new { Message = string.Format("{0} is not supported!",command?.Name) };
        }

        /// <summary>
        /// Determines whether the specified command is supported.
        /// </summary>
        /// <param name="command">The command.</param>
        /// <returns></returns>
        public bool IsSupported(ApiCommand command)
        {
            BuildCommands();

            if(command == null || string.IsNullOrEmpty(command.Name))
                return false;

            return mCommands.ContainsKey(command.Name);
        }
    }
}
