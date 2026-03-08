namespace Villanyszamla_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Ez jó, így hallgat minden IP-n a konténeren belül
            builder.WebHost.UseUrls("http://*:5063");

            builder.Services.AddControllers();
            
            // Ha használsz CORS-t, érdemes itt is regisztrálni a service-t (opcionális, de tiszta)
            builder.Services.AddCors();

            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            // 1. LÉPÉS: Routing (Útvonal meghatározása)
            app.UseRouting();

            // 2. LÉPÉS: CORS (Itt kell lennie! A Routing után, de a Map előtt)
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // 3. LÉPÉS: Végpontok (Itt dől el, melyik Controller fut le)
            app.MapControllers();

            app.Run();
        }
    }
}