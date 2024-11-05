
const agenda = localStorage.getItem('agenda') || [];

document.getElementById('lnkSalir').addEventListener(
    'click',
    function () {
        if (confirm('Está seguro de salir del sistema?')) {
            localStorage.clear();
            location.replace('./');
        }
    }
);

function goAgenda() {
    location.replace('agenda.html');
}

function goTratamientos() {
    location.replace('tratamiento.html');
}

document.querySelector('#btnAgendar').addEventListener(
    'click',
    function setAgenda() {

        var fecha = document.querySelector('#fecha').value;
        var hora = document.querySelector('#hora').value;
        var paciente = document.querySelector('#paciente').value;
        var tratamiento = document.querySelector('#tratamiento').value;

        if (fecha == '' || hora == '' || paciente == '' || tratamiento == '') {
            alert('Para proceder con la reserva se requieren todos los datos');
            return false;
        }

        const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        var sw = 0;
        for(a = 0; a<agenda.length; a++) {
            if (agenda[a].fecha == fecha && agenda[a].hora == hora) {
                alert('La fecha y hora seleccionada ya se encuentran ocupada.');
                sw = 1;
            }
        }

        if (sw == 1) {
            return false;
        }
        pacienteItem = getPacienteDetalle(paciente);
        tratamientoItem = getTratamientoDetalle(tratamiento);
        agenda.push(
            {
                'fecha': fecha,
                'hora': hora,
                'paciente': pacienteItem,
                'tratamiento': tratamientoItem
            }
        );

        localStorage.setItem('agenda', JSON.stringify(agenda));     
        
    }
);

function getTratamientos(objId) {

    console.log('Recuperando tratamientos '+objId);

    const tratamiento = JSON.parse(localStorage.getItem('tratamientos')) || [];
    var selectList = '';
    if (tratamiento.length > 0) {
        for (t=0; t<tratamiento.length; t++) {
            selectList+= `<option value="${tratamiento[t].id}">${tratamiento[t].nombre}</option>`;
        }
    } else {
        selectList = '<option disabled value="0">No hay tratamientos disponibles</option>';
    }
    console.log(selectList);
    document.querySelector('#'+objId).innerHTML = selectList;
}

function getPacientes(objId) {

    const paciente = JSON.parse(localStorage.getItem('pacientes')) || [];
    var selectList = '';
    if (paciente.length > 0) {
        for (t=0; t<paciente.length; t++) {
            selectList+= `<option value="${paciente[t].rut}">${paciente[t].nombres} ${paciente[t].apellidos} [${paciente[t].rut}]</option>`;
        }
    } else {
        selectList = '<option disabled value="0">No hay pacientes disponibles</option>';
    }
    console.log(selectList);
    document.querySelector('#'+objId).innerHTML = selectList;
}

getTratamientos('tratamiento');
getPacientes('paciente');
getAgenda('agendaList');

function agendaLimpiar() {

    document.querySelector('#fecha').value = '';
    document.querySelector('#hora').value = ''; 
    document.querySelector('#paciente').value = '';
    document.querySelector('#tratamiento').value = '';
    
}

function getAgenda(objId) {

    const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    var html = '';
    for(a = 0; a<agenda.length; a++) {
        html+= `<tr>`+
                `<td>${agenda[a].fecha}</td>`+
                `<td>${agenda[a].hora}</td>`+
                `<td>${agenda[a].paciente.nombres} ${agenda[a].paciente.apellidos}</td>`+
                `<td>${agenda[a].tratamiento.nombre} $${agenda[a].tratamiento.valor}</td>`+
                `<td><a href="#" onclick="anularAgenda(${a})">Anular</a></td>`+
            `</tr>`;
    }
    
    if (agenda.length == 0) {
        html = '<tr><td colspan="5">Agenda libre</td></tr>';
    }
    document.querySelector('#'+objId).innerHTML = html;
}

function anularAgenda(posId) {

    var agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    agenda.splice(posId, 1);
    localStorage.setItem('agenda', JSON.stringify(agenda));     

    getAgenda('agendaList');

}

function getPacienteDetalle(rut) {

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    for(p = 0; p<pacientes.length; p++) {
        if (pacientes[p].rut.trim() == rut.trim()) {
            return pacientes[p];
        }
    }
    return [];
}

function getTratamientoDetalle(id) {

    const tratamientos = JSON.parse(localStorage.getItem('tratamientos')) || [];
    for(p = 0; p<tratamientos.length; p++) {
        if (tratamientos[p].id == id) {
            return tratamientos[p];
        }
    }
    return [];
}
