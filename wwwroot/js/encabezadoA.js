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
titleLink.href = "paginaPrincipalA.html";
titleLink.textContent = "Bettle-finder";
navbarBrand.appendChild(titleLink);

// Crear el enlace "Biologos"
let biologistsLink = document.createElement("a");
biologistsLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
biologistsLink.href = "crudBiologos.html";
biologistsLink.textContent = "Biologos";
navbarBrand.appendChild(biologistsLink);

// Crear el enlace "Escarabajos"
let beetlesLink = document.createElement("a");
beetlesLink.className = "navbar-item is-size-4 has-text-weight-medium has-text-light";
beetlesLink.href = "crudEscarabajos.html";
beetlesLink.textContent = "Escarabajos";
navbarBrand.appendChild(beetlesLink);

// Crear el div interno para el final de la barra de navegación
let navbarEnd = document.createElement("div");
navbarEnd.className = "navbar-end";

// Crear el div interno para el botón de "Cerrar Sesión"
let navbarItem = document.createElement("div");
navbarItem.className = "navbar-item p-0";
let buttons = document.createElement("div");
buttons.className = "buttons m-0";

// Crear la etiqueta "Administrador"
let adminLabel = document.createElement("label");
adminLabel.className = "has-text-light has-text-weight-bold mr-4 is-size-5 is-underlined";
adminLabel.setAttribute('id', 'adminLabel')
adminLabel.textContent = "Administrador";
buttons.appendChild(adminLabel);

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

document.getElementById("divNavbarA").appendChild(navbar)