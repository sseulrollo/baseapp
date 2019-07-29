using System.Collections.Generic;
using baseapp.Model.Common;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace baseapp.Controllers
{
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

        
        [HttpGet("[action]")]
        public JsonResult LoadSql()//, object args)
        {

            System.Diagnostics.Debug.WriteLine("hello");
            // CallDb callDb = new CallDb();
            // Dictionary<string, object> paramsDic = new Dictionary<string, object>();

            // foreach (var a in args)
            // {
            //     if(!paramsDic.ContainsKey(a.Key))
            //         paramsDic.Add(a.Key, a.Values);
            // }
            JObject sqlResult = null;
            // JObject sqlResult = callDb.LoadSql(sql, paramsDic);

            return Json(sqlResult);
        }
    }
} 