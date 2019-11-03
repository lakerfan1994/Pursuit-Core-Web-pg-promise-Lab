document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    const specificPosts = document.querySelector('#findIndividualPostsButton');
    const createNewPost = document.querySelector('#createNewPost');
    specificPosts.addEventListener('click', findSpecPosts );
    createNewPost.addEventListener('click', createPost);
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3030/users/all`);
    response.data.users.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;

        usersList.appendChild(listItem);
    });
}

async function loadPosts() {
    const postsList = document.querySelector('#postsList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3030/posts/all`);
    console.log(response);
    while(postsList.firstChild){
        postsList.removeChild(postsList.firstChild);
    }
    response.data.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.poster_id}: ${post.body}`;
        postsList.appendChild(listItem);
    });
}

async function findSpecPosts(){
    const postsList = document.querySelector('#postsList');
    let numberToAddToParams = document.querySelector('#findIndividualPosts').value;
    document.querySelector('#findIndividualPosts').value = '';
    let response = await axios.get(`http://localhost:3030/posts/${numberToAddToParams}`);
    while(postsList.firstChild){
        postsList.removeChild(postsList.firstChild);
    }
    response.data.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.poster_id}: ${post.body}`;
        postsList.appendChild(listItem);
    });

}

async function createPost(){
    let poster_id = document.querySelector('#poster-id').value;
    document.querySelector('#poster-id').value = '';
    let text = document.querySelector('#post-body').value;
    document.querySelector('#post-body').value = '';
    let response = await axios.post('http://localhost:3030/posts/register', {poster_id, text});
    loadPosts();

}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3030/users/register`, { firstname, lastname, age });
    loadUsers();
}