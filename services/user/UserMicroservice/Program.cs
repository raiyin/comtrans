using UserMicroservice.Data;
using UserMicroservice.Services.MailService;
using UserMicroservice.Services.UserServices;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddDebug();

var allowedOriginsForCors = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOriginsForCors,
        policy =>
        {
            policy.WithOrigins(builder.Configuration["AllowedHosts"]).AllowAnyMethod().AllowAnyHeader();
        });
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddDbContext<DataContext>();

var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build(); 
ICollection<string> urls;
app.Lifetime.ApplicationStarted.Register(() =>
{
    urls = app.Urls;
});

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(allowedOriginsForCors);
app.UseAuthorization();

app.MapControllers();
app.Run();
