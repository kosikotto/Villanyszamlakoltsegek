using Villanyszamla_backend.Models;

namespace Villanyszamla_backend.Data
{
    public interface IDataValidationRepository
    {
        IEnumerable<SecondaryData> Calculate(IncomeData data);
    }
}
