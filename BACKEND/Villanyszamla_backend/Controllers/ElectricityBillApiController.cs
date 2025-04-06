using Microsoft.AspNetCore.Mvc;
using T0Y9UZ_FullStack_Feleves.Models;

namespace T0Y9UZ_FullStack_Feleves.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ElectricityBillApiController : ControllerBase
    {
        public ElectricityBillApiController()
        {
        }

        [HttpGet]
        public IEnumerable<IncomeData> GetCalculation([FromQuery] IncomeData data)
        {
            
            return new List<IncomeData>() { data };
        }
    }
}
