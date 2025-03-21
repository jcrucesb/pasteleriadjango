document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location; // Obtenemos la ruta actual desde la plantilla
    if(currentPath == 'http://127.0.0.1:8000/'){
        Swal.fire({
            title: "¡Bienvenido!",
            text: "Modal with a custom image.",
            imageUrl: "static/img/descuento.png",
            html: `
                <b>Regístrate en el siguiente links</b>,
                <a href="singup" autofocus>Registrarme</a>,
                <b">y recibe cupones con increíbles descuentos que tenemos para tí</b>
            `,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }
    const inputBusqueda = document.getElementById('input_busqueda_producto');
    inputBusqueda.addEventListener('keydown', function(event) {
        if (event.keyCode === 13 || event.key === "Enter") {
            let input_busqueda_producto = document.getElementById("input_busqueda_producto").value;
            let card_tittle = document.querySelectorAll(".producto_busqueda");

            card_tittle.forEach(element => {
                let prueba = element.getAttribute("data-nombre_producto_busqueda");
                let normalizedPrueba = prueba.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                let normalizedInput = input_busqueda_producto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

                // Compara el valor del atributo con el valor esperado
                if (normalizedPrueba.includes(normalizedInput)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        }
    });
});