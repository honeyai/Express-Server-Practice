require('dotenv').config();

const express = require('express');

const router = express.Router();

const PRACTICE_CLIENT_ID = process.env.PRACTICE_CLIENT_ID;
const PRACTICE_CLIENT_SECRET = process.env.PRACTICE_CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:5000/api/discord/callback');


router.get('/login', (request, response) => {
  response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${PRACTICE_CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=guilds`);
});

module.exports = router;