const usuario = JSON.parse(localStorage.getItem('usuario')) || [];
const roles = {
    1: 'Administrador',
    2:'Doctor',
    3:'Asistente'
};

if (document.querySelector("#btnAgregarUsuario")) {

    document.querySelector("#btnAgregarUsuario").addEventListener(
        'click',
        function () {

            console.log('Guardando usuario');

            var user = document.querySelector('#user').value;
            var pass = document.querySelector('#pass').value;
            var nombre = document.querySelector('#nombre').value;
            var rol = document.querySelector('#rol').value;

            if (user.trim() == '' || pass.trim() == '' || nombre.trim() == '') {
                alert('Todos los campos son obligatorios');
                return  false;
            }

            console.log("Usuario "+user);
            var usuarioExiste = usuario.find(usuario => usuario.user == user); 

            if (usuarioExiste) {
                alert('El nombde de usuario a utilizar ya existe.');
                return false;
            }

            console.log(usuarioExiste);
            console.log("Rol "+rol+" "+roles[rol]);

            var r = {'id': rol, 'rol': roles[rol]};
            usuario.push({
                'usuarioId': user,
                'pass': pass,
                'nombre': nombre,
                'rol': r
                });

            console.log('Guardando');
            console.log(usuario);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            usuarioLimpiar();
            getUsuarioList('usuariosList');

        }
    );
}

function getUsuarioList(objId) {

    const usuario = JSON.parse(localStorage.getItem('usuario')) || [];
    var html = '';
    for(u = 0; u<usuario.length; u++) {

        //console.log("Rol "+usuario[u].rol+" "+roles[rol]);

        html+= `<tr>`+
                `<td>${usuario[u].usuarioId}</td>`+
                `<td>*****</td>`+
                `<td>${usuario[u].nombre}</td>`+
                `<td>(${usuario[u].rol.id}) ${usuario[u].rol.rol}</td>`+
                `<td><a href="#" onclick="unsetUsuario('${u}')">Quitar</a></td>`+
            `</tr>`;
    }
    console.log(html);
    document.querySelector('#'+objId).innerHTML = html;
}

function unsetUsuario(u) {

    const usuarios = JSON.parse(localStorage.getItem('usuario')) || [];
    usuarios.splice(u, 1);
    localStorage.setItem('usuario', JSON.stringify(usuarios));
    getUsuarioList('usuariosList');

}

function usuarioLimpiar() {

    document.querySelector('#user').value = '';
    document.querySelector('#pass').value = '';
    document.querySelector('#nombre').value = '';
    //document.querySelector('#rol').value = '';

}

document.addEventListener('DOMContentLoaded', function () {
    
    function usuarioAdd(user, pass, nombre, rol) {

        const existe = usuario.find(usuario => usuario.usuarioId === user, usuario.pass == pass);

        if (existe) {
            //showAlert('El usuario que intenta registrar ya se encuetra registrado.', 'danger');
            console.log('El usuario que intenta registrar ya se encuetra registrado.');
            return existe;
        }

        const newUsuario = { 'usuarioId': user, 'pass': pass, 'nombre': user, 'rol': rol };
        usuario.push(newUsuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        //showAlert('Nuevo usuario creado correctamente.', 'success');
        console.log('Nuevo usuario creado correctamente.', newUsuario);
        return newUsuario;

    }

    function login(user, pass) {

        console.log('Intentando iniciar sesión:', { user, pass });
        console.log('Buscand '+user);

        const usuarioFind = usuario.find((usuario) => usuario.usuarioId === user && usuario.pass === pass);

        if (usuarioFind || (user == 'nathanbernal@gmail.com' && pass == '123')) {

            if (!usuarioFind) {
                usuarioAdd('nathanbernal@gmail.com', '123', 'nathanbernal@gmail.com', 'nathanbernal@gmail.com');
            }
            console.log(usuario);

            console.log('Inicio de sesi&oacute;n exitoso:', usuarioFind);
            return usuarioFind;

        } else {

            console.log('Email de usuario o contrase&ntilde;a incorrectos.');
            return false;
        }
    }

    window.usuarioAdd = usuarioAdd;
    window.login = login;

});

document.addEventListener('DOMContentLoaded', function () {
    // Manejar el formulario de inicio de sesión
    const formLogin = document.querySelector('.login-form form');

    console.log('Stop');

    const user = document.querySelector('input[name="user"]').value;
    const pass = document.querySelector('input[name="pass"]').value;
    console.log("Usuario "+user+" Pass "+pass);
    //window.usuarioAdd(user, pass, user, user);

    if (formLogin) {

        formLogin.addEventListener('submit', function (event) {

            event.preventDefault();
            event.stopPropagation();

            const user = document.querySelector('#user').value;
            const pass = document.querySelector('#pass').value;

            console.log('Formulario de inicio de sesión enviado:', { 'usuarioId': user, 'pass': pass });

            const usuarioOk = window.login(user, pass);

            console.log(usuarioOk);

            if (usuarioOk) {

                console.log('Inicio de sesión exitoso:', usuarioOk);
                localStorage.setItem('session', JSON.stringify(usuarioOk));
                location.replace('main.html');

            } else {

                //showAlert('Email de usuario o contraseña incorrectos.', 'danger');
                console.log('Error en el inicio de sesi&oacute;n.');

            }

        }, false);

    }

    function showAlert(msg, alertaTipo) {

        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alert alert-${alertaTipo}`;
        alertaDiv.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container');
        const firstChild = container.firstChild;

        if (firstChild) {
            container.insertBefore(alertaDiv, firstChild);
        } else {
            container.appendChild(alertaDiv);
        }

        setTimeout(() => {
            const alerta = document.querySelector('.alert');
            if (alerta) {
                alerta.remove();
            }
        }, 6000);
    }

});

if (document.querySelector("#usuariosList")) {
    getUsuarioList('usuariosList');
}
