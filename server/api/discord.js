require('dotenv').config();

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');

const PRACTICE_CLIENT_ID = process.env.PRACTICE_CLIENT_ID;
const PRACTICE_CLIENT_SECRET = process.env.PRACTICE_CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:5000/api/discord/callback');


router.get('/login', (request, response) => {
  response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${PRACTICE_CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=guilds`);
});

router.get('./callback', catchAsync(async (request, response) => {
  if (!request.query.code) throw new Error('NoCodeProvided');
  const code = request.query.code;
  const credentials = btoa(`${PRACTICE_CLIENT_ID}:${PRACTICE_CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
  const json = await response.json();
  response.redirect(`/?token=${json.access_token}`);
}));


/*=============================================
=            Explanation of 18-30            =
=============================================*/

// 18: wraps everything in a catch
// 19: checking we receive a querystring otherwise throw an error
// 20: setting code to what we receive from url
// 21: encode clientid and client secret as base64 string => this is for token exchange request
// 22-27: add the code to redirect uri to perform token exchange with post request and basic http authorization header
// 28: convert response into json
// 29: redirect to homepage with token ****don't do this for real app

/*=====  End of Explanation of 18-30  ======*/




module.exports = router;