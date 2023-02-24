export default function clearCompletedTasks() {
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    let array = JSON.parse(localStorage.getItem('array') || '[]');
    array = array.filter((task) => task.completed === false);
    localStorage.setItem('array', JSON.stringify(array));
    window.location.reload();
  });
}
