using System.Text.Json.Serialization;

namespace UserMicroservice.Model
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        User = 1,
        Driver = 2,
    }
}
