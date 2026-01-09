using BooksManagement.Models.Entities;
using BooksManagement.Repositories;

namespace BooksManagement.Services
{
    public interface ILivroService
    {
        Task<List<Livro>> GetAllAsync();
        Task<Livro?> GetByIdAsync(int id);
        Task<List<Livro>> GetAvailableAsync();
        Task<Livro> CreateAsync(Livro livro);
        Task<Livro> UpdateAsync(int id, Livro livro);
        Task<bool> DeleteAsync(int id);
    }

    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _livroRepository;

        public LivroService(ILivroRepository livroRepository)
        {
            _livroRepository = livroRepository;
        }

        public async Task<List<Livro>> GetAllAsync()
        {
            return await _livroRepository.GetAllAsync();
        }

        public async Task<Livro?> GetByIdAsync(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            var livro = await _livroRepository.GetByIdAsync(id);
            
            if (livro == null)
                throw new KeyNotFoundException($"Livro com ID {id} não encontrado");

            return livro;
        }

        public async Task<List<Livro>> GetAvailableAsync()
        {
            return await _livroRepository.GetAvailableAsync();
        }

        public async Task<Livro> CreateAsync(Livro livro)
        {
            ValidateLivro(livro);

            var isbnExists = await _livroRepository.IsbnExistsAsync(livro.Isbn);
            if (isbnExists)
                throw new InvalidOperationException($"ISBN {livro.Isbn} já está cadastrado");

            if (livro.QuantidadeDisponivel > livro.QuantidadeTotal)
                livro.QuantidadeDisponivel = livro.QuantidadeTotal;

            return await _livroRepository.CreateAsync(livro);
        }

        public async Task<Livro> UpdateAsync(int id, Livro livro)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            var existingLivro = await _livroRepository.GetByIdAsync(id);
            if (existingLivro == null)
                throw new KeyNotFoundException($"Livro com ID {id} não encontrado");

            ValidateLivro(livro);

            var isbnExists = await _livroRepository.IsbnExistsAsync(livro.Isbn, id);
            if (isbnExists)
                throw new InvalidOperationException($"ISBN {livro.Isbn} já está cadastrado em outro livro");

            livro.Id = id;

            if (livro.QuantidadeTotal < existingLivro.QuantidadeTotal)
            {
                var diferenca = existingLivro.QuantidadeTotal - livro.QuantidadeTotal;
                livro.QuantidadeDisponivel = Math.Max(0, livro.QuantidadeDisponivel - diferenca);
            }
            else if (livro.QuantidadeTotal > existingLivro.QuantidadeTotal)
            {
                var diferenca = livro.QuantidadeTotal - existingLivro.QuantidadeTotal;
                livro.QuantidadeDisponivel = Math.Min(livro.QuantidadeTotal, 
                    livro.QuantidadeDisponivel + diferenca);
            }

            livro.QuantidadeDisponivel = Math.Min(livro.QuantidadeDisponivel, livro.QuantidadeTotal);

            return await _livroRepository.UpdateAsync(livro);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new ArgumentException("ID inválido");

            var livro = await _livroRepository.GetByIdAsync(id);
            if (livro == null)
                throw new KeyNotFoundException($"Livro com ID {id} não encontrado");

            if (livro.QuantidadeDisponivel < livro.QuantidadeTotal)
                throw new InvalidOperationException("Não é possível excluir um livro que possui cópias emprestadas");

            return await _livroRepository.DeleteAsync(id);
        }

        private void ValidateLivro(Livro livro)
        {
            if (string.IsNullOrWhiteSpace(livro.Titulo))
                throw new ArgumentException("O título é obrigatório");

            if (livro.Titulo.Length > 255)
                throw new ArgumentException("O título não pode exceder 255 caracteres");

            if (string.IsNullOrWhiteSpace(livro.Isbn))
                throw new ArgumentException("O ISBN é obrigatório");

            if (livro.Isbn.Length > 20)
                throw new ArgumentException("O ISBN não pode exceder 20 caracteres");

            if (livro.AnoPublicacao < 1000 || livro.AnoPublicacao > DateTime.Now.Year + 1)
                throw new ArgumentException("O ano de publicação é inválido");

            if (livro.QuantidadeTotal < 0)
                throw new ArgumentException("A quantidade total não pode ser negativa");

            if (livro.QuantidadeDisponivel < 0)
                throw new ArgumentException("A quantidade disponível não pode ser negativa");
        }
    }
}
