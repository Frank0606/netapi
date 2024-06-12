//Seccion Biologos ------------------------------------------------------------------------------------------------------------- 
const uri = 'http://192.168.56.104:5001/api/biologo'

//Obtener a los biologos
let biologos

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function mostrarErrorServidor() {
    const txtAdmin = document.getElementById("adminLabel")
    txtAdmin.classList.add("is-hidden")

    const btnCerrarSesion = document.getElementById("cerrarSesion")
    btnCerrarSesion.classList.add("is-hidden")

    const divPrincipal = document.getElementById("ContenidoPrincipal");
    divPrincipal.innerHTML = "";

    const divError = document.createElement("div");
    divError.classList.add("has-text-centered");
    divError.style.width = "100%";

    const titulo = document.createElement("p");
    titulo.classList.add("label", "has-text-white", "is-size-3", "my-4");
    titulo.textContent = "Fallas en el sistema";

    const texto = document.createElement("p");
    texto.classList.add("has-text-white", "is-size-4", "mb-5");
    texto.textContent = "Lo sentimos. Tenemos problemas para comunicarnos con el sistema.";

    const imagenContainer = document.createElement("div");
    imagenContainer.classList.add("is-flex", "is-justify-content-center", "mb-6");

    const imagen = document.createElement("img");
    imagen.src = "./css/resources/images/escarabajoError.webp";
    imagen.classList.add("image", "is-128x128");

    imagenContainer.appendChild(imagen);

    divError.appendChild(titulo);
    divError.appendChild(texto);
    divError.appendChild(imagenContainer);

    divPrincipal.appendChild(divError);
}

async function fetchBiologos() {
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCookie('userToken')
            }
        })
        const newToken = response.headers.get('Set-Authorization');
        if (newToken) {
            console.log('Nuevo token:', newToken);
            const tokenCookie = "userToken=" + newToken + "; expires=Mon, 01 Jul 2024 12:00:00 GMT; SameSite=strict";
            document.cookie = tokenCookie;
        }
        const data = await response.json();
        if (getCookie('userRol') === 'Administrador') {
            biologos = data
            _mostrarBiologos(biologos)
        } else {
            mostrarErrorServidor()
        }
    } catch (error) {
        mostrarErrorServidor()
    }
}
fetchBiologos()

//carga los forms
const formAgregarBiologo = document.getElementById("formAgregarBiologo")
const formEditar = document.getElementById('editarForm')
const cerrarEditar = document.getElementById("cerrarModalEditar")
const cerrarAgregar = document.getElementById('cerrarModalAgregar')
const btnBorrarFormAgregar = document.getElementById('btnBorrarFormAgregar')
//      Se crean los eventos -------------------------------------------------------------------------------
formAgregarBiologo.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarBiologo();
})

formEditar.addEventListener("submit", (e) => {
    e.preventDefault()
    actualizarBiologo()
})

cerrarEditar.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('editarForm').classList.remove('is-active')
})

cerrarAgregar.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('agregarBiologo').classList.remove('is-active')
    openModalMostrar()
})

btnBorrarFormAgregar.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('nombreBiologo').value = ''
    document.getElementById('correoBiologo').value = ''
    document.getElementById('edadBiologo').value = ''
    document.getElementById('telefonoBiologo').value = ''
    document.getElementById('contrasenaBiologo').value = ''
})

//      Metodos para trabajar con la API
//          Obtener o GET
function obtenerBiologos() {
    try {
        _mostrarBiologos(biologos)
    } catch (error) {
        mostrarErrorServidor()
    }
}

function _mostrarBiologos(data) {
    const tBody = document.getElementById('mostrarBiologos')
    tBody.innerHTML = ''

    _displayCount(data.length)

    const boton = document.createElement('button')

    data.forEach(item => {
        let btnEditar = boton.cloneNode(false)
        btnEditar.innerHTML = 'Editar'
        btnEditar.classList.add('button', 'is-small', 'is-warning', 'is-outlined', 'has-text-weight-bold');
        btnEditar.setAttribute('onClick', `mostrarFormEditar("${item.id}")`)

        let btnEliminar = boton.cloneNode(false)
        btnEliminar.innerHTML = 'Eliminar'
        btnEliminar.classList.add('button', 'is-small', 'is-danger', 'is-outlined', 'has-text-weight-bold');
        btnEliminar.setAttribute('onClick', `eliminarBiologo("${item.id}")`)

        let tr = tBody.insertRow()

        let tdNombre = tr.insertCell(0)
        let textNodeNombre = document.createTextNode(item.userName)
        tdNombre.appendChild(textNodeNombre)

        let tdCorreo = tr.insertCell(1)
        let textNodeCorreo = document.createTextNode(item.email)
        tdCorreo.appendChild(textNodeCorreo)

        let tdEdad = tr.insertCell(2)
        let textNodeEdad = document.createTextNode(item.edad)
        tdEdad.classList.add('has-text-centered')
        tdEdad.appendChild(textNodeEdad)

        let tdTelefono = tr.insertCell(3)
        let textNodeTelefono = document.createTextNode(item.phoneNumber)
        tdTelefono.classList.add('has-text-centered')
        tdTelefono.appendChild(textNodeTelefono)

        let tdEditar = tr.insertCell(4)
        tdEditar.classList.add('has-text-centered')
        tdEditar.appendChild(btnEditar)

        let tdEliminar = tr.insertCell(5)
        tdEliminar.classList.add('has-text-centered')
        tdEliminar.appendChild(btnEliminar)
    })
}

