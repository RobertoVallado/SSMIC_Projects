class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user) { //display
        this.profile.innerHTML = `
        <div class="card">
              <img src="${user.avatar_url}">
              <a href="${user.html_url}" target="_blank" class="btn">View Profile</a>
            </div>
            <div>
              <span>Public Repos: ${user.public_repos}</span>
              <span>Public Gists: ${user.public_gists}</span>
              <span>Followers: ${user.followers}</span>
              <span>Following: ${user.following}</span>
              <br>
              <ul>
                <li>Company: ${user.company}</li>
                <li>Website/Blog: <a href="https://${user.blog}" target="_blank">${user.blog}</a></li>
                <li>Location: ${user.location}</li>
                <li>Member Since: ${user.created_at}</li>
              </ul>
        </div>
        <h3>Latest Repos</h3>
        <div id="repos"></div>
      `;
    }

    showRepos(repos) { // Show repos
        let output = '';
        repos.forEach(function (repo) {
            output += `
              <div>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div>
                <span>Stars: ${repo.stargazers_count}</span>
                <span>Watchers: ${repo.watchers_count}</span>
                <span>Forks: ${repo.forks_count}</span>
              </div>`;
        });

        // Output repos
        document.getElementById('repos').innerHTML = output;
    }

    showAlert(message, className) { // Show message
        this.clearAlert();
        const div = document.createElement('div');

        div.className = className;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.searchContainer');
        const search = document.querySelector('.search');

        container.insertBefore(div, search);
        
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() { // Clear message
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearProfile() { // Clear profile
        this.profile.innerHTML = '';
    }
}

class Github {
    constructor() {
        // this.client_id = 'd9308aacf8b204d361fd';
        // this.client_secret = '84969aeef73956f4ec9e8716d1840532802bb81b';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        //no user token id
        const profileResponse = await fetch(`https://api.github.com/users/${user}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`);


        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}
//app.js
const github = new Github;
const ui = new UI;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if (userText !== '') {
        github.getUser(userText)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    ui.showAlert('User not found', 'alert alert-danger');
                } else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })
    } else {
        ui.clearProfile();
    }
});