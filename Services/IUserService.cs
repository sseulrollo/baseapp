using System.Collections.Generic;
using baseapp.Model.Common;
using System.IdentityModel.Tokens.Jwt;
using baseapp.Helper;
using System.Linq;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;

namespace baseapp.Services
{
    public interface IUserService
    {
        UserInfo Authenticate(string username, string password);
        IEnumerable<UserInfo> GetAll();
    }

    public class UserService : IUserService
    {
        private List<UserInfo> _user = new List<UserInfo>{};

        private readonly AppSettings _appSettings;

        
        public UserInfo Authenticate(string username, string password)
        {
            var user = _user.SingleOrDefault(x => x.USER_ID == username && x.PASSWORD == password);

            if(user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Name, user.USER_ID.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            user.PASSWORD = null;
        }

        public IEnumerable<UserInfo> GetAll()
        {
            return _user.Select(x => {
                x.PASSWORD = null;
                return x;
            });
        }
    }
}