/**
 * @jest-environment jsdom
 */

import Tasks from '../modules/task.js';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem.mockClear();
});

describe('Update task completed status', () => {
  it('Should mark a task as completed', () => {
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

    // Setup localStorage
    localStorage.setItem('array', JSON.stringify([]));

    // Import required functions
    const printTasks = require('../index.js').default;

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
});
