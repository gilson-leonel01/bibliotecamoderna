### BooksManagement API - Endpoints REST

#### Base URL: `http://localhost:5000/api/livros`

---

### 1. Criar Livro
**POST** `/api/livros`

**Request Body:**
```json
{
  "titulo": "O Senhor dos Anéis",
  "isbn": "978-85-7365-829-3",
  "ano_publicacao": 1954,
  "quantidade_total": 5
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "titulo": "O Senhor dos Anéis",
  "isbn": "978-85-7365-829-3",
  "ano_publicacao": 1954,
  "quantidade_total": 5,
  "quantidade_disponivel": 5,
  "created_at": "2026-01-05T10:30:00Z",
  "updated_at": "2026-01-05T10:30:00Z"
}
```

---

### 2. Listar Todos os Livros
**GET** `/api/livros`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "titulo": "O Senhor dos Anéis",
    "isbn": "978-85-7365-829-3",
    "ano_publicacao": 1954,
    "quantidade_total": 5,
    "quantidade_disponivel": 3,
    "created_at": "2026-01-05T10:30:00Z",
    "updated_at": "2026-01-05T10:30:00Z"
  },
  {
    "id": 2,
    "titulo": "1984",
    "isbn": "978-85-7365-807-1",
    "ano_publicacao": 1949,
    "quantidade_total": 10,
    "quantidade_disponivel": 8,
    "created_at": "2026-01-05T11:00:00Z",
    "updated_at": "2026-01-05T11:00:00Z"
  }
]
```

---

### 3. Obter Livro por ID
**GET** `/api/livros/{id}`

**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "O Senhor dos Anéis",
  "isbn": "978-85-7365-829-3",
  "ano_publicacao": 1954,
  "quantidade_total": 5,
  "quantidade_disponivel": 3,
  "created_at": "2026-01-05T10:30:00Z",
  "updated_at": "2026-01-05T10:30:00Z"
}
```

---

### 4. Atualizar Livro
**PUT** `/api/livros/{id}`

**Request Body:**
```json
{
  "titulo": "O Senhor dos Anéis - Edição Especial",
  "isbn": "978-85-7365-829-3",
  "ano_publicacao": 1954,
  "quantidade_total": 8
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "O Senhor dos Anéis - Edição Especial",
  "isbn": "978-85-7365-829-3",
  "ano_publicacao": 1954,
  "quantidade_total": 8,
  "quantidade_disponivel": 6,
  "created_at": "2026-01-05T10:30:00Z",
  "updated_at": "2026-01-05T12:15:00Z"
}
```

---

### 5. Remover Livro
**DELETE** `/api/livros/{id}`

**Response (204 No Content)**

---

### 6. Listar Livros Disponíveis
**GET** `/api/livros/disponiveis`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "titulo": "O Senhor dos Anéis",
    "isbn": "978-85-7365-829-3",
    "ano_publicacao": 1954,
    "quantidade_total": 5,
    "quantidade_disponivel": 3,
    "created_at": "2026-01-05T10:30:00Z",
    "updated_at": "2026-01-05T10:30:00Z"
  }
]
```

---

### Códigos de Status HTTP:
- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Recurso removido com sucesso
- `400 Bad Request` - Dados inválidos na requisição
- `404 Not Found` - Livro não encontrado
- `409 Conflict` - ISBN já existe
- `500 Internal Server Error` - Erro no servidor