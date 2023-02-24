/* eslint-disable */
const array = [];
export default class Tasks {
  constructor(description) {
    this.description = description;
    this.index = array.length + 1;
    this.completed = false;
  }

  addTask(description) {
    this.description = description;
    if (description === '') {
      document.getElementById('message').innerHTML = '';
      message.style.color = 'red';
    } else {
      const array = JSON.parse(localStorage.getItem('array')) || [];
      const newBook = new Tasks(description);
      array.push(newBook);
      array.forEach((work, i) => {
        work.index = i + 1;
      });
      localStorage.setItem('array', JSON.stringify(array));
    }
  }

  removeTask(index) {
    this.index = index;
    const array = JSON.parse(localStorage.getItem('array')) || [];
    array.filter((e, id) => {
      if (e.index === index) {
        array.splice(id, 1);
        array.forEach((task, i) => {
          task.index = i + 1;
        });
        localStorage.setItem('array', JSON.stringify(array));
      }
    });
  }

  // Edit task
  // editTask(description, index) {
  //   this.description = description;
  //   this.index = index;
  //   description.addEventListener('keypress', (e) => {
  //     if(e.key === 'Enter') {
  //       console.log('En');
  //     }
  //   })
  //   item.addEventListener('focusout', () => {
  //     array.forEach((task) => {
  //       if (task.index === item.id) {
  //         task.description = item.value;
  //         localStorage.setItem('array', JSON.stringify(array));
  //       }
  //     });
  //   });
  //   item.addEventListener('keyup', (e) => {
  //     if (e.key === 'Enter') {
  //       array.forEach((task) => {
  //         if (task.index === item.id) {
  //           task.description = item.value;
  //           localStorage.setItem('array', JSON.stringify(array));
  //         }
  //       });
  //     }
  //   });
  // }

  // const array = JSON.parse(localStorage.getItem('array')) || [];
  // displayContainer.addEventListener('click', (e) => {
  //   if (e.target.classList.contains('task-list')) {
  //     editTask(e.target, array);
  //   }
  // });
}
