const addComment = async (e) => {
  e.preventDefault();

  const message = document.querySelector('#comment').value.trim();

  if (message) {
    const endpoint = window.location.pathname;

    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      document.location.replace(window.location.href);
    } else {
      alert('You cannot comment this!');
    }
  }
};

document.querySelector('.comment-btn').addEventListener('click', addComment);