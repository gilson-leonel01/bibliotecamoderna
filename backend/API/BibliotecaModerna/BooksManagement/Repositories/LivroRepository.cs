using BooksManagement.Models.Entities;
using BooksManagement.Config;
using Npgsql;

namespace BooksManagement.Repositories
{
    public interface ILivroRepository
    {
        Task<List<Livro>> GetAllAsync();
        Task<Livro?> GetByIdAsync(int id);
        Task<List<Livro>> GetAvailableAsync();
        Task<Livro> CreateAsync(Livro livro);
        Task<Livro> UpdateAsync(Livro livro);
        Task<bool> DeleteAsync(int id);
        Task<bool> IsbnExistsAsync(string isbn, int? excludeId = null);
    }

    public class LivroRepository : ILivroRepository
    {
        public async Task<List<Livro>> GetAllAsync()
        {
            var livros = new List<Livro>();

            using var connection = DatabaseConfig.CreateConnection();
            var query = "SELECT * FROM livros ORDER BY titulo";

            using var command = new NpgsqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                livros.Add(MapReaderToLivro(reader));
            }

            return livros;
        }

        public async Task<Livro?> GetByIdAsync(int id)
        {
            using var connection = DatabaseConfig.CreateConnection();
            var query = "SELECT * FROM livros WHERE id = @id";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            return await reader.ReadAsync() ? MapReaderToLivro(reader) : null;
        }

        public async Task<List<Livro>> GetAvailableAsync()
        {
            var livros = new List<Livro>();

            using var connection = DatabaseConfig.CreateConnection();
            var query = """
                        SELECT * FROM livros
                        WHERE quantidade_disponivel > 0
                        ORDER BY titulo
                        """;

            using var command = new NpgsqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                livros.Add(MapReaderToLivro(reader));
            }

            return livros;
        }

        public async Task<Livro> CreateAsync(Livro livro)
        {
            using var connection = DatabaseConfig.CreateConnection();

            var query = """
                        INSERT INTO livros
                        (titulo, isbn, ano_publicacao, quantidade_total, quantidade_disponivel)
                        VALUES
                        (@titulo, @isbn, @ano_publicacao, @quantidade_total, @quantidade_disponivel)
                        RETURNING id;
                        """;

            using var command = new NpgsqlCommand(query, connection);

            command.Parameters.AddWithValue("@titulo", livro.Titulo);
            command.Parameters.AddWithValue("@isbn", livro.Isbn);
            command.Parameters.AddWithValue("@ano_publicacao", livro.AnoPublicacao);
            command.Parameters.AddWithValue("@quantidade_total", livro.QuantidadeTotal);
            command.Parameters.AddWithValue("@quantidade_disponivel", livro.QuantidadeDisponivel);

            livro.Id = Convert.ToInt32(await command.ExecuteScalarAsync());
            livro.CreatedAt = DateTime.UtcNow;
            livro.UpdatedAt = DateTime.UtcNow;

            return livro;
        }

        public async Task<Livro> UpdateAsync(Livro livro)
        {
            using var connection = DatabaseConfig.CreateConnection();

            var query = """
                        UPDATE livros
                        SET titulo = @titulo,
                            isbn = @isbn,
                            ano_publicacao = @ano_publicacao,
                            quantidade_total = @quantidade_total,
                            quantidade_disponivel = @quantidade_disponivel,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE id = @id
                        """;

            using var command = new NpgsqlCommand(query, connection);

            command.Parameters.AddWithValue("@titulo", livro.Titulo);
            command.Parameters.AddWithValue("@isbn", livro.Isbn);
            command.Parameters.AddWithValue("@ano_publicacao", livro.AnoPublicacao);
            command.Parameters.AddWithValue("@quantidade_total", livro.QuantidadeTotal);
            command.Parameters.AddWithValue("@quantidade_disponivel", livro.QuantidadeDisponivel);
            command.Parameters.AddWithValue("@id", livro.Id);

            await command.ExecuteNonQueryAsync();
            livro.UpdatedAt = DateTime.UtcNow;

            return livro;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = DatabaseConfig.CreateConnection();
            var query = "DELETE FROM livros WHERE id = @id";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@id", id);

            return await command.ExecuteNonQueryAsync() > 0;
        }

        public async Task<bool> IsbnExistsAsync(string isbn, int? excludeId = null)
        {
            using var connection = DatabaseConfig.CreateConnection();

            var query = excludeId.HasValue
                ? "SELECT COUNT(*) FROM livros WHERE isbn = @isbn AND id != @excludeId"
                : "SELECT COUNT(*) FROM livros WHERE isbn = @isbn";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@isbn", isbn);

            if (excludeId.HasValue)
                command.Parameters.AddWithValue("@excludeId", excludeId.Value);

            var count = Convert.ToInt32(await command.ExecuteScalarAsync());
            return count > 0;
        }

        private static Livro MapReaderToLivro(NpgsqlDataReader reader)
        {
            return new Livro
            {
                Id = reader.GetInt32(reader.GetOrdinal("id")),
                Titulo = reader.GetString(reader.GetOrdinal("titulo")),
                Isbn = reader.GetString(reader.GetOrdinal("isbn")),
                AnoPublicacao = reader.GetInt32(reader.GetOrdinal("ano_publicacao")),
                QuantidadeTotal = reader.GetInt32(reader.GetOrdinal("quantidade_total")),
                QuantidadeDisponivel = reader.GetInt32(reader.GetOrdinal("quantidade_disponivel")),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at")),
                UpdatedAt = reader.GetDateTime(reader.GetOrdinal("updated_at"))
            };
        }
    }
}
