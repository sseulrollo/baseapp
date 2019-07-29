using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using baseapp.Model.Base;
using Dapper;

namespace baseapp.Model.Common
{
    public class MenuModel : ModelBase
    {
        public int MENU_ID { get; set; }
        public string TITLE { get; set; }
        public string URL { get; set; }
        public string ATTR { get; set; }
        public string SEQ { get; set; }

        public List<SubMenuModel> SubMenu { get; set; }
    }

    public class SubMenuModel : ModelBase
    {
        public int MENU_ID { get; set; }
        public string TITLE { get; set; }
        public string URL { get; set; }
        public string ATTR { get; set; }
        public string SEQ { get; set; }
    }

    public class MenuModelArgs : IModelArgs
    {
        public string Id { get; set; }
    }

    public class MenuRepo : RepositorySingleBase<MenuModel, MenuModelArgs>
    {   
        public MenuModel SelectModels(MenuModelArgs args) 
        {
            string GetCodeSp = "pk_pwa_get_menu";
            try{
                SelectedModels = Ctx.Query<MenuModel>(GetCodeSp, 
                new { P_USER = "MES" }, 
                commandType: CommandType.StoredProcedure).ToList<MenuModel>();
            }
            catch(Exception ex) { }
            return SelectModel;
        }
    }
}