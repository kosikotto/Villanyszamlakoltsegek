using Villanyszamla_backend.Models;

namespace Villanyszamla_backend.Data
{
    public interface IDataValidationRepository
    {
        ResponseData Calculate(IncomeData data);
    }
}
