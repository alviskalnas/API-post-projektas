async function getPosts() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const userId = urlParams.get('user_id');
  
  let response;
  if (userId) {
  response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_embed=comments&_limit=20`);
  } else {
  response = await fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_limit=30`);
  }
  const posts = await response.json();
  const pageContent = document.querySelector('#posts-list');
  
  const postsList = document.createElement('ul');
  postsList.classList.add('posts-list');
  
  pageContent.append(postsList);
  
  posts.forEach(async post => {
  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const user = await userResponse.json();
  const postItem = document.createElement('li');
  postItem.classList.add('post-item');
  postItem.innerHTML = `<a href="./post.html?id=${post.id}">${post.title}</a>
  by <a href="./user.html?id=${post.userId}">${user.name}</a>
  with ${post.comments.length} comments`;
  
  postsList.append(postItem);
});
}

getPosts();

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
