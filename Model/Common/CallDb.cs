using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using baseapp.Common;
using baseapp.Model.Base;
using Dapper;
using Newtonsoft.Json;
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
        public string LoadSql(string SQL, Dictionary<string, object> Params)
        {

            object param = new object();

            param = Params.AsList();
            // IDictionary<string, object> paramData = param as IDictionary<string, object>;

            // foreach(var item in Params)
            //     paramData.Add(item.Key, item.Value);

            string returnData;

            using (var connection = new SqlConnection(DbConfig.ConnectionString))
            {
                List<dynamic> sqlResult = connection.Query(SQL, param, commandType: System.Data.CommandType.StoredProcedure).AsList();
                // var sqlResult = connection.Query(sql, )

                returnData = JsonConvert.SerializeObject(sqlResult);
            }

            return returnData;
        }
    }
}