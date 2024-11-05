document.querySelector('#btnAgregarTratamiento').addEventListener(
    'click',
    function () {

        const tratamientos = JSON.parse(localStorage.getItem('tratamientos')) || [];
        cantidad = 0;

        if (tratamientos) {
            cantidad = tratamientos.length;
        } else {
            tratamientos = [];
        }

        var nombre = document.querySelector('#nombre').value;
        var descripcion = document.querySelector('#descripcion').value;
        var valor = document.querySelector('#valor').value;

        if (nombre.trim() == '' || descripcion.trim() == '' || valor == '' || valor == 0) {
            alert('Para registrar tratamientos todos los campos son obligatorios.');
            return false;
        }

        const tratamientoItem = { 'id': cantidad+1,  'nombre': document.querySelector('#nombre').value, 'descripcion': document.querySelector('#descripcion').value, 'valor': document.querySelector('#valor').value};
        console.log(tratamientoItem);
        tratamientos.push(tratamientoItem);
        localStorage.setItem('tratamientos', JSON.stringify(tratamientos));
        getTratamientos('tratamientoList');

        formularioLimpiar();

    }
);

function formularioLimpiar() {

    document.querySelector('#nombre').value = '';
    document.querySelector('#descripcion').value = '';
    document.querySelector('#valor').value = '';

}

function getTratamientos(objId) {

    const tratamientos = JSON.parse(localStorage.getItem('tratamientos')) || [];
    console.log('Tratamientos ', tratamientos.length);
    console.log(JSON.stringify(tratamientos));
    var html = '';

    if (tratamientos.length > 0) {
        for (t=0; t<tratamientos.length; t++) {
            console.log(JSON.stringify(tratamientos[t]));
            html+= `<tr>`+
                `<td>${tratamientos[t].id}</td>`+
                `<td>${tratamientos[t].nombre}</td>`+
                `<td>${tratamientos[t].descripcion}</td>`+
                `<td>$ ${tratamientos[t].valor}</td>\n`+
                `<td><a href="#" onclick="unsetTratamiento('${t}')">Quitar</a></td>\n`+
                `<tr>`;
        }
    } else {
        html = '<td colspan="4"><b>No hay tratamientos.</b></td>';
    }
    console.log(html);
    document.querySelector('#'+objId).innerHTML = html;

}

getTratamientos('tratamientoList');

function unsetTratamiento(t) {

    const tratamientos = JSON.parse(localStorage.getItem('tratamientos')) || [];

    const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
    var sw = 0;
    for(a = 0; a<agenda.length; a++) {
        if (agenda[a].tratamiento.id == tratamientos[t].id) {
            sw = 1;
        }
    }

    if (sw == 1) {
        if (confirm('El tratamiento que intenta eliminar se encuentra en uso en la agenda.\nDesea forzar la eliminación?')) {
            tratamientos.splice(t, 1);
        }
    } else {
        tratamientos.splice(t, 1);
    }
    localStorage.setItem('tratamientos', JSON.stringify(tratamientos));
    getTratamientos('tratamientoList');

}