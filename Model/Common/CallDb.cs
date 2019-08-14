using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using baseapp.Common;
using baseapp.Model.Base;
using Dapper;
using System.Linq;
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


        // Read 기능 
        // sql : sql 명
        // params : param 값
        public string LoadSql(string SQL, Dictionary<string, object> Params)
        {
            try
            {
                object param = new object();
                param = Params.AsList();
                string returnData;

                using (var connection = new SqlConnection(DbConfig.ConnectionString))
                {
                    List<dynamic> sqlResult = connection.Query(SQL, param, commandType: System.Data.CommandType.StoredProcedure).AsList();
                    returnData = JsonConvert.SerializeObject(sqlResult);
                }

                return returnData;
            }
            catch(Exception ex)
            {
                string err_msg = ex.Message;

                // 권한에 따른 Error 구분 처리 필요함.

                return err_msg;
            }
        }

        public JObject LoadSqlSingle(string SQL, Dictionary<string, object> Params)
        {

            JObject obj1 = new JObject();

            try
            {
                object param = new object();
                param = Params.AsList();
                List<dynamic> sqlResult;
                List<string> header = new List<string>();


                using (var connection = new SqlConnection(DbConfig.ConnectionString))
                {
                    sqlResult =
                        connection.Query(SQL,
                                        param,
                                        commandType: System.Data.CommandType.StoredProcedure)
                                  .AsList();
                }

                GetHeader(sqlResult, ref header);

                obj1["header"] = JToken.FromObject(header);
                obj1["data"] = JToken.FromObject(sqlResult);

                return obj1;
            }
            catch (Exception ex)
            {
                obj1["err"] = JToken.FromObject(ex.Message);
                return obj1;
            }
        }


        public string ExecuteSql(string SQL, Dictionary<string, object> Params)
        {
            try
            {
                object param = new object();
                param = Params.AsList();
                
                using (var connection = new SqlConnection(DbConfig.ConnectionString))
                {
                    var sqlResult = connection.Execute(SQL, param, commandType: System.Data.CommandType.StoredProcedure);
                }

                return "Ok";
            }
            catch(Exception ex)
            {
                string err_msg = ex.Message;

                // 권한에 따른 Error 구분 처리 필요함.

                return err_msg;
            }
        }

        
        private static void GetHeader(List<dynamic> sqlResult, ref List<string> header)
        {
            foreach (var item in sqlResult)
            {
                header = ((IDictionary<string, object>)item).Keys.ToList<string>();

                if (header.Count() != 0)
                    break;
            }
        }
    }

    public class CodeList
    {
        public string Value { get; set; }
        public string Text { get; set; }        
        public string Key { get; set; }
    }

    
    public class KeyValue
    {
        public string Key { get; set; }
        public string Value { get; set; }      
    }
}