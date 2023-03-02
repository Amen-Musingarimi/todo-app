import Tasks from '../modules/task.js';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem.mockClear();
});

describe('Test add and delete functions', () => {
  it('Should add a new task', () => {
    localStorage.setItem('array', JSON.stringify([]));
    const oldLength = JSON.parse(localStorage.getItem('array')).length;

    const taskList = new Tasks();
    taskList.addTask('New Task');

    const newLength = JSON.parse(localStorage.getItem('array')).length;
    const difference = newLength - oldLength;

    expect(difference).toBe(1);
  });
  it('Should delete a task', () => {
    localStorage.setItem('array', JSON.stringify([]));
    const taskList = new Tasks();
    taskList.addTask('New Task');
    taskList.addTask('Another Task');
    taskList.addTask('Task 3');

    const oldLength = JSON.parse(localStorage.getItem('array')).length;

    taskList.removeTask(2);

    const newLength = JSON.parse(localStorage.getItem('array')).length;

    const difference = oldLength - newLength;
    expect(difference).toBe(1);
  });
});
