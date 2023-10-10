
function cargarContactos() {
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const contactList = document.getElementById('contactList');
        contactList.innerHTML = ''; 

        data.forEach(contacto => {
            const li = document.createElement('li');
            li.textContent = `${contacto.nombre} ${contacto.apellido} - Teléfono: ${contacto.telefono}`;
            contactList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error al cargar la lista de contactos:', error);
    });
}


const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    const nuevoContacto = { nombre, apellido, telefono };

    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';

        
        cargarContactos();
    })
    .catch(error => {
        console.error('Error al agregar un nuevo contacto:', error);
    });
});


cargarContactos();
