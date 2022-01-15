using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Options;
using SEEMS.Handlers;
using SEEMS.Handlers.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace SEEMS.Configs
{
    public class GoogleOptions : ExternalAuthOptions
    {
        public override string RedirectPath { get; set; } = "/signin-google";
        public override string AuthenticationUrl =>
            "https://accounts.google.com/o/oauth2/v2/auth";
        public override string ExchangeUrl =>
            "https://www.googleapis.com/oauth2/v4/token";
        public override string DataUrl =>
             "https://www.googleapis.com/oauth2/v2/userinfo";
    }

    public class GoogleHandler : ExternalAuthHandler
    {

        public GoogleHandler(IOptions<GoogleOptions> options,
            IDataProtectionProvider dp,
            ILogger<GoogleHandler> logger) : base((IOptions<ExternalAuthOptions>)options, dp, logger) { }

        protected override IEnumerable<Claim> GetClaims(JsonDocument jsonDoc)
        {
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier,
                jsonDoc.RootElement.GetString("id")));
            claims.Add(new Claim(ClaimTypes.Name,
                jsonDoc.RootElement.GetString("name")?.Replace(" ", "_")));
            claims.Add(new Claim(ClaimTypes.Email,
               jsonDoc.RootElement.GetString("email")));
            return claims;
        }

        protected async override Task<string> GetAuthenticationUrl(
                AuthenticationProperties properties)
        {
            if (CheckCredentials())
            {
                return await base.GetAuthenticationUrl(properties);
            }
            else
            {
                return string.Format(Options.ErrorUrlTemplate, ErrorMessage);
            }
        }

        private bool CheckCredentials()
        {
            string secret = Options.ClientSecret;
            string id = Options.ClientId;
            string defaultVal = "ReplaceMe";
            if (string.IsNullOrEmpty(secret) || string.IsNullOrEmpty(id)
                || defaultVal.Equals(secret) || defaultVal.Equals(secret))
            {
                ErrorMessage = "External Authentication Secret or ID Not Set";
                Logger.LogError("External Authentication Secret or ID Not Set");
                return false;
            }
            return true;
        }
    }
}
