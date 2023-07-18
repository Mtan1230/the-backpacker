const titleValue = document.querySelector('#title').value.trim();
const contentValue = document.querySelector('#content').value.trim();

const updatePost = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content && (title !== titleValue || content !== contentValue)) {

    const endpoint = window.location.pathname.split('/');
    const id = endpoint[endpoint.length - 1];

    const res = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('You cannot update this!');
    }
  }
};

const deletePost = async (e) => {
  e.preventDefault();

  const endpoint = window.location.pathname.split('/');
  const id = endpoint[endpoint.length - 1];

  const res = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('You cannot delete this!');
  }
};

document.querySelector('.update-post-btn').addEventListener('click', updatePost);
document.querySelector('.delete-post-btn').addEventListener('click', deletePost);
