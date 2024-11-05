
if (document.getElementById('lnkSalir')) {
    document.getElementById('lnkSalir').addEventListener(
        'click',
        function () {
            if (confirm('Está seguro de salir del sistema?')) {
                localStorage.getItem('session', {});
                location.replace('./');
            }
        }
    );
}

function goAgenda() {
    location.replace('agenda.html');
}

function goTratamientos() {
    location.replace('tratamiento.html');
}

function goPacientes() {
    location.replace('pacientes.html');
}

function goUsuarios() {
    location.replace('usuarios.html');
}

