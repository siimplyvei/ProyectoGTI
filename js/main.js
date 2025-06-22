function showProjectForm() {
  document.getElementById('project-form').classList.remove('hidden');
}

function hideProjectForm() {
  document.getElementById('project-form').classList.add('hidden');
}

function createProject() {
  const name = document.getElementById('project-name').value.trim();
  if (!name) {
    alert('El nombre no puede estar vacío');
    return;
  }

  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push({ name, tickets: [] });
  localStorage.setItem('projects', JSON.stringify(projects));
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('project-list');
  const projects = JSON.parse(localStorage.getItem('projects')) || [];

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `<strong>${project.name}</strong>`;
    card.onclick = () => {
      localStorage.setItem('currentProjectIndex', index);
      window.location.href = 'project.html';
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      const newName = prompt('Nuevo nombre del proyecto:', project.name);
      if (newName && newName.trim()) {
        projects[index].name = newName.trim();
        localStorage.setItem('projects', JSON.stringify(projects));
        location.reload();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      if (confirm('¿Eliminar este proyecto?')) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        location.reload();
      }
    };

    card.appendChild(editBtn);
    card.appendChild(deleteBtn);
    projectList.appendChild(card);
  });
});
