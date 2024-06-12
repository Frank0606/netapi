// Crear el div contenedor principal
let mainDiv = document.createElement("div");
mainDiv.className = "columns m-0 p-0";

// Crear el div interno para "Sobre nosotros"
let innerDiv = document.createElement("div");
innerDiv.className = "has-background-primary-soft p-4 is-full column is-justify-content-center has-text-centered";

// Crear el párrafo "Sobre nosotros"
let p = document.createElement("p");
p.className = "has-text-light has-text-weight-bold is-size-4";
p.textContent = "Sobre nosotros";
innerDiv.appendChild(p);

// Crear el primer enlace de Facebook
let fbLink = document.createElement("a");
fbLink.href = "https://www.facebook.com";
fbLink.target = "_blank";
fbLink.className = "icon is-large has-text-light";

// Crear el icono de Facebook
let fbIcon = document.createElement("i");
fbIcon.className = "bx bxl-facebook-circle";
fbIcon.style.fontSize = "36px";
fbLink.appendChild(fbIcon);

// Añadir el enlace de Facebook al div interno
innerDiv.appendChild(fbLink);

// Crear el segundo enlace de GitHub
let ghLink = document.createElement("a");
ghLink.href = "https://github.com";
ghLink.target = "_blank";
ghLink.className = "icon is-large has-text-light";

// Crear el icono de GitHub
let ghIcon = document.createElement("i");
ghIcon.className = "bx bxl-github";
ghIcon.style.fontSize = "36px";
ghLink.appendChild(ghIcon);

// Añadir el enlace de GitHub al div interno
innerDiv.appendChild(ghLink);

// Crear el tercer enlace de Instagram
let igLink = document.createElement("a");
igLink.href = "https://www.instagram.com";
igLink.target = "_blank";
igLink.className = "icon is-large has-text-light";

// Crear el icono de Instagram
let igIcon = document.createElement("i");
igIcon.className = "bx bxl-instagram";
igIcon.style.fontSize = "36px";
igLink.appendChild(igIcon);

// Añadir el enlace de Instagram al div interno
innerDiv.appendChild(igLink);

// Añadir el div interno al div principal
mainDiv.appendChild(innerDiv);

// Añadir el div principal al body del documento
document.body.appendChild(mainDiv);
