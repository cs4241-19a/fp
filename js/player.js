// const play = ({
//   spotify_uri,
//   playerInstance: {
//     _options: {
//       token,
//       id,
//     },
//   },
// }) => {
//   fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({uris: [spotify_uri]}),
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });
// };

// function addToQ(uri) {
//   queue[queue.length] = uri;
//   playQ();
// }

// function playQ() {
//   while (queue.length > 0) {
//     if (!player.getCurrentState()) {
//       if (queue.length > 1) {
//         for (let i = 0; i < queue.length; i++) {
//           queue[i] = queue[i+1];
//         }
//         queue.pop();
//       }
//       playSong(queue[0]);
//     }
//   }
//   playSong(queue[0]);
// }

// function playSong(uri) {
//   play({
//     playerInstance: new Spotify.Player({name: 'The Q'}),
//     spotify_uri: uri,
//   });
// }

// window.onSpotifyWebPlaybackSDKReady = () => {
//   player = new Spotify.Player({
//     name: 'The Q',
//     getOAuthToken: (callback) => {
//       callback(token);
//     },
//     volume: 0.5,
//   });
//   player.connect().then((success) => {
//     if (success) {
//       console.log('The Web Playback SDK successfully connected to Spotify!');
//     }
//   });
//   player.addListener('ready', ({device_id}) => {
//     console.log('The Web Playback SDK is ready to play music!');
//     console.log('Device ID', device_id);
//   });
// };
