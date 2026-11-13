// contacto.js: validación del formulario de contacto.
const formulario = document.getElementById('formulario');

// Formato básico de email: texto@texto.texto, sin espacios
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Revisa los campos en orden y devuelve el mensaje del primer error,
// o null si todo es válido.
function validar(datos) {
  if (datos.nombre.length < 2) return '⚠️ El campo "Nombre" es obligatorio (mínimo 2 letras).';
  if (!REGEX_EMAIL.test(datos.email)) return '⚠️ Ingresá un email válido.';
  if (!datos.edad || datos.edad < 10 || datos.edad > 99) return '⚠️ Ingresá una edad entre 10 y 99.';
  if (!datos.pelicula) return '⚠️ Elegí tu película favorita.';
  if (!datos.respuesta) return '⚠️ Elegí una preferencia de respuesta.';
  if (datos.mensaje.length < 10) return '⚠️ El mensaje debe tener al menos 10 caracteres.';
  if (!datos.terminos) return '⚠️ Tenés que aceptar el uso de tus datos.';
  return null;
}

// La validación se hace en el evento submit
formulario.addEventListener('submit', (evento) => {
  // Evita que el formulario recargue la página
  evento.preventDefault();

  // Junta los valores de todos los campos (trim saca espacios de los extremos)
  const datos = {
    nombre: formulario.nombre.value.trim(),
    email: formulario.email.value.trim(),
    edad: Number(formulario.edad.value),
    pelicula: formulario.pelicula.value,
    respuesta: formulario.querySelector('input[name="respuesta"]:checked'), // null si no eligió ninguno
    mensaje: formulario.mensaje.value.trim(),
    terminos: formulario.terminos.checked
  };

  // Si hay un error se avisa con un alert y se corta el envío
  const error = validar(datos);
  if (error) {
    alert(error);
    return;
  }

  // Envío exitoso: mensaje de éxito y se limpian todos los campos
  alert('✅ ¡Gracias ' + datos.nombre + '! Tu mensaje fue enviado con éxito.');
  formulario.reset();
});
