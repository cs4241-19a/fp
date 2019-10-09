import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

var login = document.getElementById('login');
var playMenu = document.getElementById('play-menu');
var playButton = document.getElementById('play-button');
var usernameInput = document.getElementById('username-input');

var login_or_start = 0; // 0 = login; 1 = start

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  login.style.diplay = 'block';
  document.getElementById('instructions').style.display = 'none';

    usernameInput.focus();
    playButton.onclick = () => { 
      // Play!

     switch (document.getElementById('selected_color').value) {
        case 'red':
          document.getElementById('health_header').class = 'red_tank.png'; // set what color tank to use
          break;
        case 'green':
          document.getElementById('health_header').class = 'green_tank.png'; // set what color tank to use
          break;
        case 'blue':
          document.getElementById('health_header').class = 'blue_tank.png'; // set what color tank to use
          break;
        case 'purple':
          document.getElementById('health_header').class = 'purple_tank.png'; // set what color tank to use
          break;
     }
         
    var displayNameNew = ""
    if(usernameInput.value === ''){
      displayNameNew = usernameInput.placeholder;
    }
    else{
      displayNameNew = usernameInput.value;
    }
    var myRequest = new Request('/update_user', {
      method: 'POST', 
      body: JSON.stringify({ username:USERNAME, displayName:displayNameNew, color:document.getElementById('selected_color').value}), 
      headers: { 'Content-Type': 'application/json' }
    });
    fetch(myRequest).then(function(response) {
      response.json().then(function(json_data) {
        console.log("updated user defaults")
      });
    });
      
      play(displayNameNew);
      playMenu.classList.add('hidden');
      initState();
      startCapturingInput();
      startRendering();
      setLeaderboardHidden(false);
    };
  
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}

