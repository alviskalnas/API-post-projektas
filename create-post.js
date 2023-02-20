async function init() {
  const newUserData = {
    title: 'Pavadinimas',
    body: 'Aprasymas',
    userId: 5,
  }

  const fetchParams = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newUserData),
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', fetchParams);

  const newPost = await response.json();

  console.log(newPost);
  console.log(newPost.title);
  console.log(newPost.body);
  console.log(newPost.userId);
  console.log(newPost.id);
}

init();
  