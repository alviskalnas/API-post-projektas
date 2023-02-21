import { navLinks } from "./config.js";

async function getUsers() {

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  const pageContent = document.querySelector('#users-list');
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list', 'data-list');

  pageContent.append(usersList);

  let sortedUsers;
  const storedOrder = localStorage.getItem('userOrder');
  if (storedOrder) {
    const order = JSON.parse(storedOrder);
    sortedUsers = users.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  } else {
    sortedUsers = users.sort((a, b) => a.id - b.id);
    localStorage.setItem('userOrder', JSON.stringify(sortedUsers.map(user => user.id)));
  }

  for (const user of sortedUsers) {
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await postsResponse.json();
    const userItem = document.createElement('li');
    userItem.classList.add('user-item');
    userItem.innerHTML = `<a href="./user.html?user_id=${user.id}">${user.name}</a> (${posts.length})`;
    usersList.append(userItem);
  }
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



