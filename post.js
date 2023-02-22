import { fetchData, firstLetterUpperCase, getParams } from './functions.js';
import { API_URL } from './config.js';
import { navLinks } from "./config.js";


async function getPost() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const postId = urlParams.get('id');

  const [post, user, comments] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(response => response.json()),
    fetch(`https://jsonplaceholder.typicode.com/users/${postId}`).then(response => response.json()),
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(response => response.json())
  ]);

  const postInfo = document.querySelector('#post-info');
  postInfo.innerHTML = `
    <h2>${post.title}</h2> 
    <p>${post.body}</p>
    <span>Posted by: </span> 
    <a href='./user.html?id=${user.id}'>${user.name}</a>
    <h3>Comments:</h3> 
    <ul> 
      ${comments.map(comment => `
        <li>
          ${comment.name}. ${comment.body}
          <a href="mailto:${comment.email}">${comment.email}</a>
        </li>
      `).join('')} 
    </ul> 
    <span>Other posts by </span> 
    <a href='./posts.html?user_id=${user.id}'>${user.name}</a>
  `;

  const result = await fetchData(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  console.log(result);

  const name = 'john';
  console.log(firstLetterUpperCase(name));

  const params = getParams();
  console.log(params);

  console.log(API_URL);
}

getPost();




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









