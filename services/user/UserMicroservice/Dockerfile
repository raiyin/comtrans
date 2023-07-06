FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

EXPOSE 443
EXPOSE 80

# copy project csproj file and restore it in docker directory
COPY ./*.csproj ./
RUN dotnet restore

# Copy everything into the docker directory and build
COPY . .
RUN dotnet publish -c Release -o /app

# Build runtime final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "UserMicroservice.dll"]
