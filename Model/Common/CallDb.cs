using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using baseapp.Common;
using baseapp.Model.Base;
using Dapper;
using Newtonsoft.Json.Linq;

namespace baseapp.Model.Common
{
    public class ParamsPair : IModel
    {
        public string Key { get; set; }
        public object Values { get; set; }
    }

    public class CallDb
    {
        public CallDb()
        {

        }
        public JObject LoadSql(string SQL, Dictionary<string, object> Params)
        {

            ExpandoObject param = new ExpandoObject();

            IDictionary<string, object> paramData = param as IDictionary<string, object>;

            foreach(var item in Params)
                paramData.Add(item.Key, item.Value);

            JObject returnData;

            using (var connection = new SqlConnection(DbConfig.ConnectionString))
            {
                List<dynamic> sqlResult = connection.Query(SQL, param).AsList();

                returnData = JObject.FromObject(sqlResult);
            }

            return returnData;
        }
    }
}