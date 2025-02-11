using Api.SAT.Data;
using Api.SAT.Extensions;
using Api.SAT.Models;
using Api.SAT.Response;
using Api.SAT.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<TokenService>();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Configura��es de usuario
    options.User.RequireUniqueEmail = false; // Desativa a exig�ncia de email �nico
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+"; // Caracteres permitidos no username
    options.SignIn.RequireConfirmedEmail = false; // Desativa a confirma��o de email
    // Configura��es de senha
    options.Password.RequireDigit = false; // N�o exige n�meros
    options.Password.RequireLowercase = false; // N�o exige letras min�sculas
    options.Password.RequireUppercase = false; // N�o exige letras mai�sculas
    options.Password.RequireNonAlphanumeric = false; // N�o exige s�mbolos
    options.Password.RequiredLength = 1; // Tamanho m�nimo da senha (1 caractere)
    options.Password.RequiredUniqueChars = 1; // N�mero m�nimo de caracteres �nicos
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlServer(connectionString));

builder.Services.AddTokenConfig(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapSwagger();
}

app.UseHttpsRedirection();

app.MapGet("/", () => "It's Ok").RequireAuthorization() ;

app.MapPost("/register", async (RegisterRequest request, UserManager<IdentityUser> userManager) =>
{
    var user = new IdentityUser { UserName = request.UserName };
    var result = await userManager.CreateAsync(user, request.Password);

    if (!result.Succeeded)
    {
        return Results.BadRequest(new DefaultResponse(result.Errors.ToString(),false));
    }

    return Results.Ok(new DefaultResponse("Usu�rio registrado com sucesso!",true));
});

app.MapPost("/login", async (LoginRequest request, UserManager<IdentityUser> userManager,SignInManager<IdentityUser> signInManager,TokenService service) =>
{
    var result = await signInManager.PasswordSignInAsync(request.UserName, request.Password, isPersistent: false, lockoutOnFailure: false);

    if (!result.Succeeded)
    {
        return Results.BadRequest("Login falhou.");
    }
    var user = await userManager.FindByNameAsync(request.UserName);

    return Results.Ok(new { accessToken = service.Generate(user!) }) ;
});

app.UseCors(x=> x
        .WithOrigins("*")
        .WithMethods("*")
        .WithHeaders("*")
        );

app.Run();

