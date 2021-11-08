import { domain, clientId } from '../../auth_config.json';


export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyBaWpIbh8cKst4PewcKBU5eZ7yiElLnP8Q",
    authDomain: "discordbot-946b9.firebaseapp.com",
    databaseURL: "https://discordbot-946b9-default-rtdb.firebaseio.com",
    projectId: "discordbot-946b9",
    storageBucket: "discordbot-946b9.appspot.com",
    messagingSenderId: "602685003466",
    appId: "1:602685003466:web:64541d027c75df5ea34633",
    measurementId: "G-K9NG82BPKR"
  },
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  }

};

export const CLIENT_ID = "844270250118873128";
export const CLIENT_SECRET = "4kFQc5VFURNtbmSFWO5qb9a5Uj0iDli4";
export const REDIRECT_URI = "https://discordbot-946b9.web.app/login";
export const DISCORD_LOGIN_URL = "https://discord.com/api/oauth2/authorize?client_id=844270250118873128&redirect_uri=https%3A%2F%2Fdiscordbot-946b9.web.app%2Flogin&response_type=code&scope=identify%20connections%20guilds";
export const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
export const CHROME_BIN ='/usr/bin/chromium';

export const MP_PUBLIC_KEY = 'APP_USR-a9dfe689-b97a-4ea5-b65d-4e1e0d3f2b84';
export const MP_PRIVATE_KEY = 'APP_USR-2324857734347598-082713-d364f6c00d67c7a4a7f5587157d1436f-230878580';
