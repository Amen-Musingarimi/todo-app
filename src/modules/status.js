export default function updateTaskStatus() {
  document.addEventListener('DOMContentLoaded', () => {
    const inputChecks = document.querySelectorAll('.check');
    inputChecks.forEach((check) => {
      check.addEventListener('change', (e) => {
        let array = [];
        array = JSON.parse(localStorage.getItem('array') || '[]');
        array.forEach((task) => {
          if (
            e.target.id === `input${task.index}`
            && task.completed === false
          ) {
            task.completed = true;
            e.target.checked = true;
            localStorage.setItem('array', JSON.stringify(array));
          } else if (
            e.target.id === `input${task.index}`
            && task.completed === true
          ) {
            task.completed = false;
            e.target.checked = false;
            localStorage.setItem('array', JSON.stringify(array));
          }
        });
      });
    });
  });
}
