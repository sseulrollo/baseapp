using baseapp.Model.Base;

namespace baseapp.Model.Common
{
    public class User : IModel
    {
        public string USER_ID { get; set; }  
        public string USER_NAME { get; set; }
        public string AUTH { get; set; }
        public string DEPT { get; set; }
    }

    public class UserInfo :IModel
    {
        public string USER_ID { get; set; }
        public string PASSWORD { get; set; }
        public string Token { get; set; }
    }
}