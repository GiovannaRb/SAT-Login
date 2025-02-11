# SAT Application

Este repositório contém a aplicação SAT, composta por:

- *Backend.SAT*: Aplicação .NET Core
- *Frontend.SAT*: Aplicação Angular

## Como executar

### Backend
- Entre na pasta Backend.SAT e execute dotnet run.
- E o comando docker abaixo
  **docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Password@123456789" -p 1434:1433 -d mcr.microsoft.com/mssql/server **

### Frontend
- Entre na pasta Frontend.SAT e execute npm install seguido de ng serve.