//          Agregar o POST
function agregarBiologo() {
    const nombre = document.getElementById('nombreBiologo')
    const correo = document.getElementById('correoBiologo')
    const edad = document.getElementById('edadBiologo')
    const telefono = document.getElementById('telefonoBiologo')
    const contrasena = document.getElementById('contrasenaBiologo')

    const passwordError = document.getElementById('passwordError');
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordPattern.test(contrasena.value)) {
        passwordError.classList.remove("hidden")
    } else {
        passwordError.classList.add("hidden")

        const biologo = {
            Nombre: nombre.value.trim(),
            Correo: correo.value.trim(),
            Edad: parseInt(edad.value.trim()),
            Telefono: telefono.value.trim(),
            Contrasena: contrasena.value.trim(),
            Administrador: false
        }
    
        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('userToken')
            },
            body: JSON.stringify(biologo)
        })
            .then(response => {
                const newToken = response.headers.get('Set-Authorization');
                if (newToken) {
                    console.log('Nuevo token:', newToken);
                    const tokenCookie = "userToken=" + newToken + "; expires=Mon, 01 Jul 2024 12:00:00 GMT; SameSite=strict";
                    document.cookie = tokenCookie;
                }
                return response.json()
            })
            .then(() => {
                obtenerBiologos()
                nombre.value = ''
                correo.value = ''
                edad.value = ''
                telefono.value = ''
                contrasena.value = ''
            })
            .then(() => document.getElementById('agregarBiologo').classList.remove('is-active'))
            .then(() => window.location.reload())
            .catch(error => alert("No se ha podido agregar al biologo"))
    }
}

//          Eliminar o DELETE
function eliminarBiologo(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getCookie('userToken')
        }
    })
        .then(response => {
            const newToken = response.headers.get('Set-Authorization');
            if (newToken) {
                console.log('Nuevo token:', newToken);
                const tokenCookie = "userToken=" + newToken + "; expires=Mon, 01 Jul 2024 12:00:00 GMT; SameSite=strict";
                document.cookie = tokenCookie;
            }
            return response.json()
        })
        .then(() => window.location.reload())
        .catch(error => alert("No se ha podido eliminar a este biologo"))
}

//          Editar o UPDATE
function mostrarFormEditar(id) {
    const biologo = biologos.find(biologo => biologo.id === id)

    document.getElementById('editarId').value = biologo.id
    document.getElementById('editarNombre').value = biologo.userName
    document.getElementById('editarCorreo').value = biologo.email
    document.getElementById('editarEdad').value = biologo.edad
    document.getElementById('editarTelefono').value = biologo.phoneNumber
    document.getElementById('editarForm').classList.add('is-active')
}

function actualizarBiologo() {
    const idbiologo = document.getElementById('editarId').value.trim()

    const biologo = {
        Id: idbiologo,
        Nombre: document.getElementById('editarNombre').value.trim(),
        Correo: document.getElementById('editarCorreo').value.trim(),
        Edad: parseInt(document.getElementById('editarEdad').value.trim(), 10),
        Telefono: document.getElementById('editarTelefono').value.trim(),
        Administrador: false,
        Contrasena: biologos.find(biologo => biologo.id === idbiologo).passwordHash
    }

    fetch(`${uri}/${idbiologo}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('userToken')
        },
        body: JSON.stringify(biologo)
    })
        .then(response => {
            const newToken = response.headers.get('Set-Authorization');
            if (newToken) {
                console.log('Nuevo token:', newToken);
                const tokenCookie = "userToken=" + newToken + "; expires=Mon, 01 Jul 2024 12:00:00 GMT; SameSite=strict";
                document.cookie = tokenCookie;
            }
            return response.json()
        })
        .then(() => window.location.reload())
        .then(() => document.getElementById('editarForm').classList.remove('is-active'))
        .catch(error => alert("No se ha podido editar al biologo '" + biologo.Nombre + "'"))


}

//          Funciones extras
function _displayCount(length) {
    const nombre = (length === 1) ? 'biologo' : 'biologos'
    document.getElementById('contador').innerText = `${length} ${nombre}`
}

//          Funciones para los modales
function openModalAgregar() {
    const modal = document.getElementById("breadcrumbAgregar")
    modal.classList.add('is-active')

    const modal2 = document.getElementById("breadcrumbMostrar")
    modal2.classList.remove('is-active')

    const modalAgregar = document.getElementById('agregarBiologo')
    modalAgregar.classList.add('is-active')
}

function openModalMostrar() {
    const modal = document.getElementById("breadcrumbMostrar")
    modal.classList.add('is-active')

    const modal2 = document.getElementById("breadcrumbAgregar")
    modal2.classList.remove('is-active')
}
//-------------------------------------------------------------------------------------------------------------------------------