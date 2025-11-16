document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const first_name = document.getElementById('first_name').value.trim();
  const last_name = document.getElementById('last_name').value.trim();
  const email = document.getElementById('email').value.trim();
  const messageEl = document.getElementById('signupMessage');

  if (!first_name || !last_name || !email) {
    messageEl.textContent = 'Please fill all fields.';
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/create_member/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email })
    });

    if (!res.ok) throw new Error('Sign up failed');
    messageEl.textContent = 'Successfully signed up! Welcome to the club.';
    document.getElementById('signupForm').reset();
  } catch (err) {
    messageEl.textContent = 'Error signing up. Try again later.';
    console.error(err);
  }
});





async function fetchProjects() {
  try {
    const res = await fetch('/api/projects/');
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    renderProjects(data);
  } catch (err) {
    console.error(err);
  }
}

function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="meta"><span>Start: ${p.start_date}</span><span>End: ${p.end_date}</span></div>
      <div class="meta"><span>Members: ${p.members_count}</span></div>
    `;
    grid.appendChild(card);
  });
}

// Call this function after page load to append API projects
fetchProjects();



async function fetchItems() {
  try {
    const res = await fetch('/api/items/');
    if (!res.ok) throw new Error('Failed to fetch items');
    const data = await res.json();
    renderItems(data);
  } catch (err) {
    console.error(err);
  }
}

function renderItems(items) {
  const grid = document.getElementById('itemsGrid');
  items.forEach(it => {
    const card = document.createElement('div');
    card.className = 'borrowed-card';
    card.innerHTML = `
      <h3>${it.item_name}</h3>
      <p>Borrower: ${it.borrower}</p>
      <div class="meta"><span>Borrowed: ${it.borrowed_date}</span><span>Return: ${it.return_date}</span></div>
    `;
    grid.appendChild(card);
  });
}

// Call after page load to append API items
fetchItems();

