import { navLinks } from "./config.js";

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  const pageContent = document.querySelector('#users-list');
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');
  pageContent.append(usersList);
  
  const sortedUsers = users.sort((a, b) => a.id - b.id);
  
  sortedUsers.forEach(user => {
  const userItem = document.createElement('li');
  userItem.classList.add('user-item');
  userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a>`;
  usersList.append(userItem);
  });
  }
  
  getUsers();

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


