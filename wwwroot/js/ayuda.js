uri = "api/ayuda"
let ayudas

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(uri, {
        method: 'GET',
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
        .then(data => {
            ayudas = data
            crearSeccionesAyudas(ayudas)
        })
        .catch(error =>
            mostrarErrorServidor()
        )
})

function mostrarErrorServidor() {
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

function crearSeccionesAyudas(ayudas) {

    const divSection = document.createElement('div')
    divSection.classList.add('section')
    divSection.style.height = "auto"
    divSection.style.boxSizing = "border-box"

    const divContainer = document.createElement('div')
    divContainer.classList.add('container')
    divContainer.classList.add('p-4')
    divContainer.style.width = "100%"
    divContainer.style.boxSizing = "border-box"

    const label = document.createElement('label')
    label.classList.add('subtitle', 'has-text-weight-bold', 'is-size-4')

    const p = document.createElement('p')
    p.style.width = "100%"
    p.classList.add('py-5')

    const divAyuda = document.getElementById('div-ayuda')

    let contador = 0

    ayudas.forEach(ayuda => {
        const labelInner = label.cloneNode(false)
        labelInner.textContent = ayuda.titulo
        labelInner.setAttribute('onClick', `mostrarModalAyuda('${ayuda.id}')`)

        const pInner = p.cloneNode(false)
        pInner.textContent = ayuda.contenido
        pInner.style.margin = "0"
        pInner.style.padding = "0"

        const divContainerInner = divContainer.cloneNode(false)
        divContainerInner.style.margin = "0"
        divContainerInner.style.padding = "0"
        divContainerInner.style.display = "inline-block"
        divContainerInner.appendChild(labelInner)
        divContainerInner.appendChild(pInner)

        const divSectionInner = divSection.cloneNode(false)
        
        if((contador % 2) === 0) {
            divSectionInner.classList.add('has-background-white')
        } else {
            divSectionInner.classList.add('has-background-light')
        }

        divSectionInner.appendChild(divContainerInner)

        divAyuda.appendChild(divSectionInner)

        contador++
    })
}

function mostrarModalAyuda(idAyuda){
    ayudas.forEach(ayuda => {
        
    })
}