import { fetchData } from "./functions.js";
import { firstLetterUpperCase } from "./functions.js";

async function getAlbums() {
  const albums = await fetchData('https://jsonplaceholder.typicode.com/albums?_limit=24');
  const pageContent = document.querySelector('#page-content');

  const albumsList = document.createElement('div');
  albumsList.classList.add('albums-list');
  pageContent.append(albumsList);

  albums.forEach(async albumData => {
    const albumWithUserAndPhotos = await fetchData(`https://jsonplaceholder.typicode.com/albums/${albumData.id}?_expand=user&_embed=photos`);
    const photos = albumWithUserAndPhotos.photos;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const randomPhoto = photos[randomIndex];

    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
    albumItem.innerHTML = `
      <a href="./album.html?id=${albumData.id}">
        <img src="${randomPhoto.thumbnailUrl}" title="${randomPhoto.title}" />
      </a>
      <h2>
        <a href="./album.html?id=${albumData.id}">${firstLetterUpperCase(albumWithUserAndPhotos.title)} (${photos.length})</a>
      </h2>
      <span><h4>Author:</h4> <a href="./user.html?id=${albumWithUserAndPhotos.user.id}">${albumWithUserAndPhotos.user.name}</a></span>
    `;

    albumsList.append(albumItem);
  });
}

getAlbums();






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


