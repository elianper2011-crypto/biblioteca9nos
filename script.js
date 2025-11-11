const form = document.getElementById('uploadForm');
const trabajosList = document.getElementById('trabajos');
const adminPassInput = document.getElementById('adminPass');
const adminButton = document.getElementById('loginAdmin');
const adminStatus = document.getElementById('adminStatus');
let isAdmin = false;

let trabajos = JSON.parse(localStorage.getItem('trabajos')) || [];

function mostrarTrabajos() {
  trabajosList.innerHTML = '';
  trabajos.forEach((t, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${t.titulo}</strong><br>
      Autor: ${t.autor}<br>
      Fecha: ${t.fecha}<br>
      ${t.enlace ? `<a href="${t.enlace}" target="_blank">Ver trabajo</a>` : 'Archivo local no disponible'}
      ${isAdmin ? `<button class="admin-delete" data-index="${index}">Eliminar</button>` : ''}
    `;
    trabajosList.appendChild(li);
  });

  if (isAdmin) {
    document.querySelectorAll('.admin-delete').forEach(btn => {
      btn.style.display = 'inline-block';
      btn.addEventListener('click', (e) => {
        const i = e.target.getAttribute('data-index');
        trabajos.splice(i, 1);
        localStorage.setItem('trabajos', JSON.stringify(trabajos));
        mostrarTrabajos();
      });
    });
  }
}

mostrarTrabajos();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const autor = document.getElementById('autor').value;
  const titulo = document.getElementById('titulo').value;
  const enlace = document.getElementById('enlace').value;
  const fecha = new Date().toLocaleString();

  const nuevoTrabajo = { autor, titulo, enlace, fecha };
  trabajos.push(nuevoTrabajo);
  localStorage.setItem('trabajos', JSON.stringify(trabajos));

  form.reset();
  mostrarTrabajos();
});

adminButton.addEventListener('click', () => {
  const pass = adminPassInput.value;
  if (pass === 'ejemplo1234') {
    isAdmin = true;
    adminStatus.textContent = 'Acceso concedido. Ahora puedes eliminar trabajos.';
    mostrarTrabajos();
  } else {
    adminStatus.textContent = 'Contraseña incorrecta.';
  }
});