import { firstLetterUpperCase } from "./functions.js";
import { navLinks } from "./config.js";

async function getRandomData() {
  
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersResponse.json();
  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 5);

  const usersListContainer = document.querySelector('#users-list');
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');
  usersListContainer.append(usersList);

  for (const user of randomUsers) {
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await postsResponse.json();
    const userItem = document.createElement('li');
    userItem.classList.add('user-item');
    userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a> (${posts.length})`;
    usersList.append(userItem);
  }

  const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_limit=5`);
  const posts = await postsResponse.json();
  const postsListContainer = document.querySelector('#posts-list');
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list');
  postsListContainer.append(postsList);

  for (const post of posts) {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const user = await userResponse.json();
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    postItem.innerHTML = `<a href="./post.html?id=${post.id}">${firstLetterUpperCase(post.title)}</a>
    by <a href="./user.html?id=${post.userId}">${user.name}</a>
    with ${post.comments.length} comments`;
    
    postsList.append(postItem);
  }

  const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?_limit=5`);
  const albums = await albumsResponse.json();
  const albumsListContainer = document.querySelector('#albums-list');
  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');
  
  for (const albumData of albums) {
    const albumWithUserAndPhotos = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumData.id}?_expand=user&_embed=photos`);
    const album = await albumWithUserAndPhotos.json();
    const randomIndex = Math.floor(Math.random() * album.photos.length);
    const randomPhoto = album.photos[randomIndex];
  
    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
    albumItem.innerHTML = `
      <a href="./album.html?id=${album.id}">
        <img src="${randomPhoto.thumbnailUrl}" title="${randomPhoto.title}" />
      </a>
      <h2>
        <a href="./album.html?id=${album.id}">${firstLetterUpperCase(album.title)} (${album.photos.length})</a>
      </h2>
      <span><h4>Author:</h4> <a href="./user.html?id=${album.user.id}">${album.user.name}</a></span>
    `;
  
    albumsList.append(albumItem);
  }
  
  albumsListContainer.append(albumsList);
  
}
getRandomData()

function renderNavLinks() {
  const navList = document.querySelector('#nav-links');
  
  navLinks.forEach(link => {
    const navItem = document.createElement('li');
    const navItemLink = document.createElement('a');
    navItemLink.textContent = link.name;
    navItemLink.href = link.href;
    navItem.append(navItemLink);
    navList.append(navItem);
  });
  
  const links = document.querySelectorAll('nav a');
  
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.style.color = 'red';
    }
  });
}
window.addEventListener('load', function() {
  renderNavLinks();
});