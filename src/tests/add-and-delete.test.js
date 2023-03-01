const Tasks = require('../modules/task');

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

  });
});
