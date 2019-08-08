using System.Collections.Generic;
using baseapp.Model.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Web;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using baseapp.Helper;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using baseapp.Service;
using Microsoft.Extensions.Options;
using baseapp.Common;

namespace baseapp.Controllers
{
    [Authorize]
    // [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly AppSettings _appSettings;
        private IHttpContextAccessor _accessor;
        public UserController(IHttpContextAccessor accessor, IOptions<AppSettings> appSettings)
        {
            _accessor = accessor;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        // public JsonResult Login([FromBody]JObject args)
         public string Login([FromBody]JObject args)
        {

            UserService us = new UserService();

            UserModelArgs _args = new UserModelArgs();
            _args.USER_ID = JObject.Parse(args["body"].ToString())["user_id"].ToString();
            _args.PASSWORD = JObject.Parse(args["body"].ToString())["password"].ToString();
            _args.LANG = "KOR"; //JObject.Parse(args["body"].ToString())["lang_id"].ToString();
            _args.IP = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
            
            UserModel _user = us.Authenticate(_args);

            if(_user.ERR != null && _user.ERR != "")
                return _user.ERR;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Issuer = ConnectionUrl.URL,
                Audience = ConnectionUrl.URL,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, _user.ID),
                    new Claim("NAME", _user.NAME),
                    new Claim("AUTH", _user.AUTH),
                    new Claim("DEPT", _user.DEPT_NAME)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);


            return tokenString;
        }


    }

   
}