namespace Villanyszamla_backend.Models
{
    public class ResponseData
    {
        public bool Siker { get; set; }
        public List<int> Evszam { get; set; }
        public Dictionary<Honapok, double[]> HaviKoltes { get; set; }
        public List<double> EvesKoltseg { get; set; }
        public List<bool> KedvezmenyesEvek { get; set; }

        public ResponseData()
        {
            Evszam = new List<int>();
            HaviKoltes = new Dictionary<Honapok, double[]>();
            EvesKoltseg = new List<double>();
            KedvezmenyesEvek = new List<bool>();
        }
    }
}