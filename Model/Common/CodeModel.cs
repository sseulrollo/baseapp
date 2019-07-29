using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using baseapp.Model.Base;
using Dapper;

namespace baseapp.Model.Common
{
     public class CodeModel : ModelBase
    {
        [Display(Name="코드")]
        public string CODE { get; set; }

        [Display(Name="코드명")]
        public string NAME { get; set; }

        [Display(Name="정렬")]
        public string SORT { get; set; }
    }

    public class CodeModelArgs : IModelArgs
    {
        public string Gropu_Id { get; set; }
        public string Where { get; set; }
    }

    public class CodeRepo : RepositorySingleBase<CodeModel, CodeModelArgs>
    {
        public CodeModel SelectModels(CodeModelArgs args) 
        {
            string GetCodeSp = "pk_atm_sp_code";
            try{
            SelectedModels = Ctx.Query<CodeModel>(GetCodeSp, 
                new { P_GROUP_ID = args.Gropu_Id, P_WHERE = args.Where }, 
                commandType: CommandType.StoredProcedure).ToList<CodeModel>();
            }
            catch(Exception ex) {}
            return SelectModel;
        }
    }
}