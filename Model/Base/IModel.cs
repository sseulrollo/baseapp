using System.Data;

namespace baseapp.Model.Base
{
    public interface IModel
    {

    }

    public interface IModelArgs
    {

    }

    public interface IRepository
    {
        IDbConnection Ctx { get; set; }
    }
}