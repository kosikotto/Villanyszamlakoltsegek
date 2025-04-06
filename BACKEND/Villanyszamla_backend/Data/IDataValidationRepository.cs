using T0Y9UZ_FullStack_Feleves.Models;

namespace Villanyszamla_backend.Data
{
    public interface IDataValidationRepository
    {
        IEnumerable<SecondaryData> Calculate(IncomeData data);
    }
}
