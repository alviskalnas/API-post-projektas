import { fetchData } from './functions.js';
import { API_URL } from './config.js';


async function getPost() {
  const queryParams = location.search;
  const urlParams = new URLSearchParams(queryParams);
  const postId = urlParams.get('id');

  try {
    const response = await fetchData(`${API_URL}/posts/${postId}`);

    if (!response.data) {
      throw new Error('No post data found');
    }

    const post = response.data;
    const postInfo = document.querySelector('#post-info');

    postInfo.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;

    const userResponse = await fetchData(`${API_URL}/users/${post.userId}`);

    if (!userResponse.data) {
      throw new Error('No user data found');
    }

    const user = userResponse.data;
    postInfo.innerHTML += `<span>Posted by: </span><a href="./user.html?id=${user.id}">${user.name}</a>`;

    const commentsResponse = await fetchData(`${API_URL}/comments?postId=${postId}`);

    if (!commentsResponse.data) {
      throw new Error('No comments data found');
    }

    const comments = commentsResponse.data;
    postInfo.innerHTML += `<h3>Comments:</h3><ul> ${comments
      .map(
        comment =>
          `<li>Name: ${comment.name} Body: ${comment.body} Email: <a href="mailto:${comment.email}">${comment.email}</a></li>`
      )
      .join('')} </ul><span>Other </span><a href="./user.html?id=${user.id}">${user.name}</a><span> posts: </span><a href="./posts.html?user_id=${user.id}">Click Here</a>`;
  } catch (error) {
    console.error(error);
    document.querySelector('#post-info').innerHTML = '<p>An error occurred while loading the post</p>';
  }
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










