require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require(`spotify-web-api-node`)

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  // Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


// Iteration 3 step 1 Homepage
app.get('/', (req, res) => {
  res.render('home')

});

// Iteration 3 step 2 /artist-search
app.get('/artist-search', (req, res) => {
  spotifyApi
    .searchArtists(req.query.name)
    .then((data) => {
      console.log(data.body.artists.items)
      /* console.log(data.body.artists.items[0].name) */
      res.render('artist-search-results', {data})
    })
    .catch(err => console.log('this is an error =>  ', err))
}) 

// iteration 4
app.get('/albums/:artistId', (req, res) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
  .then((result) => {
    console.log(result)
    res.render('albums', result)
  })
  .catch(err => console.log('error for showing the album', err))
  
});

// iteration 5

app.get('/tracks/:trackId', (req, res) => {
  spotifyApi.getArtistAlbums(req.params.trackId)
  .then((result) => {
    console.log(result)
    res.render('tracks', result)
  })
  .catch(err => console.log('error for showing the tracks', err))
})


/* app.get('/', (req, res) => {

    spotifyApi.searchArtists('madonna')
      .then((data) => {
        console.log(data.body.artists.items[0])
      })
      .catch(err => console.log('this is an error =>  ', err))
  
    res.send('check your console')
  })  */

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
