const btnEnviar = document.querySelector(".boton-enviar");
const email = document.querySelector(".input-email");
const asunto = document.querySelector(".input-asunto");
const mensaje = document.querySelector(".input-mensaje");
const formulario = document.querySelector(".formulario");
const exRE =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventos();
function eventos() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
}

//* Funciones
//todo: Desabilitar al iniciar
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor", "opacidad");
}

//todo: validar formularios
function validarFormulario(evt) {
  if (evt.target.value.length > 0) {
    const quitarError = document.querySelector("p.error-msj");
    if (quitarError) {
      quitarError.remove();
    }
    evt.target.classList.add("not-error");
    evt.target.classList.remove("error");
  } else {
    evt.target.classList.remove("not-error");
    evt.target.classList.add("error");
    mostrarError("Todos los campos son obligatorios");
  }

  if (evt.target.type === "email") {
    if (exRE.test(evt.target.value)) {
      const quitarError = document.querySelector("p.error-msj");
      if (quitarError) {
        quitarError.remove();
      }
      evt.target.classList.remove("error");
      evt.target.classList.add("not-error");

      console.log("email valido");
    } else {
      evt.target.classList.remove("not-error");
      evt.target.classList.add("error");
      mostrarError("email no valido");
    }
  }

  if (
    exRE.test(email.target) !== "" &&
    asunto.value !== "" &&
    mensaje.value !== ""
  ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor", "opacidad");
  }
}

// todo: Imprimir mensajes en el HTML
function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add("error-msj", "mensaje-error");

  const errores = document.querySelectorAll(".error-msj");
  console.log(errores);
  if (errores.length === 0) {
    formulario.insertBefore(mensajeError, document.querySelector(".agregar"));
  }
}