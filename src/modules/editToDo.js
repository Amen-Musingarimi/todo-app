export default function editTask(item) {
  item.addEventListener('focusout', () => {
    const array = JSON.parse(localStorage.getItem('array')) || [];
    array[item.id - 1].description = item.value;
    localStorage.setItem('array', JSON.stringify(array));
  });

  item.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const array = JSON.parse(localStorage.getItem('array')) || [];
      array[item.id - 1].description = item.value;
      localStorage.setItem('array', JSON.stringify(array));
    }
  });
}
