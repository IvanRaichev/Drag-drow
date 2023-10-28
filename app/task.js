const items = document.querySelectorAll('.item');
let isDragging = false;
let currentDragItem = null;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentDragItem = item;
    item.style.position = 'absolute';
    item.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (isDragging && currentDragItem) {
    currentDragItem.style.left = (e.clientX - currentDragItem.offsetWidth / 2) + 'px';
    currentDragItem.style.top = (e.clientY - currentDragItem.offsetHeight / 2) + 'px';
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDragging && currentDragItem) {
    isDragging = false;
    currentDragItem.style.zIndex = 0;
    
    const dropAreas = document.querySelectorAll('.drop-area');
    
    for (const dropArea of dropAreas) {
      const rect = dropArea.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        dropArea.appendChild(currentDragItem);
        currentDragItem.style.position = 'static';
        currentDragItem.style.left = 'auto';
        currentDragItem.style.top = 'auto';
        break;
      }
    }

    if (currentDragItem.style.position === 'absolute') {
   
      document.getElementById('source').appendChild(currentDragItem);
      currentDragItem.style.position = 'static';
      currentDragItem.style.left = 'auto';
      currentDragItem.style.top = 'auto';
    }

    currentDragItem = null;
  }
});