using System.Globalization;
using T0Y9UZ_FullStack_Feleves.Models;

namespace Villanyszamla_backend.Data
{
    public class DataValidationRepository : IDataValidationRepository
    {
        public IEnumerable<SecondaryData> Calculate(IncomeData data)
        {
            try
            {
                int cols = data.datas.Trim().Split('\n')[0].Trim().Split(',').Length;
                int rows = data.datas.Trim().Split('\n').Length;

                var col_rows = CreateMatrix(data, cols, rows);

                double egysegar = double.Parse(data.egysegar, CultureInfo.InvariantCulture);

                if (egysegar >= -2000 && egysegar <= 2000)
                {
                    SecondaryData datas = new SecondaryData();

                    datas.Siker = true;

                    return new List<SecondaryData>() { datas };
                }

                else
                {
                    SecondaryData datas = new SecondaryData();

                    datas.Siker = false;

                    return new List<SecondaryData>() { datas };
                }
            }

            catch (Exception ex)
            {
                SecondaryData datas = new SecondaryData();

                datas.Siker = false;

                return new List<SecondaryData>() { datas };
            }
        }
        private string[,] CreateMatrix(IncomeData data, int cols, int rows)
        {
            string[,] values = new string[rows, cols];

            for (int i = 0; i < rows; i++)
            {
                var oszlopok = data.datas.Trim().Split('\n')[i];
                var asd = oszlopok.Trim().Split(',').Length;
                if (cols >= oszlopok.Trim().Split(',').Length)
                {
                    for (int j = 0; j < oszlopok.Trim().Split(',').Length; j++)
                    {
                        var local = oszlopok.Trim().Split(',')[j].Trim();
                        values[i, j] = local;
                    }
                }

                else
                {
                    for (int j = 0; j < cols; j++)
                    {
                        var local = oszlopok.Trim().Split(',')[j].Trim();
                        values[i, j] = local;
                    }
                }
            }

            return values;
        }
        private SecondaryData HavidijKiszamitas(SecondaryData datas, int rows, int cols, string[,] rawData, double egysegar)
        {
            Dictionary<Honapok, double[]> HaviKoltes = new Dictionary<Honapok, double[]>();

            for (int i = 1; i < rows; i++)
            {
                double[] local = new double[cols];
                for (int j = 0; j < cols; j++)
                {
                    local[j] = (double)(double.Parse(rawData[i, j], CultureInfo.InvariantCulture) * egysegar + 23.4);
                }

                HaviKoltes.Add((Honapok)(i - 1), local);
            }

            for (int i = 0; i < cols; i++)
            {
                datas.Evszam.Add(int.Parse(rawData[0, i]));
            }

            datas.HaviKoltes = HaviKoltes;

            return datas;
        }

    }
}
