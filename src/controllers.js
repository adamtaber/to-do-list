export const toDoItem = (title, description, dueDate, project, status) => {

  return { title, description, dueDate, project, status };
}


export class Project {
  list = [];

  constructor(title) {
    this.title = title;
  }

  addItemToList = (item) => {
    this.list.push(item);
    localStorage.setItem(`${this.title}Items`, JSON.stringify(this.list));
  }
}

export class ProjectList {
  list = [];

  addProjectToList = (projectItem) => {
    this.list.push(projectItem);
    localStorage.setItem('projects', JSON.stringify(this.list));
  }

  refreshProjectList = () => {
    this.list = JSON.parse(localStorage.getItem('projects'));
  }
}