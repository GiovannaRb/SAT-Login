using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.SAT.Data
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext(options)
    {

    }
}
