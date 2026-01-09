using System.ComponentModel.DataAnnotations;

namespace BooksManagement.Models.Entities
{
    public class Livro
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório")]
        [StringLength(255, ErrorMessage = "O título não pode exceder 255 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "O ISBN é obrigatório")]
        [StringLength(20, ErrorMessage = "O ISBN não pode exceder 20 caracteres")]
        public string Isbn { get; set; } = string.Empty;

        [Range(1000, 9999, ErrorMessage = "O ano de publicação deve ser válido")]
        public int AnoPublicacao { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A quantidade total deve ser positiva")]
        public int QuantidadeTotal { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A quantidade disponível deve ser positiva")]
        public int QuantidadeDisponivel { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public bool EstaDisponivel => QuantidadeDisponivel > 0;
    }
}