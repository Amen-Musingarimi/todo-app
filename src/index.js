import './styles/main.css';
import Tasks from './modules/task.js';
import clearCompletedTasks from './modules/delete.js';
import updateTaskStatus from './modules/status.js';
import editTask from './modules/editToDo.js';

const displayContainer = document.getElementById('do-list');

// Display the book in the array
function printTasks() {
  const array = JSON.parse(localStorage.getItem('array')) || [];
  let innerhtml = '';
  let checker = '';

  array.forEach((task) => {
    if (task.completed === false) {
      checker = '';
    } else {
      checker = 'checked';
    }
    innerhtml += `
    <div class="each-row">
    <div class="row-info">
    <input ${checker} type="checkbox" class="check" id="input${task.index}">
     <input id="${task.index}" class="task-list list itemDescription" value="${task.description}"></div>
     <a id="remove-btn${task.index}" class="row-btn material-symbols-outlined">
     <i class="fa-solid fa-ellipsis-vertical"></i
  >
    </a>
   </div>
   `;
  });

  const doList = document.querySelector('#do-list');
  const inputForm = document.getElementById('input-form');
  const description = document.getElementById('input-task');

  // Calling the event listener when the form is submitted

  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = new Tasks();
    obj.addTask(description.value);
    printTasks();

    description.value = '';
  });

  doList.innerHTML = innerhtml;
}

// Call the Delete function
displayContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('row-btn')) {
    const initialID = e.target.id;
    const { length } = initialID;
    const id = initialID.slice(10, length);
    const finalID = Number(id);
    const obj = new Tasks();
    obj.removeTask(finalID);
    printTasks();
  }
});

// Edit function
displayContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-list')) {
    editTask(e.target);
  }
});

// This function update the checkbox status
updateTaskStatus();

// This function clear completed task
clearCompletedTasks();

// Calling the display function
printTasks();
