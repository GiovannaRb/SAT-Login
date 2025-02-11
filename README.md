# SAT Login

Este repositório contém uma tela de login, composta por:

- *Backend.SAT*: Aplicação .NET Core( C#)
- *Frontend.SAT*: Aplicação Angular

## Como executar:

### Backend
- Gere o banco com o  comando docker abaixo
-   ``` docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Password@123456789" -p 1434:1433 -d mcr.microsoft.com/mssql/server ```
- Entre na pasta Backend.SAT .
- Rode  o comando ```Update-Database ``` no terminal de nugets para a criação das tabelas.
- E execute dotnet run

### Frontend
- Entre na pasta Frontend.SAT e execute npm install seguido de ng serve.
