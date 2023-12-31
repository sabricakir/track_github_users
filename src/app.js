const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');
const github = new Github();
const ui = new UI();

addEventListeners();

function addEventListeners() {
    githubForm.addEventListener('submit', getData);
    clearLastUsers.addEventListener('click', clearAllSearched);
    document.addEventListener('DOMContentLoaded', getAllSearched);
}

function getData(e) {
    let username = nameInput.value.trim();
    if (username === '') {
        ui.showError('Please enter a valid username.');
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === 'Not Found') {
                    ui.showError('Please enter a valid username.');
                } else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched(){
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    users.forEach(user => {
        ui.addSearchedUserToUI(user, false);
    });
}