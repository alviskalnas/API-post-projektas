
const navLinks = [
  { name: 'Home', href: './index.html' },
  { name: 'Users', href: './users.html' },
  { name: 'Albums', href: './albums.html' },
  { name: 'Posts', href: './posts.html' },
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

const form = document.createElement('form');
form.action = './search.html';
form.method = 'get';

const input = document.createElement('input');
input.type = 'text';
input.name = 'query';
input.placeholder = 'Search...';

const select = document.createElement('select');
select.name = 'category';

const categories = ['posts', 'users', 'comments', 'albums', 'photos'];
categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = firstLetterUpperCase(category);
  select.append(option);
});

form.append(input, select);
navList.prepend(form);

const links = document.querySelectorAll('nav a');

links.forEach(link => {
  if (link.href === window.location.href) {
    link.style.color = 'red';
  }
});