using System.Globalization;

namespace T0Y9UZ_FullStack_Feleves.Models
{
    public enum Honapok
    {
        Január = 0,
        Február = 1,
        Március = 2,
        Április = 3,
        Május = 4,
        Június = 5,
        Július = 6,
        Augusztus = 7,
        Szeptember = 8,
        Október = 9,
        November = 10,
        December = 11
    }
    public class SecondaryData
    {
        public bool Siker { get; set; }
        public List<int> Evszam { get; set; }
        public Dictionary<Honapok, double[]> HaviKoltes { get; set; }
        public List<double> EvesKoltseg { get; set; }
        public List<bool> KedvezmenyesEvek { get; set; }

        public SecondaryData()
        {
            Evszam = new List<int>();
            HaviKoltes = new Dictionary<Honapok, double[]>();
            EvesKoltseg = new List<double>();
            KedvezmenyesEvek = new List<bool>();
        }
    }
}