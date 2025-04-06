namespace T0Y9UZ_FullStack_Feleves
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
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://127.0.0.1:5500"));

            app.MapGet("/", () => "Neptun kód: T0Y9UZ\nNév: Kosik Ottó László\nFeladat: Villanyszámla költségek");

            app.Run();
        }
    }
}