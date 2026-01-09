using Npgsql;

namespace BooksManagement.Config
{
    public class DatabaseConfig
    {
        public static string GetConnectionString()
        {
            return "Host=localhost;Port=5432;Database=db_biblioteca_moderna;Username=postgres;Password=admin";
        }

        public static NpgsqlConnection CreateConnection()
        {
            var connection = new NpgsqlConnection(GetConnectionString());

            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao conectar com o banco de dados: " + ex.Message);
            }
        }
    }
}
