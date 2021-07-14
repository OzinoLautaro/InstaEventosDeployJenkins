import { domain, clientId } from '../../auth_config.json';


export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  }

};

export const CLIENT_ID = "844270250118873128";
export const CLIENT_SECRET = "4kFQc5VFURNtbmSFWO5qb9a5Uj0iDli4";
export const REDIRECT_URI = "http://localhost:4200/login";
export const DISCORD_LOGIN_URL = "https://discord.com/api/oauth2/authorize?client_id=844270250118873128&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&response_type=code&scope=connections%20identify%20guilds";
export const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
