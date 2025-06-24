let selectedProjectIndex = null;

function getProjects() {
  return JSON.parse(localStorage.getItem('projects') || '[]');
}

function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function showProjectForm() {
  document.getElementById('project-form').classList.remove('hidden');
}

function hideProjectForm() {
  document.getElementById('project-form').classList.add('hidden');
  document.getElementById('project-name').value = '';
}

function createProject() {
  const name = document.getElementById('project-name').value.trim();
  if (!name) return alert('El nombre es obligatorio');
  const projects = getProjects();
  projects.push({ name, tickets: [] });
  saveProjects(projects);
  hideProjectForm();
  renderProjects();
}

function renderProjects() {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  const projects = getProjects();
  projects.forEach((project, index) => {
    const div = document.createElement('div');
    div.className = 'project-card' + (index === selectedProjectIndex ? ' selected' : '');
    div.textContent = project.name;
    div.onclick = () => {
      selectedProjectIndex = index;
      renderProjects();
      renderTickets();
    };
    list.appendChild(div);
  });
}

function showTicketForm() {
  document.getElementById('ticket-form').classList.remove('hidden');
}

function hideTicketForm() {
  document.getElementById('ticket-form').classList.add('hidden');
  document.getElementById('ticket-subject').value = '';
}

function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function createTicket() {
  const subject = document.getElementById('ticket-subject').value.trim();
  if (!subject) return alert('El asunto es obligatorio');
  const projects = getProjects();
  if (selectedProjectIndex === null) return alert('Selecciona un proyecto');
  const project = projects[selectedProjectIndex];
  project.tickets.push({
    subject,
    type: 'Bug',
    state: 'New',
    priority: 'Normal',
    updated: getCurrentDateTime()
  });
  saveProjects(projects);
  hideTicketForm();
  renderTickets();
}

function renderTickets() {
  const title = document.getElementById('project-title');
  const tableBody = document.getElementById('ticket-table-body');
  const panel = document.getElementById('ticket-panel');

  if (selectedProjectIndex === null) {
    title.textContent = 'Tickets - [Proyecto]';
    panel.classList.add('hidden');
    return;
  }

  const projects = getProjects();
  const project = projects[selectedProjectIndex];
  title.textContent = `Tickets - ${project.name}`;
  panel.classList.remove('hidden');

  tableBody.innerHTML = '';
  project.tickets.forEach((ticket, i) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${ticket.type}</td>
      <td>${ticket.state}</td>
      <td ondblclick="editPriority(${i})">${ticket.priority}</td>
      <td ondblclick="editSubject(${i})">${ticket.subject}</td>
      <td>${ticket.updated || ''}</td>
      <td>
        <div class="actions-menu-container">
          <button class="actions-button" onclick="toggleDropdown(event)">⋮</button>
          <div class="actions-dropdown hidden">
            <button onclick="editSubject(${i})">✏️ Editar</button>
            <button onclick="deleteTicket(${i})">🗑️ Eliminar</button>
          </div>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editPriority(index) {
  const projects = getProjects();
  const project = projects[selectedProjectIndex];
  const newValue = prompt('Nueva prioridad:', project.tickets[index].priority);
  if (newValue) {
    project.tickets[index].priority = newValue;
    project.tickets[index].updated = getCurrentDateTime();
    saveProjects(projects);
    renderTickets();
  }
}

function editSubject(index) {
  const projects = getProjects();
  const project = projects[selectedProjectIndex];
  const newValue = prompt('Nuevo asunto:', project.tickets[index].subject);
  if (newValue) {
    project.tickets[index].subject = newValue;
    project.tickets[index].updated = getCurrentDateTime();
    saveProjects(projects);
    renderTickets();
  }
}

function deleteTicket(index) {
  const projects = getProjects();
  const project = projects[selectedProjectIndex];
  if (confirm('¿Eliminar este ticket?')) {
    project.tickets.splice(index, 1);
    saveProjects(projects);
    renderTickets();
  }
}

function toggleDropdown(event) {
  event.stopPropagation();
  document.querySelectorAll('.actions-dropdown').forEach(menu => menu.classList.add('hidden'));
  const dropdown = event.target.nextElementSibling;
  dropdown.classList.toggle('hidden');
}

document.addEventListener('click', () => {
  document.querySelectorAll('.actions-dropdown').forEach(menu => menu.classList.add('hidden'));
});

renderProjects();
