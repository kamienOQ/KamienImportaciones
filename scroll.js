// Función para mostrar u ocultar el botón según la posición de desplazamiento
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  var scrollToTopBtn = document.getElementById("goToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Función para desplazarse hacia arriba
function goToTop() {
  document.body.scrollTop = 0; // Para Safari
  document.documentElement.scrollTop = 0; // Para otros navegadores
}