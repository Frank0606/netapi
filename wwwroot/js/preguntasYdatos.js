const uri = 'api/escarabajo'

//Obtener a los escarabajos
let escarabajos

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function mostrarErrorServidor() {
    const btnCerrarSesion = document.getElementById("cerrarSesion")
    btnCerrarSesion.classList.add("is-hidden")

    const divPrincipal = document.getElementById("ContenidoPrincipal");
    divPrincipal.innerHTML = "";

    const divError = document.createElement("div");
    divError.classList.add("has-text-centered");
    divError.style.width = "100%";

    const titulo = document.createElement("p");
    titulo.classList.add("label", "has-text-black", "is-size-3", "my-4");
    titulo.textContent = "Fallas en el sistema";

    const texto = document.createElement("p");
    texto.classList.add("has-text-black", "is-size-4", "mb-5");
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

async function fetchEscarabajos() {
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCookie('userToken')
            }
        },)
        const newToken = response.headers.get('Set-Authorization');
        if (newToken) {
            console.log('Nuevo token:', newToken);
            const tokenCookie = "userToken=" + newToken + "; expires=Mon, 01 Jul 2024 12:00:00 GMT; SameSite=strict";
            document.cookie = tokenCookie;
        }
        const data = await response.json()
        if(data.message){
            swal("Problema - Escarabajos", data.message, "error", {
                button: "Aceptar"
            }); 
        } else {
            escarabajos = data
        }
    } catch (error) {
        mostrarErrorServidor()
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchEscarabajos()
    fetch("api/pregunta", {
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
            return response.json();
        })
        .then(data => {
            if(data.message){
                swal("Problema - Preguntas", data.message, "error", {
                    button: "Aceptar"
                });
            } else {
                mostrarPreguntas(data)
                escucharSonidoPaginaPrincipal()
            }
        })
        .catch(error => {
            const carusel = document.getElementById("slider")
            
        })
})

function mostrarPreguntas(data) {

    const slider = document.getElementById("slider")
    const inputRadio = document.createElement('input')

    // const inner = document.querySelector(".inner")
    const divSlide = document.createElement("div")
    const divSlideContent = document.createElement("div")
    const divColumn = document.createElement("div")
    const labelTitle = document.createElement("label")
    const pContenido = document.createElement("p")
    let contador = 1

    data.forEach(pregunta => {
        let inputRadioInner = inputRadio.cloneNode(false)

        inputRadioInner.setAttribute('type', 'radio')
        inputRadioInner.setAttribute('name', 'slider')
        inputRadioInner.setAttribute('id', `slide${contador}`)

        if(contador === 1){
            inputRadioInner.setAttribute('checked', '')
        }

        slider.appendChild(inputRadioInner)

        contador = contador + 1
    })

    const slides = document.createElement('div')
    slides.setAttribute('id', 'slides')
    slides.classList.add('p-3')

    const overflow = document.createElement('div')
    overflow.setAttribute('id', 'overflow')

    const inner = document.createElement('div')
    inner.classList.add('inner')
    
    overflow.appendChild(inner)
    slides.appendChild(overflow)
    slider.appendChild(slides)

    contador = 1

    data.forEach(pregunta => {
        const divSlideInner = divSlide.cloneNode(false)
        divSlideInner.classList.add('slide', `slide_${contador}`, 'is-align-content-center')

        const divSlideContentInner = divSlideContent.cloneNode(false)
        divSlideContentInner.classList.add('slide-content', 'columns')
        divSlideContentInner.style.height = "100%"

        const divColumnTInner = divColumn.cloneNode(false)
        divColumnTInner.classList.add('column', 'is-align-content-center', 'has-background-primary-soft')

        let labelTitleInner = labelTitle.cloneNode(false)
        labelTitleInner.classList.add('has-text-white', 'has-text-weight-bold', 'is-size-4', 'px-6')
        labelTitleInner.textContent = pregunta.pregunta_pregunta

        const divColumnPInner = divColumn.cloneNode(false)
        divColumnPInner.classList.add('column', 'is-align-content-center')

        let pContenidoInner = pContenido.cloneNode(false)
        pContenidoInner.classList.add('px-6', 'is-size-5', 'has-text-black')
        pContenidoInner.textContent = pregunta.respuesta_pregunta

        divColumnPInner.appendChild(pContenidoInner)
        divColumnTInner.appendChild(labelTitleInner)
        divSlideContentInner.appendChild(divColumnTInner)
        divSlideContentInner.appendChild(divColumnPInner)
        divSlideInner.appendChild(divSlideContentInner)
        inner.append(divSlideInner)

        contador = contador + 1
    })

    inner.style.width = `calc((${contador} - 1) * 100%)`
    const divControls = document.createElement('div')
    divControls.setAttribute('id', 'controls')

    slider.appendChild(divControls)

    const divBullets = document.createElement('div')
    divBullets.setAttribute('id', 'bullets')

    const label = document.createElement('label')

    contador = 1

    data.forEach(preguntas => {
        let labelInner = label.cloneNode(false)

        labelInner.setAttribute('for', `slide${contador}`)

        contador = contador + 1

        divBullets.appendChild(labelInner)
    })

    slider.appendChild(divBullets)
}

const grande = document.querySelector(".grande")
const punto = document.querySelectorAll(".punto")

punto.forEach( (cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i
        let operacion = posicion * -50

        grande.style.transform = `translateX(${operacion}%)`

        punto.forEach( (cadaPunto, i ) => {
            punto[i].classList.remove('activo')
        })

        punto[i].classList.add('activo')
    })
})

const botonBusqueda = document.getElementById('botonBusqueda')
const cajaBusqueda = document.getElementById('campoBusqueda')
const lista = document.getElementById('sugerencia')

cajaBusqueda.addEventListener('input', function () {
    const input = cajaBusqueda.value.toLowerCase();

    // Filtra los escarabajos basándote en la entrada del usuario
    const filtro = escarabajos.filter(escarabajo =>
        escarabajo.especie.toLowerCase().startsWith(input)
    );

    // Limpia la lista antes de añadir los nuevos elementos
    lista.innerHTML = "";

    // Si la entrada está vacía, asegúrate de que la lista también esté vacía
    if (input === "") {
        return;
    }

    // Añade los elementos filtrados a la lista
    filtro.forEach(escarabajo => {
        const li = document.createElement('li');
        li.classList.add('has-background-primary-soft', 'has-text-white', 'p-3')

        const a = document.createElement('a')
        a.textContent = escarabajo.especie
        a.setAttribute('onClick', `mostrarDescripcion('${escarabajo.especie}')`)

        li.appendChild(a)
        lista.appendChild(li);
    });
});

function mostrarDescripcion(especie){
    let date = new Date();
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    especieCookie = "especieBusqueda=" + especie + ";" + expires + "; SameSite=strict";
    document.cookie = especieCookie
    window.location.href = "galeriaEscarabajos.html"
}

function escucharSonidoPaginaPrincipal() {
    const audioContainer = document.getElementById('audioContainer')

    const numeroRandomEscarabajo = Math.floor(Math.random() * (escarabajos.length))
    const escarabajoRandom = escarabajos[numeroRandomEscarabajo]

    const numeroRandomAudio = Math.floor(Math.random() * (escarabajos[numeroRandomEscarabajo].audios.length))
    const audioRandom = escarabajoRandom.audios[numeroRandomAudio]

    const audioElement = document.createElement('audio')
    audioElement.src = audioRandom
    audioElement.controls = true
    audioContainer.appendChild(audioElement)
}