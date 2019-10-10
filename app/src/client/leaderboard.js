import escape from 'lodash/escape';

const leaderboard = document.getElementById('leaderboard');

const rows = document.querySelectorAll('#leaderboard table tr');

export function updateLeaderboard(data) {
  for (let i = 0; i < data.length; i++) {
    rows[i + 1].innerHTML = `<td>${escape(data[i].username.slice(0, 15)) || 'Anonymous'}</td><td>${
      data[i].score
    }</td>`;
  }
  for (let i = data.length; i < 5; i++) {
    rows[i + 1].innerHTML = '<td>-</td><td>-</td>';
  }
}

export function setLeaderboardHidden(hidden) {
  if (hidden) {
    leaderboard.classList.add('hidden');
	 health.classList.add('hidden');
    scale.classList.add('hidden');
    turn.classList.add('hidden');
  } else {
    leaderboard.classList.remove('hidden');
	 health.classList.remove('hidden');
    scale.classList.remove('hidden')
    turn.classList.remove('hidden')
  }
}
