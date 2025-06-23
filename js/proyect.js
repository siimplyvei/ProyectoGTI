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
  document.getElementById('ticket-title').innerText = `Tickets - ${project.name}`;
  document.getElementById('ticket-count').innerText = `${project.tickets.length} tickets total`;

  const tbody = document.getElementById('ticket-table-body');
  project.tickets.forEach((ticket, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" /></td>
      <td>${idx + 1}</td>
      <td><span class="badge bug">${ticket.type}</span></td>
      <td><span class="badge new">${ticket.status}</span></td>
      <td><span class="badge normal">${ticket.priority}</span></td>
      <td ondblclick="editSubject(${idx})">${ticket.subject}</td>
    `;
    tbody.appendChild(row);
  });
});
