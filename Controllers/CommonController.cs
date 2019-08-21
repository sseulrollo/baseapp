using System.Collections.Generic;
using System.ComponentModel;
using baseapp.Model.Common;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace baseapp.Controllers
{
    [Route("api/[controller]")]
    public class CommonController : Controller
    {

        private Dictionary<string, object> SettingParams(JObject json)
        {
            Dictionary<string, object> paramsDic =
                new Dictionary<string, object>();

            foreach (var item in json)
            {
                if (!paramsDic.ContainsKey(item.Key))
                    if (item.Key.StartsWith("@"))
                        paramsDic.Add(item.Key, item.Value.ToObject<dynamic>());
                    else if (item.Key.ToUpper().StartsWith("P_"))
                        paramsDic.Add("@" + item.Key, item.Value.ToObject<dynamic>());
                    else
                        paramsDic.Add("@P_" + item.Key, item.Value.ToObject<dynamic>());
            }

            return paramsDic;
        }


        [HttpGet("[action]")]
        [Description("Code Load 기능")]
        public JsonResult Code(CodeModelArgs args)
        {
            CodeRepo _codeRepo = new CodeRepo();
            IList<CodeModel> _codeList;

            _codeRepo.SelectModels(args);
            _codeList = _codeRepo.SelectedModels;


            return Json(_codeList);
        }

        [HttpGet("[action]")]
        [Description("Code Load 기능")]
        public JsonResult CodeDynamic(string args)
        {
            CallDb callDb = new CallDb();

            JObject json = JObject.Parse(args);
            Dictionary<string, object> paramsDic = SettingParams(json);

            JObject sqlResult = callDb.LoadSqlSingle("pk_atm_sp_code", paramsDic);

            return Json(sqlResult);
        }

        [HttpGet("[action]")]
        [Description("Menu Load 기능")]
        public JsonResult Menu(MenuModelArgs args)
        {
            MenuRepo _menuRepo = new MenuRepo();
            IList<MenuModel> _menuList;

            _menuRepo.SelectModels(args);
            _menuList = _menuRepo.SelectedModels;

            return Json(_menuList);
        }


        [HttpPost("[action]")]
        [Description("Read 기능 / sql : sp명, args : json 타입의 parameter")]
        public JsonResult LoadSql([FromBody]JObject args)
        {
            CallDb callDb = new CallDb();

            string sql = JObject.Parse(args["body"].ToString())["sql"].ToString();
            string arg = Json(JObject.Parse(args["body"].ToString())["args"].ToString()).Value.ToString();

            arg = arg.Replace("\r\n", "").Replace(" ", "");

            JObject json = new JObject();
            if(arg != "[]" && arg != "{}")
                json = JObject.Parse(arg);

            Dictionary<string, object> paramsDic = SettingParams(json);

            string sqlResult = callDb.LoadSql(sql, paramsDic);

            return Json(sqlResult);
        }

        [HttpPost("[action]")]
        [Description("Read 기능")]
        public JsonResult LoadSqlSingle([FromBody]JObject args)
        {
            CallDb callDb = new CallDb();

            string sql = JObject.Parse(args["body"].ToString())["sql"].ToString();
            string arg = Json(JObject.Parse(args["body"].ToString())["args"].ToString()).Value.ToString();

            arg = arg.Replace("\r\n", "").Replace(" ", "");

            JObject json = new JObject();
            if(arg != "[]" && arg != "{}")
                json = JObject.Parse(arg);

            Dictionary<string, object> paramsDic = SettingParams(json);

            JObject sqlResult = callDb.LoadSqlSingle(sql, paramsDic);

            return Json(sqlResult);
        }


        [HttpPost("[action]")]
        [Description("CUD 기능 / sql : sp명, args : json 타입의 parameter")]
        public JsonResult ExecuteSql([FromBody]JObject args)
        {
            CallDb callDb = new CallDb();

            string sql = JObject.Parse(args["body"].ToString())["sql"].ToString();
            string arg = Json(JObject.Parse(args["body"].ToString())["args"].ToString()).Value.ToString();

            arg = arg.Replace("\r\n", "").Replace(" ", "");

            JObject json = new JObject();
            if(arg != "[]" && arg != "{}")
                json = JObject.Parse(arg);

            Dictionary<string, object> paramsDic = SettingParams(json);

            string sqlResult = callDb.ExecuteSql(sql, paramsDic);

            return Json(sqlResult);
        }
    }
}