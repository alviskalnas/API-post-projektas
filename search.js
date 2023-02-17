const queryParams = new URLSearchParams(location.search);
const query = queryParams.get('query');
const results = document.querySelector('#results');

fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      results.innerHTML = '<p>No results found for your search query.</p>';
    } else {
      results.innerHTML = '<ul>';
      data.forEach(item => {
        results.innerHTML += `<li>${item.title}</li>`;
      });
      results.innerHTML += '</ul>';
    }
  })
  .catch(error => {
    results.innerHTML = '<p>An error occurred while fetching the results. Please try again later.</p>';
    console.error(error);
  });


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