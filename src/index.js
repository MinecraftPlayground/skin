const params = new URLSearchParams(document.location.search);
const skinUrl = params.get('skin') || 'default_skin.png';
const scale = parseFloat(params.get('scale')) || 15;

document.documentElement.style.setProperty('--background-image', `url(${skinUrl})`);
document.documentElement.style.setProperty('--scale', scale);

document.addEventListener('wheel', e => {
  const delta = Math.sign(e.deltaY);
  
  let scale = Math.fround(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 20);
  scale += delta * -1;
  if (scale < 1) scale = 1;
  if (scale > 100) scale = 100;
  
  document.documentElement.style.setProperty('--scale', scale);
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
