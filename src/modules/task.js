/* eslint-disable */
const array = [];
class Tasks {
  constructor(description) {
    this.description = description;
    this.index = array.length + 1;
    this.completed = false;
  }

  addTask(description) {
    this.description = description;
    if (description === '') {
      return;
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
}

export default Tasks;
