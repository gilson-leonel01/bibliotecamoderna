#### Passo 1
dotnet add package Swashbuckle.AspNetCore --version 6.8.1
//Para ti tem de ser PostgreSQL 
    dotnet add package MySqlConnector --version 2.4.0

#### Passo 2
dotnet clean
dotnet restore
dotnet build
dotnet run

#### Passo 3
Ou seja adiciona /swagger/index.html na url que te gerarem
    http://localhost:5071/swagger/index.html
