//Funcionando correctamente el CARROUSEL con imágenes de los productos.
function datos(id_product, nombreProducto, imgProducto1, precioProd, detalle_producto, cantidad_prod) {
    //Primera imagen del Modal con CARROUSEL.
    let ruta_imagen1 = document
      .getElementById("imagen1_" + id_product)
      .getAttribute("data-im");
    const arrayDeImagenes = ruta_imagen1.split(",");
    const imgElement = document.createElement("img");
    imgElement.src = "/static/" + arrayDeImagenes[0];
    imgElement.className = "card-img-top";
    imgElement.style.width = '265px';
    imgElement.style.height = '200px';
    const card_modal_img = document.querySelector(".img_1");
    card_modal_img.innerHTML = "";
    card_modal_img.appendChild(imgElement);
  
    //Segunda imagen del modal con CARROUSEL.
    let ruta_imagen2 = document
      .getElementById("imagen1_" + id_product)
      .getAttribute("data-im");
    const imgElement2 = document.createElement("img");
    imgElement2.src = "/static/" + arrayDeImagenes[1];
    imgElement2.className = "card-img-top";
    imgElement2.style.width = '265px';
    imgElement2.style.height = '200px';
    const card_modal_img2 = document.querySelector(".img_2");
    card_modal_img2.innerHTML = "";
    card_modal_img2.appendChild(imgElement2);
  
    //3era imagen del modal con CARROUSEL.
    let ruta_imagen3 = document
      .getElementById("imagen1_" + id_product)
      .getAttribute("data-im");
    const imgElement3 = document.createElement("img");
    imgElement3.src = "/static/" + arrayDeImagenes[2];
    imgElement3.className = "card-img-top";
    imgElement3.style.width = '265px';
    imgElement3.style.height = '200px';
    const card_modal_img3 = document.querySelector(".img_3");
    card_modal_img3.innerHTML = "";
    card_modal_img3.appendChild(imgElement3);
    //Crearemos los detalles del producto.
    let titulo = document.getElementById("producto_title")
    titulo.innerText = nombreProducto
    let detalles = document.getElementById("detalle_detalle")
    detalles.innerText = "Detalles: " + detalle_producto
    let precio = document.getElementById("detalle_precio")
    precio.innerText = "Precio: $"+precioProd+ " clp"
    let cant = document.getElementById("detalle_cantidad")
    cant.innerText ="Cantidad Disp: " + cantidad_prod
  
    //Agregamos los valores necesarios para crear la tabla y mostrar los productos.
    let btn_carrito_compras = document.getElementById("agregar_carro");
    //Si existe el id, agregamos los data.
    if (btn_carrito_compras) {
      btn_carrito_compras.setAttribute("data-id", id_product);
      btn_carrito_compras.setAttribute("data-nombreProducto", nombreProducto);
      btn_carrito_compras.setAttribute("data-imagen_1", arrayDeImagenes[0]);
      btn_carrito_compras.setAttribute("data-precio", precioProd);
      btn_carrito_compras.setAttribute("data-cant_prod_disp", cantidad_prod);
    }
    
}
// Input de búsqueda de productos en la pagina principal SIN iniciar sessión.
function busqueda(e){
    
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
// Botón de cancelar búsqueda de productos en la pagina principal SIN iniciar sessión.
function cancelar_busqueda(e){
    let card_tittle = document.querySelectorAll(".producto_busqueda")
    card_tittle.forEach(element => {
        // Compara el valor del atributo con el valor esperado
        element.style.display = 'block';
        let input_busqueda_producto = document.getElementById("input_busqueda_producto");
        input_busqueda_producto.value = ""
    });
}
//Obtener el valor del button del modal del carrito de compras. Ingresando al td correctamente.
function agregarCarro(e) {
    // Destruimos el DataTable si es que se encontraba activa para evitar problemas.
    $('#tabla_producto').DataTable().destroy();
    // Función para separar los array cada 7 elementos.
    function chunkArray(arr, chunkSize){
        return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
    let valor_data_id = document.getElementById("agregar_carro")
    let id = '';
    let nombreProducto = '';
    let precioProducto = '';
    let imagenProducto = '';
    let cant_prod_disp = '';
    let guardar_id_datatables = []
    if (valor_data_id) {
        id = valor_data_id.getAttribute("data-id");
        nombreProducto = valor_data_id.getAttribute("data-nombreProducto");
        precioProducto = valor_data_id.getAttribute("data-precio");
        imagenProducto = valor_data_id.getAttribute("data-imagen_1");
        cant_prod_disp = valor_data_id.getAttribute("data-cant_prod_disp");
        // Obtener la tabla y el cuerpo de la tabla
        const tabla_producto = document.getElementById("tabla_producto");
        const tbody_producto = tabla_producto.getElementsByClassName("tbdoy_product");
        // Declaramos una variable.
        let valor_mostrar = document.getElementById("mostrarValor")
        for (var tbody_productos of tbody_producto)
        {
            // Crear una nueva fila
            const nuevaFila = document.createElement("tr");
            nuevaFila.id = "tr_id"
            nuevaFila.setAttribute("data-tr_id", id)

            // Crear las celdas y agregar los datos
            const td_id = document.createElement("td");
            td_id.innerHTML = id;
            td_id.id = "tdID"
            td_id.setAttribute("data-td_id", id)
            td_id.setAttribute("data-td_nombreProducto", nombreProducto)
            td_id.setAttribute("data-td_precioProducto", precioProducto)

            const td_nombreProducto = document.createElement("td");
            td_nombreProducto.innerHTML = nombreProducto;

            const td_imagen = document.createElement("td");
            const img = document.createElement("img");
            img.src = '/static/'+imagenProducto
            img.width = 155
            img.height = 130
            //td_imagen.innerHTML = imagenProducto;

            const td_precio = document.createElement("td");
            td_precio.innerHTML = "$"+precioProducto;

            //Crearemos un nuevo elemento input para la cantidad estimada.
            let td_cantidad = document.createElement("td")
            let td_cantidad_input = document.createElement("input")
            td_cantidad_input.className = "text-center"
            td_cantidad_input.type = "number"
            td_cantidad_input.name = "valor_cantidad_td_"+id;
            td_cantidad_input.id = "valor_cantidad_td_"+id;
            td_cantidad_input.style.font = "6px";
            td_cantidad_input.style.borderRadius = "25px";
            td_cantidad_input.min = 1;
            td_cantidad_input.pattern = "^[0-9]+";
            td_cantidad_input.value = 1;
            td_cantidad_input.setAttribute("data-id", id);
            td_cantidad_input.setAttribute("data-valorProd", precioProducto);
            td_cantidad_input.setAttribute("data-prod_disp", cant_prod_disp);
            //td_cantidad_input.setAttribute("data-value", id)
            //Crearemos un nuevo elemento input para el valor estimado.
            let td_pagar = document.createElement("td")
            td_pagar.id = "td_pago"
            td_pagar.setAttribute("data-td_input_pago_", id)
            let td_pagar_input = document.createElement("input")
            td_pagar_input.className = "text-center"
            td_pagar_input.type = "number"
            td_pagar_input.name = "valor_pagar_td_"+id;
            td_pagar_input.id = "valor_pagar_td_"+id;
            td_pagar_input.style.font = "6px";
            td_pagar_input.style.borderRadius = "25px";
            td_pagar_input.pattern = "^[0-9]+";
            td_pagar_input.value = precioProducto;
            td_pagar_input.readOnly = "true"
            td_pagar_input.setAttribute("data-id", id)
            //---------------------------------------------------
            td_pagar_input.setAttribute("data-valor_total", precioProducto)
            //---------------------------------------------------
            let valores_finale = []
            //Función keyup Correctamente.
            let valor_final = '';
            td_cantidad_input.addEventListener("keyup", (event) => {
                //console.log(id)
                let arr = []
                let cant_disp = document.getElementById("valor_cantidad_td_"+id).getAttribute("data-prod_disp")
                let cant = document.getElementById("valor_cantidad_td_"+id).value
                let precio = document.getElementById("valor_cantidad_td_"+id).getAttribute("data-valorprod")
                if (parseInt(cant_disp) < parseInt(cant)) {
                    Swal.fire({
                        icon: "warning",
                        title: "La cantidad solicitada, debe ser inferior o igual al stock disponible del Producto que es: " + cant_disp,
                    });
                }
                let totalPagar = parseInt(precio) * parseInt(cant);
                let pagar = document.getElementById("valor_pagar_td_"+id);
                pagar.value = totalPagar;
                // Selecciona la tabla
                let tabla = document.getElementById("tabla_producto");
                var tbody = table.tBodies[0].rows;
                var agregar = []
                for (let index = 0; index < tbody.length; index++) {
                    let fila = tbody[index];
                    // Selecciona todos los td dentro de la fila
                    let tdElements = fila.getElementsByTagName("td");
                    // Itera sobre cada td
                    Array.from(tdElements).forEach(td => {
                        // Verifica si el td contiene un input
                        let inputElements = td.querySelectorAll("input");
                        Array.from(inputElements).forEach(input => {
                            // Obtiene el valor del input
                            let inputValue = input.value;
                            agregar.push(inputValue);
                        });
                    });
                }
                let chunkSize = 2;
                let chunks = chunkArray(agregar, chunkSize);
                let array_val = []
                chunks.forEach(function(x) {
                    let valor_compra = parseInt(x[1])
                    array_val.push(valor_compra)
                });
                valor_final = array_val.reduce((anterior, actual) => anterior + actual, 0);
                valores_finale.push(valor_final)
                // llamamo a la variabe que declaramos anteriormente.
                valor_mostrar.value = valor_final
                td_pagar_input.setAttribute("data-valor_total", valor_final)
            });
            //Crearemos un nuevo elementode botones para eliminar un <tr></tr>.
            let td_buttons = document.createElement("td")
            let buttons_action = document.createElement("button")
            buttons_action.className = "btn btn-danger";
            buttons_action.style.borderRadius = "25px";
            buttons_action.textContent = "Eliminar";
            buttons_action.name = "delete_td";
            buttons_action.id = "delete_td";
            // Agregar un atributo data usando setAttribute
            buttons_action.setAttribute("data-id", id);
            //Modificar el input por cada producto agregado al Carrito de Compras.
            buttons_action.addEventListener("click", function() {
                // Código a ejecutar cuando se hace clic en el botón y eliminar una fila.
                let fila = this.parentNode.parentNode;
                let id_borrado = fila.firstElementChild.innerText
                let obtenerValor = document.getElementById("valor_pagar_td_"+id_borrado).value
                let mostarValores = document.getElementById("mostrarValor").value
                //Realizamos el descuento del producto borrado.
                let resta_valor = parseInt(mostarValores) - parseInt(obtenerValor)
                //Pasamos el valor de la resta al inputa que muestra el total.
                mostarValores.value = resta_valor
                let valor_cant = document.getElementById("valor_cantidad_td_"+id_borrado).getAttribute("data-valorProd")
                let valor_precio_total= document.getElementById("mostrarValor").value
                let valor_actualizado = parseInt(valor_precio_total) - parseInt(obtenerValor)
                // Accede al input y actualiza su valor
                let inputValorPrecioTotal = document.getElementById("mostrarValor");
                inputValorPrecioTotal.value = valor_actualizado;
                valor_precio_total.value = valor_actualizado
                // Eliminar tr cuando se apriete el botón de eliminar.
                fila.parentNode.removeChild(fila);
                // Eliminar el tr de DataTables.
                $('#tabla_producto').DataTable().row(fila).remove().draw();
                //const tds = tbody_producto.getElementsByTagName("td");
                var table = document.getElementById("tabla_producto");
                var tbody = table.tBodies[0];
                let verificar_td = tbody.querySelector('td').innerText
                if (verificar_td == 'No hay información'){
                    document.querySelector('#total_producto').value = 0
                    $('#tabla_producto').DataTable().destroy();
                    let credit_card = document.getElementById("credit_card")
                    credit_card.style.display = "none"
                    let debito = document.getElementById("debito")
                    debito.style.display = "none"
                }else{
                    // En lugar de alert, actualiza el valor del campo
                    document.querySelector('#total_producto').value = tbody.rows.length;
                    console.warn(document.querySelector('#total_producto').value)
                }
            });
            // Agregar las celdas <td></td> a la nueva fila, <tr></tr>.
            nuevaFila.appendChild(td_id);
            nuevaFila.appendChild(td_nombreProducto);
            nuevaFila.appendChild(td_precio);
            nuevaFila.appendChild(td_imagen);
            nuevaFila.appendChild(td_cantidad);
            nuevaFila.appendChild(td_pagar);
            td_cantidad.appendChild(td_cantidad_input)
            td_imagen.appendChild(img);
            td_pagar.appendChild(td_pagar_input)
            nuevaFila.appendChild(td_buttons);
            td_buttons.appendChild(buttons_action);
            tbody_productos.appendChild(nuevaFila);
        }
        $('#tabla_producto').DataTable({
            searching: true,
            destroy: true,
            //"dom": 'Bfrtip',
            "bAutoWidth": true,
            //buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [10, 25, 50, -1],
                ['10 Resultados', '25 Resultados', '50 Resultados', 'Mostrar Todos']
            ],
            "buttons": {
                "pageLength": {
                    _: "Mostrar %d Registros"
                }
            },
            "language": {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Datos",
                "infoEmpty": "Mostrando 0 to 0 of 0 Usuarios Clientes",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Documentos",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        });
        var table = document.getElementById("tabla_producto");
        var tbody = table.tBodies[0];
        var input = document.getElementById("total_producto")
        // En lugar de alert, actualiza el valor del campo
        console.log(document.querySelector('#total_producto').value = tbody.rows.length);
        let valor_datatables = document.querySelector('#total_producto').value
        let verificar = document.getElementById("mostrarValor")
        // Creamos un array para guardar tofos los valores.
        let guardar_valor_por_productos = [];
        var table_a = document.getElementById("tabla_producto");
        let filas = table_a.getElementsByTagName("tr");
        // Itera sobre cada fila
        Array.from(filas).forEach(fila => {
            // Selecciona los td dentro de cada fila
            let tdElements = fila.getElementsByTagName("td");
            // Convierte la HTMLCollection a un arreglo y recorre los td
            Array.from(tdElements).forEach((td, index) => {
                // Verifica si es el tercer td (índice 2)
                if (index === 0) {
                    // Guarda el valor del tercer td
                    guardar_valor_por_productos.push(td.textContent);
                }
            });
        });
        let valor_prod = []
        console.warn(guardar_valor_por_productos)
        guardar_valor_por_productos.forEach(element => {
            let valores_por_productos = document.getElementById("valor_pagar_td_" + element).getAttribute('data-valor_total')
            valor_prod.push(valores_por_productos)
            if (valor_datatables > 0 && valor_datatables < 2){
                let suma = 0;
                for (let i = 0; i < valor_prod.length; i++) {
                    suma += parseInt(valor_prod[i]);
                    let nuevo_valor_input_mostrar = document.getElementById("mostrarValor")
                    nuevo_valor_input_mostrar.value = suma
                    let credit_card = document.getElementById("credit_card")
                    credit_card.style.display = "block"
                    let debito = document.getElementById("debito")
                    debito.style.display = "block"
                }
            }
            if (valor_datatables > 1){
                let suma = 0;
                for (let i = 0; i < valor_prod.length; i++) {
                    suma += parseInt(valor_prod[i]);
                    console.log(suma)
                    let nuevo_valor_input_mostrar = document.getElementById("mostrarValor")
                    nuevo_valor_input_mostrar.value = suma
                    let credit_card = document.getElementById("credit_card")
                    credit_card.style.display = "block"
                    let debito = document.getElementById("debito")
                    debito.style.display = "block"
                }   
            }
        });
        //Activamosel Swal para dar alerta que se ingresó un producto al carrito de ventas.
        Swal.fire({
            title: "Ingresado Correctamente",
            text: "Su producto se ha guardado en el carrito de compras",
            icon: "success"
        });
    }
}
//funcion para el input del valor.
function valorInput(e){
    // Selecciona la tabla
    let boton_carrito = document.getElementById("agregar_carrito")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(boton_carrito);
    // Abre el modal
    modalInstance.show();
    //Ojo, creamos una funcion y la utilizamos acá mismo. Esto simplifica todo.
    //Función para crar subs array de un array principal y separar cada 7 elementos.
    function chunkArray(arr, chunkSize){
        return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
    // 
    var table_a = document.getElementById("tabla_producto");
    var tbody_a = table_a.tBodies[0].rows;
    let filas = table_a.getElementsByTagName("tr");
    let arr = []
    let id_prod = []
    let valor_prod_pagar =[]
    let solo_id = []
    // Itera sobre cada fila
    Array.from(filas).forEach(fila => {
        // Selecciona los td dentro de cada fila
        let tdElements = fila.getElementsByTagName("td");
        // Convierte la HTMLCollection a un arreglo y recorre los td
        Array.from(tdElements).forEach(td => {
            arr.push(td.textContent);
        });
    });
}
//Funcion para pagar
function pagar(e){
    var inputValor = document.getElementById("mostrarValor");
    //Contar si existe Productos.
    var table_a = document.getElementById("tabla_producto");
    var tbody_a = table_a.tBodies[0].rows;
    //
    if (tbody_a.length > 0) {
        let div_pagar = document.getElementById("div_pago")
        div_pagar.style.display = "block"
        //Seleccionamos todos td en este caso que contengan este id. 
        let table = document.querySelectorAll("#tdID");
        let guardar = []
        let guardarArrayCookie = []
        for(var i = 0; i<table.length; i++){
            //Recorremos el id de arriba y obtenemos el data. 
            let id = table[i].getAttribute("data-td_id")
            let nombreProductos = table[i].getAttribute("data-td_nombreProducto")
            let precioProductos = table[i].getAttribute("data-td_precioProducto")
            let valorCantidad = document.getElementById("valor_cantidad_td_" + id).value
            let pagarTotal = document.getElementById("valor_pagar_td_"+id).value
            guardar.push(parseInt(pagarTotal))
            let datos = [
                {
                  "id_producto": id,
                  "nombreProducto": nombreProductos,
                  "precioProducto": precioProductos,
                  "valorCantidad": valorCantidad,
                  "pagarTotal": pagarTotal,
                }
            ]
        }
        // lo mismo, pero más conciso, y en solo una línea
        const suma_array = guardar.reduce((anterior, actual) => anterior + actual, 0);
    }
    if(tbody_a.length < 1){
        Swal.fire({
            icon: "error",
            title: "No existen Productos",
        });
    }
}
//Mostrar las opciones de cuotas.
function credito(e){
    let pago_credito=document.getElementById("credit_card").value
    let input_oculto = document.getElementById("tipo_pago")
    input_oculto.value = pago_credito
    let credito = document.getElementById("credit")
    credito.style.display = "block";
    let mostrarPagar = document.getElementById("mostrarValor").value
    console.warn(mostrarPagar)
    let pagar = document.getElementById("div_pagar")
    pagar.innerText = "Total a Pagar: $"+mostrarPagar+" clp.";
}
//Función para esconder las cuotas cuando se selecciona DEBITO.
function debito(e){
    let pago_debito=document.getElementById("debito").value
    let input_oculto = document.getElementById("tipo_pago")
    input_oculto.value = pago_debito
    let credito = document.getElementById("credit")
    credito.style.display = "none";
    //Borrar el el radio button elegido.
    let cuotas = document.getElementsByName("cuota")
    for (var i = 0; i < cuotas.length; i++) {
        cuotas[i].checked = false;
    }
    let mostrarPagar = document.getElementById("mostrarValor").value
    console.warn(mostrarPagar)
    let pagar = document.getElementById("div_pagar")
    pagar.innerText = "Total a Pagar: $"+mostrarPagar+" clp.";
}
//Función para elegir la Región y la Ciudad.
function buscar_ciudad(){
    //
    let opcion = document.getElementById("region").value
    //
    if (opcion == 1) {
        let ciudades_1 = new Array("Huara", "Camiña", "Colchane", "Pica", "Pozo Almonte", "Alto Hospicio", "Iquique");
        let comuna = document.getElementById("comuna")
        for (let index = 0; index < ciudades_1.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 1) {
                    o.remove()
                }
            });
            let elegir_comuna = document.createElement("option")
            elegir_comuna. id = "1"
            elegir_comuna.value = ciudades_1[index]
            elegir_comuna.innerText = ciudades_1[index]
            comuna.appendChild(elegir_comuna)
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 2) {
                    o.remove()
                }
                //o.remove()
            });
        }
    }
    if(opcion == 2){
        let ciudades_2 = new Array("Antofagasta","Mejillones","Sierra Gorda","Taltal","Calama","Ollagüe","San Pedro de Atacama","María Elena","Tocopilla");
        //
        for (let index = 0; index < ciudades_2.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 2) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_2[index];
            elegir_comuna. id = "2"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
        
    }
    if(opcion == 3){
        let ciudades_3 = new Array("Chañaral", "Diego de Almagro", "Caldera", "Copiapó", "Tierra Amarilla", "Huasco", "Freirina", "Vallenar","Alto del Carmen");
        //
        for (let index = 0; index < ciudades_3.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 3) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_3[index];
            elegir_comuna. id = "3"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
        
    }
    //
    if(opcion == 4){
        let ciudades_4 = new Array("Canela", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Coquimbo", "La Higuera", "La Serena", "Paihuano", "Vicuña", "Combarbalá", "Monte Patria", "Ovalle", "Punitaqui", "Río Hurtado");
        //
        for (let index = 0; index < ciudades_4.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 4) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_4[index];
            elegir_comuna. id = "4"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
        
    }
    //
    if(opcion == 5){
        let ciudades_5 = new Array("Hanga Roa", "Calle Larga", "Los Andes", "Rinconada", "San Esteban", "Cabildo", "La Ligua", "Papudo", "Petorca", "Zapallar", "Hijuelas", "La Calera", "La Cruz"," Nogales", "Quillota", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "San Antonio", "Santo Domingo", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "San Felipe", "Santa María", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Valparaíso", "Viña del Mar", "Limache", "Olmué", "Quilpué","Villa Alemana");
        //
        for (let index = 0; index < ciudades_5.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 5) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_5[index];
            elegir_comuna. id = "5"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
        
    }
    //
    if(opcion == 6){
        let ciudades_6 = new Array("Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rancagua","Rengo","Requínoa","San Vicente de Tagua Tagua","La Estrella","Litueche","Marchigüe","Navidad","Paredones","Pichilemu","Chépica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo","Placilla","Pumanque","San Fernando","Santa Cruz");
        //
        for (let index = 0; index < ciudades_6.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 6) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_6[index];
            elegir_comuna. id = "6"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
        
    }
    //
    if(opcion == 7){
        let ciudades_7 = new Array("Cauquenes","Chanco","Pelluhue","Curicó","Hualañé","Licantén","Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuquén","Linares","Colbún","Longaví","Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas","Talca","Constitución","Curepto","Empedrado","Maule","Pelarco","Pencahue","Río Claro","San Clemente","San Rafael");
        //
        for (let index = 0; index < ciudades_7.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 7) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_7[index];
            elegir_comuna. id = "7"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 8){
        let ciudades_8 = new Array("Arauco","Cañete","Contulmo","Curanilahue","Lebu","Los Álamos","Tirúa","Alto Biobío","Antuco","Cabrero","Laja","Los Ángeles","Mulchén","Nacimiento","Negrete","Quilaco","Quilleco","San Rosendo","Santa Bárbara","Tucapel","Yumbel","Concepción","Coronel","Chiguayante","Florida","Hualpén","Hualqui","Lota","Penco","San Pedro de la Paz","Santa Juana","Talcahuano","Tomé");
        //
        for (let index = 0; index < ciudades_8.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 8) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_8[index];
            elegir_comuna. id = "8"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 9){
        let ciudades_9 = new Array("Temuco","Carahue","Cholchol","Cunco","Curacautín","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Saavedra","Teodoro Schmidt","Toltén","Vilcún","VillarricaTemuco","Carahue","Cholchol","Cunco","Curacautín","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Saavedra","Teodoro Schmidt","Toltén","Vilcún","Villarrica");
        //
        for (let index = 0; index < ciudades_9.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 9) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_9[index];
            elegir_comuna. id = "9"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 10){
        let ciudades_10 = new Array("Ancud","Castro","Chonchi","Curaco de Vélez","Dalcahue","Puqueldón","Queilén","Quemchi","Quellón","Quinchao","Puerto Montt","Puerto Varas","Cochamó","Calbuco","Maullín","Los Muermos","Fresia","Llanquihue","Frutillar","Osorno","Puerto Octay","Purranque","Puyehue","Río Negro","San Juan de la Costa","San Pablo","Chaitén","Futaleufú","Hualaihué","Palena");
        //
        for (let index = 0; index < ciudades_10.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 10) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_10[index];
            elegir_comuna. id = "10"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 11){
        let ciudades_11 = new Array("Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas (incluye las islas Guaitecas)","Cochamó","Chile Chico","Río Ibáñez","Cochrane","Tortel");
        //
        for (let index = 0; index < ciudades_11.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 11) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_11[index];
            elegir_comuna. id = "11"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 12){
        let ciudades_12 = new Array("Punta Arenas","Laguna Blanca","Río Verde","San Gregorio","Natales","Torres del Paine","Porvenir","Primavera","Cabo de Hornos","Antártica");
        //
        for (let index = 0; index < ciudades_12.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 12) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_12[index];
            elegir_comuna. id = "12"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //
    if(opcion == 13){
        let ciudades_13 = new Array("Alto Jahuel","Bajos de San Agustin","Batuco","Buin","Cerrillos","Cerro Navia","Colina","Conchali","Curacavi","El Bosque","El Monte","Estacion Central","Hospital","Huechuraba","Independencia","Isla de Maipo","La Cisterna","La Florida","La Granja","La Islita","La Pintana","La Reina","Lampa","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipu","Melipilla","Nunoa","Padre Hurtado","Paine","Pedro Aguirre Cerda","Penaflor","Penalolen","Pirque","Providencia","Pudahuel","Puente Alto","Quilicura","Quinta Normal","Recoleta","Renca","San Bernardo","San Joaquin","San Jose de Maipo","San Miguel","San Ramon","Santiago","Talagante","Tiltil","Vitacura");
        //
        for (let index = 0; index < ciudades_13.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 13) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_13[index];
            elegir_comuna. id = "13"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    if(opcion == 14){
        let ciudades_13 = new Array("Valdivia","Corral","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","La Unión","Futrono","Lago Ranco","Río Bueno");
        //
        for (let index = 0; index < ciudades_13.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 14) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_13[index];
            elegir_comuna. id = "14"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    if(opcion == 15){
        let ciudades_13 = new Array("Arica","Camarones","Putre","General Lagos");
        //
        for (let index = 0; index < ciudades_13.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 15) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_13[index];
            elegir_comuna. id = "15"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
    //Listo Funcionando.
    if(opcion == 16){
        let ciudades_16 = new Array("Cobquecura","Coelemu","Ninhue","Portezuelo","Quirihue","Ránquil","Trehuaco","Bulnes","Chillán Viejo","Chillán","El Carmen","Pemuco","Pinto","Quillón","San Ignacio","Yungay","Coihueco","Ñiquén","San Carlos","San Fabián","San Nicolás");
        //
        for (let index = 0; index < ciudades_16.length; index++) {
            let comuna = document.getElementById("comuna")
            let comuna_s = comuna.querySelectorAll("option")
            comuna_s.forEach(o =>{
                //console.log(o.id)
                if (o.id != 16) {
                    o.remove()
                }
                //o.remove()
            });
            let elegir_comuna = document.createElement("option")
            const element = ciudades_16[index];
            elegir_comuna. id = "16"
            elegir_comuna.value = element
            elegir_comuna.innerText = element
            comuna.appendChild(elegir_comuna)
        }
    }
}
//
function pagar_final(e){
    //Contar si existe Productos.
    var table_a = document.getElementById("tabla_producto");
    var tbody_a = table_a.tBodies[0].rows;
    //
    if (tbody_a.length > 0) {
        //Seleccionamos todos td en este caso que contengan este id. 
        let table = document.querySelectorAll("#tdID");
        let guardar = []
        let datos_productos = []
        for(var i = 0; i<table.length; i++){
            //Recorremos el id de arriba y obtenemos el data. 
            let id = table[i].getAttribute("data-td_id")
            let nombreProductos = table[i].getAttribute("data-td_nombreProducto")
            let precioProductos = table[i].getAttribute("data-td_precioProducto")
            let valorCantidad = document.getElementById("valor_cantidad_td_" + id).value
            let pagarTotal = document.getElementById("valor_pagar_td_"+id).value
            guardar.push(parseInt(pagarTotal))
            datos_productos.push(valorCantidad, pagarTotal,id)
        }
        console.log(datos_productos)
        // lo mismo, pero más conciso, y en solo una línea
        const suma_array = guardar.reduce((anterior, actual) => anterior + actual, 0);
        let guardar_datos = []
        //OBTENER TODOS LOS INPUTS DEL FORMULARIO FINAL.
        let form = document.getElementById("form_pago")
        let input_form_pago = form.querySelectorAll("input[type='text']")
        input_form_pago.forEach(element => {
            // GFuardamos los datos en el Array.
            guardar_datos.push(element.value)
        });
        //
        let valor_ciudad = document.getElementById("region").value
        console.warn(valor_ciudad)
        if (valor_ciudad != 0) {
            let regiones = document.getElementById("region_"+valor_ciudad).getAttribute("data-region")
            console.warn(regiones)
            guardar_datos.push(regiones)
        }
        //
        let valor_comuna = document.getElementById("comuna").value
        console.warn(valor_comuna)
        guardar_datos.push(valor_comuna)
        var radios = document.querySelectorAll('input[name="tipo_propiedad"]');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                guardar_datos.push(radios[i].value);
            }
        }
        //Obtenemos el tipo de pago seleccionado, si es 0; Debito, si es 1; Credito.
        let tipo_pago = document.getElementById("tipo_pago").value
        guardar_datos.push(tipo_pago)
        console.warn(guardar_datos)
        if (guardar_datos[9] == "1") {
            let obtener_cuota = document.querySelectorAll('input[name="cuota"]');
            for (var i = 0; i < obtener_cuota.length; i++) {
                if (obtener_cuota[i].checked) {
                    guardar_datos.push(obtener_cuota[i].value);
                }
            }
        }
        // Token que deseas enviar
        let input_token = document.getElementById("form_pago")
        let token = input_token.querySelector("input[type='hidden']").value
        let tokens = token.toString()
        
        // Función para segmentar el array cada 4 elementos
        const segmentarArray = (array) => {
            const resultado = [];
            for (let i = 0; i < array.length; i += 5) {
            resultado.push(array.slice(i, i + 5));
            }
            return resultado;
        };
        if (guardar_datos.length < 10) {
            Swal.fire({
                icon: "error",
                title: "Se deben completar todos los campos",
            });
        }else{
            Swal.fire({
                title: "¿Deseas Realizar el Pago?",
                text: "Realiza el pago de tus productos",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#00BFFF",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, realizar pago"
              }).then((result) => {
                if (result.isConfirmed) {
                    // Envío de datos por axios, funcionando perfectamente.
                    axios.post('/productos/pagar_debito/',{'guardar_datos':guardar_datos, 'datos_productos':datos_productos},
                    {
                        //'datos_productos': datos_productos}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': tokens
                        }
                    })
                    .then(response => {
                        if (response.status == 200) {
                            Swal.fire({
                                title: "!Gracias por tu compra!",
                                text: "Gracias por preferirnos y regresa pronto...",
                                icon: "success"
                                })
                                .then(() => {
                                    setTimeout(() => {
                                      location.reload();
                                    }, 1000);
                                });
                        }
                    })
                    .catch(error => {
                        // console.log(error.data);
                        // console.log(error.error);
                        console.log('Oh No! Error!');  
                        console.log(error.response.data.error)
                        if (error.response.data.error == 1) {
                            Swal.fire({
                                icon: "error",
                                title: "Faltan completar datos",
                            });
                        }
                        if (error.response.data.error == 2) {
                            Swal.fire({
                                icon: "error",
                                title: "La cantidad solicitada, debe ser inferior al stock disponible del Producto",
                            });
                        }
                        if (error.response.data.error == 3) {
                            Swal.fire({
                                icon: "error",
                                title: "El email ya se encuentra ingresado, debe ingresar otro correo",
                            });
                        }
                        if (error.response.data.error == 4) {
                            Swal.fire({
                                icon: "error",
                                title: "Falta seleccionar la cantidad de cuotas",
                            });
                        }
                        if (error.response.data.error == 5) {
                            Swal.fire({
                                icon: "error",
                                title: "Debe seleccionar almenos un producto",
                            });
                        }
                    })
                }
            });
        }
        
    }
}