using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MatrixContent.Framework;


namespace CrossDemo.Controllers
{/// <summary>
 /// 
 /// </summary>
 /// <seealso cref="Microsoft.AspNet.Mvc.Controller" />
    [Route("api/commands")]
    public class CommandsController:Controller
    {
        /// <summary>
        /// The m command repository
        /// </summary>
        readonly IApiCommandRepository mCommandRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="CommandsController"/> class.
        /// </summary>
        /// <param name="commandRepository">The command repository.</param>
        public CommandsController(IApiCommandRepository commandRepository)
        {
            mCommandRepository = commandRepository;
        }


        /// <summary>
        /// Posts the specified command.
        /// </summary>
        /// <param name="command">The command.</param>
        /// <returns></returns>
        [HttpPost]
        public object Post([FromBody] ApiCommand command)
        {
            if(command != null && mCommandRepository.IsSupported(command))
            {
                //command.Context.ClientIpAddress = Request.HttpContext.GetFeature<IHttpConnectionFeature>( )?.RemoteIpAddress;

                var result = mCommandRepository.Invoke(command);

                return result;
            }
            else
            {
                return new { Message = string.Format("Command '{0}' is not supported.",command?.Name) };
            }
        }
    }
}
