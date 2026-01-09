CREATE DATABASE db_biblioteca_moderna;

CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    ano_publicacao INT NOT NULL,
    quantidade_total INT NOT NULL DEFAULT 1,
    quantidade_disponivel INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_quantidade_total 
        CHECK (quantidade_total >= 0),

    CONSTRAINT chk_quantidade_disponivel 
        CHECK (quantidade_disponivel >= 0),

    CONSTRAINT chk_quantidade_disponivel_menor_total 
        CHECK (quantidade_disponivel <= quantidade_total),

    CONSTRAINT chk_ano_publicacao 
        CHECK (ano_publicacao BETWEEN 1000 AND 2100)
);
