export default function editTask(item, array) {
  item.addEventListener('focusout', () => {
    array.forEach((task) => {
      if (task.index === item.id) {
        task.description = item.value;
        localStorage.setItem('array', JSON.stringify(array));
      }
    });
  });
  item.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      array.forEach((task) => {
        if (task.index === item.id) {
          task.description = item.value;
          localStorage.setItem('array', JSON.stringify(array));
        }
      });
    }
  });
}
