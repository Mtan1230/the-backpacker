const addPost = async (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('You cannot post this!');
    }
  }
};

document.querySelector('.add-post-btn').addEventListener('click', addPost);