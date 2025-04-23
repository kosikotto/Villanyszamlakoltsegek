using Microsoft.AspNetCore.Mvc;
using Villanyszamla_backend.Data;
using Villanyszamla_backend.Models;

namespace Villanyszamla_backend.Controllers
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
        public IActionResult GetCalculation([FromQuery] IncomeData data)
        {
            return Ok(dataValidationRepository.Calculate(data));
        }
    }
}