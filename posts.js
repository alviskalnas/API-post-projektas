import { firstLetterUpperCase } from './functions.js';
import { navLinks } from './config.js';


async function getPosts() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const userId = urlParams.get('user_id');

  let response;
  if (userId) {
    response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_embed=comments&_limit=20`);
  } else {
    response = await fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_limit=20`);
  }
  const posts = await response.json();
  const postsListContainer = document.querySelector('#posts-list');
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list');
  
  const userPromises = posts.map(post => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(response => response.json());
  });
  const users = await Promise.all(userPromises);

  posts.forEach((post, index) => {
    const user = users[index];
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    postItem.innerHTML = `<a href="./post.html?id=${post.id}">${firstLetterUpperCase(post.title)}</a>
    by <a href="./user.html?id=${post.userId}">${user.name}</a>
    with ${post.comments.length} comments`;
    postsList.append(postItem);
  });

  postsListContainer.append(postsList);
}

getPosts();


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