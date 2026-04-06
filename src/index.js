const params = new URLSearchParams(document.location.search);
const skinUrl = params.get('skin') || 'template_skin.png';
const scale = parseFloat(params.get('scale')) || 20;

document.body.style.setProperty('--background-image', `url(${skinUrl})`);
document.body.style.setProperty('--scale', scale);

document.querySelectorAll('.toggle-skin-parts label input').forEach(checkbox => {
  checkbox.addEventListener('change', e => {
    const part = e.target.name.split('-part')[0];
    document.querySelectorAll(`.skin.${part}`).forEach(el => {
      el.style.display = e.target.checked ? '' : 'none';
    });
  });
});

let isDragging = false;
let prevX = 0;
let prevY = 0;

document.addEventListener('mousedown', e => {
  isDragging = true;
  prevX = e.clientX;
  prevY = e.clientY;
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = Math.fround((e.clientX - prevX) * 0.8);
  const dy = Math.fround((e.clientY - prevY) * 0.8);
  
  
  let yaw = Math.fround(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--yaw')) || 0);
  let pitch = Math.fround(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pitch')) || 0);
  
  if (pitch > 90) pitch = 90;
  if (pitch < -90) pitch = -90;

  document.documentElement.style.setProperty('--yaw', (yaw + dx) + 'deg');
  document.documentElement.style.setProperty('--pitch', (pitch - dy) + 'deg');

  prevX = e.clientX;
  prevY = e.clientY;
});

document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mouseleave', () => isDragging = false);
