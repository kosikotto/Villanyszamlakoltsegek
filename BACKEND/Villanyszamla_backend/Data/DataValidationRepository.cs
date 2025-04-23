using System.Globalization;
using Villanyszamla_backend.Models;

namespace Villanyszamla_backend.Data
{
    public class DataValidationRepository : IDataValidationRepository
    {
        public ResponseData Calculate(IncomeData data)
        {
            try
            {
                int cols = data.datas.Trim().Split('\n')[0].Trim().Split(',').Length;
                int rows = data.datas.Trim().Split('\n').Length;

                var col_rows = CreateMatrix(data, cols, rows);

                double egysegar = double.Parse(data.egysegar, CultureInfo.InvariantCulture);

                if (egysegar >= -2000 && egysegar <= 2000)
                {
                    ResponseData datas = new ResponseData();
                    datas = HavidijKiszamitas(datas, rows, cols, col_rows, egysegar);

                    datas = EveskoltsegKiszamitas(datas, cols, rows);

                    datas = EgymastKovetoEvekAkcio(datas, cols, rows);

                    datas.Siker = true;

                    return datas;
                }

                else
                {
                    ResponseData datas = new ResponseData();

                    datas.Siker = false;

                    return datas;
                }
            }

            catch (Exception ex)
            {
                ResponseData datas = new ResponseData();

                datas.Siker = false;

                return datas;
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
        private bool ErtekekCheck(int rows, int cols, string[,] rawData)
        {
            for (int i = 0; i < cols; i++)
            {
                int countRows = 0;
                for (int j = 0; j < rows; j++)
                {
                    var element = rawData[j, i];

                    if (rawData[j, i] != null && rawData[j, i].Length > 0)
                    {
                        if (j == 0)
                        {
                            try
                            {
                                int tmp = int.Parse(rawData[j, i]);
                                countRows++;
                            }

                            catch
                            {
                                return false;
                            }
                        }

                        else
                        {
                            try
                            {
                                double tmp = double.Parse(rawData[j, i], CultureInfo.InvariantCulture);
                                countRows++;
                            }

                            catch
                            {
                                return false;
                            }
                        }
                    }

                    else
                    {
                        return false;
                    }
                }

                if (countRows != 13)
                {
                    return false;
                }
            }

            return true;
        }
        private ResponseData HavidijKiszamitas(ResponseData datas, int rows, int cols, string[,] rawData, double egysegar)
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
        private ResponseData EveskoltsegKiszamitas(ResponseData datas, int cols, int rows)
        {
            for (int i = 0; i < cols; i++)
            {
                double summaYear = 0;

                for (int j = 0; j < rows - 1; j++)
                {
                    summaYear += datas.HaviKoltes[(Honapok)j][i];
                }
                datas.EvesKoltseg.Add(summaYear);
                datas.KedvezmenyesEvek.Add(false);
            }

            return datas;
        }
        private ResponseData EgymastKovetoEvekAkcio(ResponseData datas, int cols, int rows)
        {
            int counter = 0;
            for (int i = 0; i < cols; i++)
            {
                double evesKoltseg = datas.EvesKoltseg[i];
                if (counter == 2)
                {
                    double localSumma = 0;
                    for (int j = 0; j < rows - 1; j++)
                    {
                        var honap = (Honapok)j;
                        datas.HaviKoltes[honap][i] -= (int)(datas.HaviKoltes[honap][i] * 0.13);
                        localSumma += datas.HaviKoltes[honap][i];
                    }

                    datas.EvesKoltseg[i] = localSumma;
                    datas.KedvezmenyesEvek[i] = true;

                    counter = 0;
                }

                if (evesKoltseg > 350000)
                {
                    counter++;
                }
                else
                {
                    counter = 0;
                }
            }

            return datas;
        }
    }
}