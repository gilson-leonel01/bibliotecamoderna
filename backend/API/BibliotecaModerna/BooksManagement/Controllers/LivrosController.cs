using BooksManagement.Models.Entities;
using BooksManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace BooksManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            _livroService = livroService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Livro>>> GetAll()
        {
            try
            {
                var livros = await _livroService.GetAllAsync();
                return Ok(livros);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao buscar livros", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Livro>> GetById(int id)
        {
            try
            {
                var livro = await _livroService.GetByIdAsync(id);
                return Ok(livro);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao buscar livro", details = ex.Message });
            }
        }

        [HttpGet("disponiveis")]
        public async Task<ActionResult<List<Livro>>> GetAvailable()
        {
            try
            {
                var livros = await _livroService.GetAvailableAsync();
                return Ok(livros);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao buscar livros disponíveis", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Livro>> Create([FromBody] Livro livro)
        {
            try
            {
                // Garantir que quantidade disponível seja igual à total ao criar
                livro.QuantidadeDisponivel = livro.QuantidadeTotal;

                var novoLivro = await _livroService.CreateAsync(livro);
                return CreatedAtAction(nameof(GetById), new { id = novoLivro.Id }, novoLivro);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao criar livro", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Livro>> Update(int id, [FromBody] Livro livro)
        {
            try
            {
                var livroAtualizado = await _livroService.UpdateAsync(id, livro);
                return Ok(livroAtualizado);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao atualizar livro", details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var resultado = await _livroService.DeleteAsync(id);
                
                if (resultado)
                    return NoContent();
                else
                    return NotFound(new { error = "Livro não encontrado" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Erro interno ao remover livro", details = ex.Message });
            }
        }
    }
}