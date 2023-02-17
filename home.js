
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