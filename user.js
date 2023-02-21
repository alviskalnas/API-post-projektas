import { firstLetterUpperCase } from "./functions.js";
import { navLinks } from "./config.js";
async function getUserInfo() {

    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    const userId = urlParams.get('user_id') || 1;

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();

    const userInfo = document.querySelector('#user-info');

    userInfo.innerHTML = `
        <p>Full name: <a href="./posts.html?user_id=${user.id}">${user.name}</a></p>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        ${user.phone ? `<p>Phone: ${user.phone}</p>` : ''}
        ${user.website ? `<p>Website: ${user.website}</p>` : ''}
        ${user.company ? `<p>Company: ${user.company.name}</p>` : ''}
        ${user.address ? `
            <p>
                Address:
                <a href="https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}" target="_blank">
                    ${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}
                </a>
            </p>
            <iframe width="1200" height="300" frameborder="0" style="border:0"
                src="https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}&output=embed">
            </iframe>
        ` : ''}
    `;
}

getUserInfo();


const queryParams = location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get('user_id') || 1;

async function getUserAlbums() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    const albums = await response.json();

    const albumsContainer = document.querySelector('#albums-container');

    albumsContainer.innerHTML = `
        <h2>User albums:</h2>
        <ul>
            ${albums.map(album => `
            <li><a href="album.html?id=${album.id}">${firstLetterUpperCase(album.title)}</a></li>
            `).join('')}
        </ul>
    `;
}

getUserAlbums();

async function getUserPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();
    const userPosts = document.querySelector('#user-posts');

    userPosts.innerHTML = `
        <h2>User Posts:</h2>
        <ul>
            ${posts.map(post => `
            <li><a href="post.html?id=${post.id}">${firstLetterUpperCase(post.title)}</a></li>
            `).join('')}
        </ul>
    `;
}

getUserPosts();

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