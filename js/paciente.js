
function checkRut(rut) {

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    for(t = 0; t<pacientes.length; t++) {
        if (pacientes[t].rut.trim() == rut.trim())
            return true;
        {}
    }

    return false;
}

//    localStorage.removeItem('pacientes');

document.querySelector('#btnAgregarPaciente').addEventListener(
    'click',
    function () {

        var rut = document.querySelector('#rut').value;
        var nombres = document.querySelector('#nombres').value;
        var apellidos = document.querySelector('#apellidos').value;
        var direccion = document.querySelector('#direccion').value;
        var telefono = document.querySelector('#telefono').value;
        var email = document.querySelector('#email').value;

        if (rut.trim() == '' || nombres.trim() == '' || apellidos.trim() == '' || direccion.trim() == '' || telefono.trim() == '' || telefono.trim() == 0 || email.trim() == '') {
            alert('Todos los datos del paciente son obligatorios.');
            return false;
        }

        if (checkRut(document.querySelector('#rut').value)) {
            alert('El rut que intenta agregar ya se encuentra registrado.');
            document.querySelector('#rut').focus();
            return false;
        }

        if (!validateEmail(document.querySelector('#email').value)) {
            alert('El email que intenta agregar es incorrecto.');
            document.querySelector('#email').focus();
            return false;
        }

        const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        cantidad = 0;

        if (pacientes) {
            cantidad = pacientes.length;
        } else {
            pacientes = [];
        }

        const pacienteItem = {
            'rut': document.querySelector('#rut').value,
            'nombres': document.querySelector('#nombres').value,
            'apellidos': document.querySelector('#apellidos').value,
            'direccion': document.querySelector('#direccion').value,
            'telefono': document.querySelector('#telefono').value,
            'email': document.querySelector('#email').value
        };
        console.log(pacienteItem);
        pacientes.push(pacienteItem);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        getPacientes('pacienteList');

        formularioLimpiar();

    }
);

function formularioLimpiar() {

    document.querySelector('#nombres').value = '';
    document.querySelector('#apellidos').value = '';
    document.querySelector('#direccion').value = '';
    document.querySelector('#telefono').value = '';
    document.querySelector('#email').value = '';
}

function getPacientes(objId) {

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    console.log('Pacientes ', pacientes.length);
    console.log(JSON.stringify(pacientes));
    var html = '';

    if (pacientes.length > 0) {
        for (t=0; t<pacientes.length; t++) {
            console.log(JSON.stringify(pacientes[t]));
            html+= `<tr>`+
                `<td>${pacientes[t].rut}</td>`+
                `<td>${pacientes[t].nombres}</td>`+
                `<td>${pacientes[t].apellidos}</td>`+
                `<td>${pacientes[t].direccion}</td>\n`+
                `<td>${pacientes[t].telefono}</td>\n`+
                `<td>${pacientes[t].email}</td>\n`+
                `<td><a href="#" onclick="unsetPacientes('${t}')">Quitar</a></td>\n`+
                `<tr>`;
        }
    } else {
        html = '<td colspan="4"><b>No hay pacientes.</b></td>';
    }
    console.log(html);
    document.querySelector('#'+objId).innerHTML = html;

}

getPacientes('pacienteList');

function unsetPacientes(t) {

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    var sw = 0;
    for(a = 0; a<agenda.length; a++) {
        if (agenda[a].paciente.rut == pacientes[t].rut) {
            sw = 1;
        }
    }        

    if (sw == 1) {
        if (confirm('El paciente que intenta eliminar se encuentra actualmente en uso en la agenda.\n Está seguro de forzar la eliminación?')) {
            pacientes.splice(t, 1);
        }
    } else {
        pacientes.splice(t, 1);
    }

    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    getPacientes('pacienteList');

}

function validateEmail(emailValue){
            
    // Define our regular expression.
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    console.log("EMAIL VALIDO "+validEmail.test(emailValue));
    // Using test we can check if the text match the pattern
    return validEmail.test(emailValue);

} 
