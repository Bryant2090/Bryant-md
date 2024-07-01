const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUcwbUFXbkFOM3BocC9ZN1YwUmFIMUxab1ZiSVlFTlJmeGhYVVV3ekNYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUQyRnJsZGJ4MGZocnhFWnczNkptbUl6dDNubzBzc0FjTU5yZlA3Q2FGQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQ1huSUg2bVVIM2FqQnpNeC9SK21McUEwc3Bka3VZTVIwT1hDVUo1eFZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJWEJubEd4L2Z0UDdrb1BSNHhJMkhQY0JCT0F3d1l6QWpGZkJaTzN1b24wPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitQaXJCTnBsYnp0R3JVcGxFaFp1Ui95NHlDVGsvV2tpYWNaWFd1SGswSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJtMGNuVSt2SG5mTytLcnlIWVcxVHhvSURibjhkalg5bUxsWU5Ra0ZDd0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU4yN3FWVGlRODRrcTRIbi9OTFozUnQ1ZldFaHdRQ2tvUGtMSnM4V3dHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXY3QjR4R2lyL1A3NHBDdG84WHJod0tpZkZ5NVBtYlZ6dTRLaDgycHJqQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNQQnF0RGZ1aCt6MENSd1pkdHNVcC80VDBpOWJObTY2OHhLRFJqM0pVaktZcFduT3hrZ3ZZc3hCR2tOZFo3MzMrSkFGN0hwdkoxYmxQcVMwNlo2UERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJERmRUaEVjcGduOUJmY2ZwRG1wa1lmd29IMGh3bHdTQllVdkJjQ1VGWGFFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzUzMDcyOTIzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0NjBBNkI2MTIyOTg5Njc5MEUzQzNEMEFENkNGMzgwNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5Njg0OTAyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1MzA3MjkyMzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzcyNzc0RjYwMUVFQzM5NzZEOEQyQkZCMThFQUFENzkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTY4NDkwNH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRGdJd2RJXzhRODZMUFV3UThIUGpwUSIsInBob25lSWQiOiJkNGE3MzdkNi0xMDUzLTRjMzItOTg5NC0xYzRlOWE0Y2ViMzgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFgwYm05M0RRQ2cvSUlSaFBraE1QRVI5cTdvPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFWVDcxWm0zKzRyV1lpVXNhdE9YcDVWV2lzZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJQOUNCOTFLNCIsIm1lIjp7ImlkIjoiMjMzNTMwNzI5MjMzOjUzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmqnwnZqq8J2QmPCdmqvwnZq08J2auyDwnZq78J2atfCdkILwnZquIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQTzNrcm9ERUpXZWdiUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmN3VVSjFjQzlLVGx0d0ZGNmg4VkJ3eHZ1M0p5N2x4SEVVWWVzR0NRT1dvPSIsImFjY291bnRTaWduYXR1cmUiOiJielNPeXpMV1pyaTdmb3pVWDFmc3pobjBTKzh2RzBrY2NsZEYvSWRNWGxHU1k2OGc4MnBGVmdoOUV4aExrL2JFbnVKTHY4SUFKQXZsR25TTDIvb0tCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidUFTVkpHTER6eEFYdzlRZkV1R2U0S1A0YTBnRkpnbnZjaTI0dU1vcEVEbHZQQVV2bFkwcXNIYmhtRUJ5L0Y1WllTbVNzWWhrd3pISjEwTmNTOXpBQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1MzA3MjkyMzM6NTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWCs3bENkWEF2U2s1YmNCUmVvZkZRY01iN3R5Y3U1Y1J4RkdIckJna0RscSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTY4NDg5OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDdWkifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Beltah KE",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
