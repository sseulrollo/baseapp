using System.Collections.Generic;
using baseapp.Model.Common;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace baseapp.Controllers
{
     [Route("api/[controller]")]
    public class CommonController : Controller
    {
        [HttpGet("[action]")]
        public JsonResult Code(CodeModelArgs args)
        {
            CodeRepo _codeRepo = new CodeRepo();
            IList<CodeModel> _codeList;

            _codeRepo.SelectModels(args);
            _codeList = _codeRepo.SelectedModels;

            return Json(_codeList);
        }

        [HttpGet("[action]")]
        public JsonResult Menu(MenuModelArgs args)
        {
            MenuRepo _menuRepo = new MenuRepo();
            IList<MenuModel> _menuList;

            _menuRepo.SelectModels(args);
            _menuList = _menuRepo.SelectedModels;

            return Json(_menuList);
        }

        
        [HttpGet("[action]/{request?}")]
        public JsonResult LoadSql(string sql, string args)//, object args)
        // public JsonResult LoadSql(string sql, object args)
        {
            CallDb callDb = new CallDb();

            JObject json = JObject.Parse(args);
            Dictionary<string, object> paramsDic = new Dictionary<string, object>();

            foreach ( var item in json)
            {
               if(!paramsDic.ContainsKey(item.Key))
                    paramsDic.Add(item.Key, item.Value.ToObject<dynamic>());
            }
            
            string sqlResult = callDb.LoadSql(sql, paramsDic);

            return Json(sqlResult);
        }
    }
} 