namespace Villanyszamla_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            app.UseRouting();

            app.MapControllerRoute(name: "default", pattern: "{controller}/{action}/{id?}");

            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.MapGet("/", () => "Neptun kód: T0Y9UZ\nNév: Kosik Ottó László\nFeladat: Villanyszámla költségek");

            app.Run();
        }
    }
}