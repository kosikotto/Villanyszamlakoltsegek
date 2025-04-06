using Microsoft.AspNetCore.Mvc;
using Villanyszamla_backend.Models;
using Villanyszamla_backend.Data;

namespace T0Y9UZ_FullStack_Feleves.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ElectricityBillApiController : ControllerBase
    {
        IDataValidationRepository dataValidationRepository { get; set; }
        public ElectricityBillApiController()
        {
            this.dataValidationRepository = new DataValidationRepository();
        }

        [HttpGet]
        public IEnumerable<SecondaryData> GetCalculation([FromQuery] IncomeData data)
        {

            return dataValidationRepository.Calculate(data);
        }
    }
}
