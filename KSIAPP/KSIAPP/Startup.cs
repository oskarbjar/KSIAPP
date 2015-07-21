using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KSIAPP.Startup))]
namespace KSIAPP
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
