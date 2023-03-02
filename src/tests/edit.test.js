/**
 * @jest-environment jsdom
 */

const editTask = require('../modules/editToDo.js');

describe('editTask function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should change the description of a task when edited', () => {
    const task = {
      id: 1,
      description: 'old description',
    };

    localStorage.setItem('array', JSON.stringify([task]));

    const item = {
      id: 1,
      value: 'new description',
      addEventListener: jest.fn(),
    };

    editTask(item);

    const focusoutEvent = new Event('focusout');
    item.addEventListener.mock.calls[0][1](focusoutEvent);

    const updatedTask = JSON.parse(localStorage.getItem('array'))[0];

    expect(updatedTask.description).toEqual('new description');
  });
});
