import type { Project } from './types';

export function getProjects(): Project[] {
  return JSON.parse(localStorage.getItem('projects') || '[]');
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem('projects', JSON.stringify(projects));
}