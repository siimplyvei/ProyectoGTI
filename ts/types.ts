export interface Ticket {
  type: string;
  status: string;
  priority: string;
  subject: string;
}

export interface Project {
  name: string;
  tickets: Ticket[];
}