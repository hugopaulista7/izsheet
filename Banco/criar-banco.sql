CREATE DATABASE izsheet;
CREATE TABLE core_sistema
(
    id_core_sistema INT NOT NULL PRIMARY KEY, -- primary key column
    nome [NVARCHAR](50) NOT NULL,
    imagem [NVARCHAR](50) NOT NULL,
    descricao [NVARCHAR](50)
    -- specify more columns here
);