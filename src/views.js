
export const createProjectListDOM = (projects) => {
  let projectListTitle = document.createElement('h2');
  projectListTitle.innerText = 'Projects';
  let projectList = document.createElement('ul');
  let projectListContainer = document.getElementById('projectList');
  projectListContainer.append(projectListTitle);
  projectListContainer.append(projectList);

  projects.forEach(project => {
    let listElement = document.createElement('li');
    listElement.innerText = project.title;
    listElement.classList.add('project-list-element');
    projectList.append(listElement);
    listElement.addEventListener('click', (e) => {
      resetToDoListDOM();
      createProjectToDoList(project);
    })
  });
}

export const resetProjectListDOM = () => {
  let parent = document.getElementById('projectList');
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

export const addToProjectSelect = (project) => {
  let selectProjectForm = document.getElementById('projectOptions')
  let selectOption = document.createElement('option');
  selectOption.value = project.title;
  selectOption.innerText = project.title;
  selectProjectForm.append(selectOption)
}

const sortToDoList = (items) => {
  items.sort((a, b) => {
    let da = new Date(a.dueDate),
        db = new Date(b.dueDate);
    return da - db;
  })
}

const toDoListTitle = (project) => {
    let toDoListContainer = document.getElementById('toDoList');
    let toDoListTitle = document.createElement('h2');
    toDoListTitle.innerText = "To Do List (" + project.title + ")";
    let toDoList = document.createElement('ul');
    toDoListContainer.append(toDoListTitle);
    toDoListContainer.append(toDoList);
}

const printToDoList = (items, project, projectList) => {
  console.log(projectList);
  items.forEach(item => {
    let listElement = document.createElement('li');
    listElement.classList.add('todo-list-element');
    listElement.setAttribute('id', 'toDoItem');

    let listDetails = document.createElement('div');
    listDetails.classList.add('todo-list-details');
    listDetails.setAttribute('id', 'toDoItemDetails');

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'checkBox');

    let listElementTitle = document.createElement('p');
    listElementTitle.innerText = item.title;
    let listElementDueDate = document.createElement('p');
    listElementDueDate.innerText = item.dueDate;
    let listElementDropDown = document.createElement('p');
    listElementDropDown.innerHTML = '&#9660;';
    listElementDropDown.classList.add('dropdown-arrow');

    let listElementDescription = document.createElement('p');
    listElementDescription.innerText = "details: " + item.description;
    listElementDescription.classList.add('todo-description');
    let listElementProject = document.createElement('p');
    listElementProject.innerText = "project: " + item.project;
    listElementProject.classList.add('todo-project');

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('id', 'deleteItemButton');

    toDoList.append(listElement);
    toDoList.append(listDetails);
    listElement.append(checkBox);
    listElement.append(listElementTitle);
    listElement.append(listElementDueDate);
    listElement.append(listElementDropDown);
    listDetails.append(listElementDescription);
    listDetails.append(listElementProject);
    listDetails.append(deleteButton);

    listElementDropDown.addEventListener('click', () => {
      listDetails.classList.toggle('visible-details');
    })

    createDeleteButton(deleteButton, project, projectList, items, item);

    if (item.status === "completed") {
      listElementTitle.classList.add('item-complete');
      checkBox.checked = true;
    }

    checkBox.addEventListener('change', (e) => {
      if (e.target.checked) {
        listElementTitle.classList.add('item-complete');
        item.status = 'completed';
        e.target.check = true;
        console.log(projectList);
        localStorage.setItem('projects', JSON.stringify(projectList));
      } else {
        listElementTitle.classList.remove('item-complete');
        item.status = 'not completed';
        localStorage.setItem('projects', JSON.stringify(projectList));
      }
    })
  })
}

const createDeleteButton = (button, project, projectList, items, item) => {
  button.addEventListener('click', () => {

    if (project !== "all") {
      for (let i = items.length - 1; i >= 0; --i) {
        if (items[i] === item) {
          items.splice(i, 1);
        }
      }
      resetToDoListDOM();
      toDoListTitle(project);
      sortToDoList(items);
      printToDoList(items, project, projectList);
    } else {
      let projectOnAll
      projectList.forEach(thisProject => {
        if(thisProject.title === item.project) {
          projectOnAll = thisProject;
        }
      })
      console.log(projectOnAll);
      for (let i = projectOnAll.list.length - 1; i >= 0; --i) {
        if (projectOnAll.list[i] === item) {
          projectOnAll.list.splice(i, 1);
        }
      }
      console.log(projectOnAll);
      resetToDoListDOM();
      createToDoListMaster(projectList);
    }
    // localStorage.setItem(`${project.title}Items`, JSON.stringify(project.list));
    // localStorage.setItem('projects', JSON.stringify(projectList));
  })
}

export const createToDoListMaster = (projects) => {
  let toDoListContainer = document.getElementById('toDoList');
  let toDoListTitle = document.createElement('h2');
  toDoListTitle.innerText = "To Do List (all)";
  let toDoList = document.createElement('ul');
  toDoListContainer.append(toDoListTitle);
  toDoListContainer.append(toDoList);
  let allItems = []

  projects.forEach(project => {
    project.list.forEach(item => {
      allItems.push(item);
    })
  })

  sortToDoList(allItems);
  printToDoList(allItems, "all", projects);
}

export const createProjectToDoList = (project, projects) => {
  let toDoListContainer = document.getElementById('toDoList');
  let toDoListTitle = document.createElement('h2');
  toDoListTitle.innerText = "To Do List (" + project.title + ")";
  let toDoList = document.createElement('ul');
  toDoListContainer.append(toDoListTitle);
  toDoListContainer.append(toDoList);
  sortToDoList(project.list);
  printToDoList(project.list, project, projects);
}

export const resetToDoListDOM = () => {
  let parent = document.getElementById('toDoList');
  while(parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}