function showTicketForm() {
  document.getElementById('ticket-form').classList.remove('hidden');
}

function hideTicketForm() {
  document.getElementById('ticket-form').classList.add('hidden');
}

function createTicket() {
  const subject = document.getElementById('ticket-subject').value.trim();
  if (!subject) {
    alert('El asunto no puede estar vacío');
    return;
  }

  const index = localStorage.getItem('currentProjectIndex');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const ticket = { type: 'Bug', status: 'New', priority: 'Normal', subject };
  projects[index].tickets.push(ticket);
  localStorage.setItem('projects', JSON.stringify(projects));
  location.reload();
}

function deleteTicket(ticketIndex) {
  const index = localStorage.getItem('currentProjectIndex');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects[index].tickets.splice(ticketIndex, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  location.reload();
}

function updatePriority(ticketIndex, newPriority) {
  const index = localStorage.getItem('currentProjectIndex');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects[index].tickets[ticketIndex].priority = newPriority;
  localStorage.setItem('projects', JSON.stringify(projects));
}

function editSubject(ticketIndex) {
  const index = localStorage.getItem('currentProjectIndex');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const current = projects[index];
  const newSubject = prompt('Nuevo asunto:', current.tickets[ticketIndex].subject);
  if (newSubject && newSubject.trim()) {
    current.tickets[ticketIndex].subject = newSubject.trim();
    localStorage.setItem('projects', JSON.stringify(projects));
    location.reload();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const index = localStorage.getItem('currentProjectIndex');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const project = projects[index];

  if (!project) return;
  document.getElementById('project-title').innerText = project.name;

  const tbody = document.getElementById('ticket-table-body');
  project.tickets.forEach((ticket, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${ticket.type}</td>
      <td>${ticket.status}</td>
      <td>
        <select onchange="updatePriority(${idx}, this.value)">
          <option value="Low" ${ticket.priority === 'Low' ? 'selected' : ''}>Low</option>
          <option value="Normal" ${ticket.priority === 'Normal' ? 'selected' : ''}>Normal</option>
          <option value="High" ${ticket.priority === 'High' ? 'selected' : ''}>High</option>
        </select>
      </td>
      <td ondblclick="editSubject(${idx})">${ticket.subject}</td>
      <td><button onclick="deleteTicket(${idx})">Eliminar</button></td>
    `;
    tbody.appendChild(row);
  });
});
