/**
 * @jest-environment jsdom
 */

import Tasks from '../modules/task.js';
import editTask from '../modules/editToDo.js';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem.mockClear();

  // Setup Document
  document.body.innerHTML = `
  <main>
    <div id="list-title">
      <h3>Today's To Do</h3>
      <a class="refreshBtn"><i class="fa-solid fa-arrows-rotate"></i></a>
    </div>
    <form id="input-form">
      <input
        placeholder="Add to your list..."
        id="input-task"
        class="add-list"
      />
      <button type="submit"><span class="arrow">&#8617;</span></button>
    </form>

    <div id="do-list" class="list-items"></div>
    <p id="message"></p>

    <div class="clear-all">
      <button type="button" id="clear" class="clearBtn">
        Clear all completed.
      </button>
    </div>
  </main>
  `;
});

describe('Task Tests', () => {
  it('Should mark a task as completed', async () => {
    // Setup localStorage
    localStorage.setItem('array', JSON.stringify([]));

    // Import required functions
    let printTasks = await import('../index.js');
    printTasks = printTasks.default;

    // Add some tasks
    const taskList = new Tasks();
    taskList.addTask('Task 1');
    taskList.addTask('Task 2');
    taskList.addTask('Task 3');
    taskList.addTask('Task 4');

    // Update DOM task list and setup check input event handlers
    printTasks();
    document.dispatchEvent(
      new Event('DOMContentLoaded', {
        bubbles: false,
        cancelable: true,
      }),
    );

    // Mark the first two tasks as completed
    const inputChecks = document.querySelectorAll('.check');

    inputChecks[0].click();
    inputChecks[1].click();

    const tasks = JSON.parse(localStorage.getItem('array'));
    expect(tasks[0].completed).toBe(true);
    expect(tasks[1].completed).toBe(true);
  });

  it('Should change the description of a task when edited', () => {
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

  it('Should clear all completed tasks', async () => {
    // Setup localStorage
    localStorage.setItem('array', JSON.stringify([]));

    // Import required functions

    let printTasks = await import('../index.js');
    printTasks = printTasks.default;

    let clearCompletedTasks = await import('../modules/delete.js');
    clearCompletedTasks = clearCompletedTasks.default;

    // Add some tasks
    const taskList = new Tasks();
    taskList.addTask('Task 1');
    taskList.addTask('Task 2');
    taskList.addTask('Task 3');
    taskList.addTask('Task 4');

    // Update DOM task list and setup check input event handlers
    printTasks();

    // Mock the 'window'
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload,
      },
    });

    // Setup clear button click handler
    clearCompletedTasks();
    document.dispatchEvent(
      new Event('DOMContentLoaded', {
        bubbles: false,
        cancelable: true,
      }),
    );

    // Mark the four tasks as completed
    const inputChecks = document.querySelectorAll('.check');

    inputChecks[0].click();
    inputChecks[1].click();
    inputChecks[2].click();
    inputChecks[3].click();

    // Click the 'Clear all completed' button
    const clearBtn = document.getElementById('clear');
    clearBtn.click();

    const tasks = JSON.parse(localStorage.getItem('array'));
    expect(tasks.length).toBe(0);
  });
});
