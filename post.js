async function getPost() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const postId = urlParams.get('id');
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await response.json();
  
  const postInfo = document.querySelector('#post-info');
  
  postInfo.innerHTML = `<h2>${post.title}</h2> <p>${post.body}</p>` ;
  
  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
  const user = await userResponse.json();
  
  postInfo.innerHTML += `<span>Posted by: </span> <a href='./user.html?id=${user.id}'>${user.name}</a>` ;
  
  const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments = await commentsResponse.json();
  
  postInfo.innerHTML += `<h3>Comments:</h3> <ul> ${comments.map(comment =>`
  <li>
  ${comment.name}. ${comment.body}
  <a href="mailto:${comment.email}">${comment.email}</a>
  </li>
  `).join('')} </ul> <span>Other </span> <a href='./posts.html?user_id=${user.id}'>${user.name}</a> <span>posts</span> <a href='./posts.html?user_id=${user.id}'>Click here</a>` ;
  }
  
  getPost();






(function () {
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










