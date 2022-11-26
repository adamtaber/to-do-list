import './style.css';
import { toDoItem, Project, ProjectList } from "./controllers.js";
import { createProjectListDOM, resetProjectListDOM, 
         addToProjectSelect, createToDoListMaster,
         resetToDoListDOM, createProjectToDoList } from "./views.js";

let allProjects = new ProjectList();

let projectForm = document.getElementById('newProjectForm');
let itemForm = document.getElementById('newItemForm');
let homePage = document.getElementById('toDoListHome');

function createNoProject() {
  let noProject = new Project('no project');
  if (!JSON.parse(localStorage.getItem('projects'))) {
    allProjects.addProjectToList(noProject);
    resetProjectListDOM();
    createProjectListDOM(allProjects.list);
    addToProjectSelect(noProject);
  }else {
     allProjects.refreshProjectList();
     allProjects.list.forEach(thisproject => {
      thisproject.addItemToList = function(item) {
        thisproject.list.push(item);
        localStorage.setItem(`${thisproject.title}Items`, JSON.stringify(thisproject.list));
      }
      addToProjectSelect(thisproject);
     })
     resetProjectListDOM();
     createProjectListDOM(allProjects.list);
     createToDoListMaster(allProjects.list);
  }    
  // resetProjectListDOM();
  // createProjectListDOM(allProjects.list);
  // addToProjectSelect(noProject);
}

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let fd = new FormData(projectForm);
  let obj = Object.fromEntries(fd);
  let projectOne = new Project(obj.title);

  if(allProjects.list.some(project => project.title === projectOne.title)) {
    console.log('A project with this name already exists')
  } else {
    allProjects.addProjectToList(projectOne);
    resetProjectListDOM();
    createProjectListDOM(allProjects.list);
    addToProjectSelect(projectOne);
  }
})

itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let fd = new FormData(itemForm);
  let obj = Object.fromEntries(fd);
  let itemOne = toDoItem(obj.title, obj.description, obj.duedate, obj.project, 'incomplete');
  let project = allProjects.list.find(project => project.title === obj.project);
  project.addItemToList(itemOne);
  localStorage.setItem('projects', JSON.stringify(allProjects.list));
  resetToDoListDOM();
  createProjectToDoList(project, allProjects);
})

homePage.addEventListener('click', () => {
  resetToDoListDOM();
  createToDoListMaster(allProjects.list);
})

createNoProject();

