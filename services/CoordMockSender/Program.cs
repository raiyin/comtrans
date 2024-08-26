// See https://aka.ms/new-console-template for more information
using System.Text;
using System.Text.Json;

var coordinates = new List<Coordinates>();
coordinates.AddRange(new Coordinates[]{new Coordinates(44.998950, 41.919653),
new Coordinates(44.999212, 41.919743), new Coordinates(44.999521, 41.919846),
new Coordinates(44.999952, 41.919972), new Coordinates(45.000532, 41.920161),
new Coordinates(45.001036, 41.920304), new Coordinates(45.001036, 41.920304),
new Coordinates(45.002188, 41.920655), new Coordinates(45.002188, 41.920655),
new Coordinates(45.003246, 41.920974), new Coordinates(45.003830, 41.921154),
new Coordinates(45.004538, 41.921365), new Coordinates(45.005150, 41.921554),
new Coordinates(45.005874, 41.921774), new Coordinates(45.006505, 41.921962),
new Coordinates(45.007258, 41.922182), new Coordinates(45.007924, 41.922398),
new Coordinates(45.008603, 41.922614), new Coordinates(45.009184, 41.922785),
new Coordinates(45.009918, 41.922998), new Coordinates(45.010582, 41.923214),
new Coordinates(45.011226, 41.923398), new Coordinates(45.011911, 41.923600),
new Coordinates(45.012571, 41.923798), new Coordinates(45.012954, 41.923870),
new Coordinates(45.013105, 41.923320), new Coordinates(45.013193, 41.922758),
new Coordinates(45.013268, 41.922299), new Coordinates(45.013338, 41.921826),
new Coordinates(45.013395, 41.921459), new Coordinates(45.013472, 41.920967),
new Coordinates(45.013565, 41.920363), new Coordinates(45.013655, 41.919775),
new Coordinates(45.013756, 41.919132), new Coordinates(45.013870, 41.918342),
new Coordinates(45.013971, 41.917673), new Coordinates(45.014074, 41.916965),
new Coordinates(45.014187, 41.916229), new Coordinates(45.014356, 41.915448),
new Coordinates(45.014642, 41.915037), new Coordinates(45.014606, 41.914432),
new Coordinates(45.014170, 41.914411), new Coordinates(45.013749, 41.914525),
new Coordinates(45.013359, 41.914405), new Coordinates(45.012941, 41.914282),
new Coordinates(45.012481, 41.914139), new Coordinates(45.012092, 41.914013),
new Coordinates(45.011733, 41.913896), new Coordinates(45.011327, 41.913786),
new Coordinates(45.011327, 41.913786), new Coordinates(45.010489, 41.913540),
new Coordinates(45.010003, 41.913484), new Coordinates(45.009606, 41.913359),
new Coordinates(45.009123, 41.913213), new Coordinates(45.008737, 41.913103),
new Coordinates(45.008287, 41.912965), new Coordinates(45.007811, 41.912821),
new Coordinates(45.007340, 41.912676), new Coordinates(45.006961, 41.912558),
new Coordinates(45.006534, 41.912425), new Coordinates(45.006101, 41.912290),
new Coordinates(45.005681, 41.912167), new Coordinates(45.005210, 41.912026),
new Coordinates(45.004740, 41.911875), new Coordinates(45.004326, 41.911758),
new Coordinates(45.003840, 41.911602), new Coordinates(45.003377, 41.911459),
new Coordinates(45.002853, 41.911306), new Coordinates(45.002372, 41.911160),
new Coordinates(45.001904, 41.911009), new Coordinates(45.001349, 41.910841),
new Coordinates(45.000965, 41.910633), new Coordinates(45.000342, 41.910452),
new Coordinates(45.000206, 41.910925), new Coordinates(45.000110, 41.911554),
new Coordinates(45.000001, 41.912257), new Coordinates(44.999880, 41.913063),
new Coordinates(44.999754, 41.913833), new Coordinates(44.999636, 41.914649),
new Coordinates(44.999509, 41.915508), new Coordinates(44.999368, 41.916370),
new Coordinates(44.999258, 41.917127), new Coordinates(44.999125, 41.918005),
new Coordinates(44.998978, 41.918961) });


var client = new HttpClient() { BaseAddress = new Uri("http://127.0.0.1:5240") };
int coordIndex = 0;

while (true)
{
    var curCoord = coordinates[coordIndex % coordinates.Count];
    var coordString = JsonSerializer.Serialize(curCoord);
    Console.WriteLine(coordString);
    var content = new StringContent(coordString, Encoding.UTF8, "application/json");
    try
    {
        var response = await client.PostAsync("/AandEBacklog", content);
        var responseString = await response.Content.ReadAsStringAsync();
    }
    catch (Exception)
    { }
    //Thread.Sleep(500);
    coordIndex++;
}




public record Coordinates
{
    public double Lat { get; set; }
    public double Lon { get; set; }
    public Coordinates(double lat, double lon) { Lat = lat; Lon = lon; }
}