import { fetchData } from "./functions.js";

async function getAlbum() {
const queryParams = location.search;
const urlParams = new URLSearchParams(queryParams);
const albumId = urlParams.get('id');

const album = await fetchData(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
const user = await fetchData(`https://jsonplaceholder.typicode.com/users/${album.userId}`);

const albumInfo = document.querySelector('#album-info');

albumInfo.innerHTML =` <h2>${album.title}</h2> <span>Posted by: </span> <a href="./user.html?id=${user.id}">${user.name}</a> <h3>Album Images:</h3> <ul>`;

const images = await fetchData(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=10`);

images.forEach(image => {
albumInfo.innerHTML += `<li> <img src="${image.thumbnailUrl}" /> </li>` ;
});

albumInfo.innerHTML += '</ul>';
}

getAlbum();



  
(function() {
    const navLinks = [
      { name: 'Home', href: './index.html' },
      { name: 'Users', href: './users.html' },
      { name: 'Albums', href: './albums.html' },
      { name: 'Posts', href: './posts.html' }
    ];
  
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
  })();
  