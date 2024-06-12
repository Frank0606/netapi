// Crear el div contenedor principal del navbar
let navbar = document.createElement("div");
navbar.className = "navbar has-background-primary-soft column p-0 is-full";
navbar.setAttribute("role", "navigation");
navbar.setAttribute("aria-label", "main navigation");

// Crear el div interno para la marca del navbar
let navbarBrand = document.createElement("div");
navbarBrand.className = "navbar-brand";

// Crear el enlace y la imagen del logo
let logoLink = document.createElement("a");
logoLink.className = "navbar-item";
let logoImg = document.createElement("img");
logoImg.className = "image is-fullheight-with-navbar";
logoImg.src = "./css/resources/images/logo.webp";
logoImg.alt = "Bettle-finder";
logoLink.appendChild(logoImg);
navbarBrand.appendChild(logoLink);

// Crear el enlace del título "Bettle-finder"
let titleLink = document.createElement("a");
titleLink.className = "navbar-item is-size-2 is-uppercase has-text-weight-bold p-5 has-text-light";
titleLink.href = "paginaPrincipalB.html";
titleLink.textContent = "Bettle-finder";
navbarBrand.appendChild(titleLink);

// Crear el enlace "Especies"
let speciesLink = document.createElement("a");
speciesLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
speciesLink.href = "galeriaEscarabajos.html";
speciesLink.textContent = "Especies";
navbarBrand.appendChild(speciesLink);

// Crear el enlace "Clasificador"
let classifierLink = document.createElement("a");
classifierLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
classifierLink.href = "paginaClasificador.html";
classifierLink.textContent = "Clasificador";
navbarBrand.appendChild(classifierLink);

// Crear el enlace "Recursos"
let resourcesLink = document.createElement("a");
resourcesLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
resourcesLink.href = "paginaRecursos.html";
resourcesLink.textContent = "Recursos";
navbarBrand.appendChild(resourcesLink);

// Crear el enlace "Ayuda"
let helpLink = document.createElement("a");
helpLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
helpLink.href = "paginaAyuda.html";
helpLink.textContent = "Ayuda";
navbarBrand.appendChild(helpLink);

// Crear el div interno para el final de la barra de navegación
let navbarEnd = document.createElement("div");
navbarEnd.className = "navbar-end";

// Crear el div interno para el botón de "Cerrar Sesión"
let navbarItem = document.createElement("div");
navbarItem.className = "navbar-item p-0";
let buttons = document.createElement("div");
buttons.className = "buttons m-0";

// Crear el botón "Cerrar Sesión"
let logoutButton = document.createElement("a");
logoutButton.id = "cerrarSesion";
logoutButton.className = "button is-light is-outlined has-text-weight-bold mr-5 is-normal is-responsive";
logoutButton.textContent = "Cerrar Sesión";
logoutButton.setAttribute("onclick", "cerrarSesion()");
buttons.appendChild(logoutButton);

// Añadir los elementos internos al contenedor final de la barra de navegación
navbarItem.appendChild(buttons);
navbarEnd.appendChild(navbarItem);
navbarBrand.appendChild(navbarEnd);

// Añadir el div interno al div principal del navbar
navbar.appendChild(navbarBrand);

document.getElementById("divNavbar").appendChild(navbar)