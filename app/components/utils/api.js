const id = "YOUR_CLIENT-ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMessage(message, username) {
  if (message === "Not Found") {
    return `${username} doesen't exist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  // 0 indicates initial value of the accumulator
  return repos.reduce(
    (accumulator, { stargazers_count }) => accumulator + stargazers_count,
    0
  );
}

// algorithm for calculating the winner
function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return (
    Promise.all([getProfile(player), getRepos(player)])
      // then on Promise.all returns an array with the first element beeing the value of the getProfile call
      .then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
      }))
  );
}

function sortPlayers(players) {
  //  if the compare func (arr func here) returns a value > 0 then b before a
  // if value < 0 then a before b
  // if 0 -> a = b
  //   NOTE that utf-16 code unit values are compared and not the values themself
  //   -> a-b descending order and b-a for ascending order
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  );
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}
