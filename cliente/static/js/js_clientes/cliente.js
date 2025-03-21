// Burcador de productos desde el Panel de Clientes del Sistema.
function busqueda_panel_cliente(e){
    let input_busqueda_producto_panel_cliente = document.getElementById("input_busqueda_producto_panel_cliente").value;
    let card_tittle = document.querySelectorAll(".producto_busqueda_panel_cliente_usuario");

    card_tittle.forEach(element => {
        let prueba = element.getAttribute("data-nombre_producto_busqueda_panel_cliente");
        let normalizedPrueba = prueba.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        let normalizedInput = input_busqueda_producto_panel_cliente.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // Compara el valor del atributo con el valor esperado
        if (normalizedPrueba.includes(normalizedInput)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}
// Cancelar la búsqueda desde el panel de clientes.
function cancelar_busqueda_panel_cliente(e){
    let card_tittle = document.querySelectorAll(".producto_busqueda_panel_cliente_usuario")
    card_tittle.forEach(element => {
        // Compara el valor del atributo con el valor esperado
        element.style.display = 'block';
        let input_busqueda_producto = document.getElementById("input_busqueda_producto_panel_cliente");
        input_busqueda_producto.value = ""
    });
}
//Función para elegir la Región y la Ciudad.
function buscar_ciudad(e){
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
// Registrar Cliente.
function registrar_cliente(e){
    // Envío de datos por axios, funcionando perfectamente.
    let form = document.getElementById("registro_usuario")
    let token_1 = form.querySelector("[type=hidden]")
    let token = token_1.value
    let regiones
    let valor_ciudad = document.getElementById("region").value
    if (valor_ciudad != 0) {
        regiones = document.getElementById("region_"+valor_ciudad).getAttribute("data-region")
    }
    let form_data = new FormData(form)
    //Seteamos la Región porque venía solo con el número, entonces la seteamos y aparece la Regíon Correcta.
    form_data.set('region', regiones);
    // form_data.forEach(element => {
    //     console.log(element)
    // });
    // debugger
    axios.post('/singup/',form_data,{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        console.log(response.data)
        if (response.data.status = 200) {
              Swal.fire({
                title: "Correcto!",
                text: "!Usuario Registrado¡",
                icon: "success"
              }).then(() => {
                // Redireccionamos al Panel de Clientes.
                window.location.href = response.data.redirect_url;
            });
        }
    }).catch(error => {
        // console.log(error.data);
        // console.log(error.error);
        console.log('Oh No! Error!');  
        console.log(error.response.data.error)
        if (error.response.data.message == 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
            });
        }
        if (error.response.data.message == 2) {
            Swal.fire({
                icon: "error",
                title: "Error 2",
            });
        }
        if (error.response.data.message == 3) {
            Swal.fire({
                icon: "error",
                title: "No pueden quedar campos vacíos",
            });
        }
        if (error.response.data.message == 4) {
            Swal.fire({
                icon: "error",
                title: "La password deben ser iguales.",
            });
        }
        if (error.response.data.message == 5) {
            Swal.fire({
                icon: "error",
                title: "La password debe tener almenos 8 carácteres.",
            });
        }
        if (error.response.data.message == 6) {
            Swal.fire({
                icon: "error",
                title: "La password debe tener almenos 1 carácter especial.",
            });
        }
        if (error.response.data.message == 7) {
            Swal.fire({
                icon: "error",
                title: "La password debe tener almenos 1 carácter especial.",
            });
        }
        if (error.response.data.message == 8) {
            Swal.fire({
                icon: "error",
                title: "El correo ingresado ya se aparece como registrado.",
            });
        }
    })
}
// Editar Datos del cliente.
function editar_cliente(e){
    let editar_cliente_usuario = document.getElementById("editar_cliente_usuario")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(editar_cliente_usuario);
    // Abre el modal
    modalInstance.show();
    //
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/edit_client/',{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Recibimos el OBJETO que enviamos desde DJANGO.
        const datos_cliente= response.data.final_array;
        console.warn(datos_cliente)
        console.warn(datos_cliente.length)
        // Inicializamos DataTables con los datos recibidos.
        var table = $('#table_cliente_datos_edit').DataTable({
            responsive: true,
            // Pasamos el valor que viene directamente desde DJANGO.
            data: datos_cliente,
            columns: [
                { title: 'ID Cliente', data: 'id_cliente', defaultContent: '' },
                { title: 'Password', data: 'password', defaultContent: '' },
                { title: 'Nombre', data: 'nombre', defaultContent: '' },
                {
                    title: 'Apellidos',
                    data: null,
                    defaultContent: '',
                    render: function (data, type, row, meta) {
                        return row.a_paterno + ' ' + row.a_materno;
                    }
                },
                { title: 'Teléfono', data: 'telefono', defaultContent: '' },
                { title: 'Email', data: 'email', defaultContent: '' },
                { title: 'Región', data: 'region', defaultContent: '' },
                { title: 'Comuna', data: 'comuna', defaultContent: '' },
                { title: 'Entrega', data: 'entrega', defaultContent: '' },
                { title: 'Dirección', data: 'direccion', defaultContent: '' },
                // Agregamos los botones para Editar y Eliminar
                {
                    title: 'Acciones',
                    defaultContent: '',
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `
                            <button class="btn btn-sm btn-primary" onclick="editando_cliente(${row.id_cliente},'${row.nombre}', '${row.a_paterno}', '${row.a_materno}', '${row.telefono}', '${row.email}', '${row.user_name}', '${row.region}', '${row.comuna}', '${row.entrega}', '${row.direccion}', '${row.password}', '${row.entrega}')">
                                <i class="fa-solid fa-file-pen"></i> Editar
                            </button>
                        `;
                    }
                }
            ],
            destroy: true,
            "layout": {
                "top": {
                    "left": "inline",
                    "center": "inline",
                    "right": "inline"
                }
            },
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
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
                "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
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
    });
}
// Form para editar cliente y abrir modal con el form.
function editando_cliente(id, nombre, a_paterno, a_materno, telefono, email, username, region, comuna, entrega, direccion, password, entrega){
    let modal_editar_cliente_usuario = document.getElementById("modal_editar_cliente_usuario")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_editar_cliente_usuario);
    // Abre el modal
    modalInstance.show();

    // Pasaremos los vsalores al formulario para editar.
    let edit_id_cliente = document.getElementById("id_cliente")
    edit_id_cliente.value = id
    let edit_nombre = document.getElementById("edit_register_nombre_cliente")
    edit_nombre.value = nombre
    let edit_a_paterno = document.getElementById("edit_register_ap_paterno_cliente")
    edit_a_paterno.value = a_paterno
    let edit_a_materno = document.getElementById("edit_register_ap_materno_cliente")
    edit_a_materno.value = a_materno
    // Comuna
    let edit_comuna = document.getElementById("comuna")
    let option = edit_comuna.querySelector("option")
    //edit_comuna.remove(option)
    option.value = comuna
    option.innerText = comuna
    // Select dinámico, esta es la manera de recorrer el select y obtener el valorInput.
    let edit_region = document.getElementById("region")
    // Iterar sobre las opciones del select
    for (let i = 0; i < edit_region.options.length; i++) {
        let option = edit_region.options[i];
        // Verificar si el texto de la opción es "Valparaiso"
        if (option.text === region) {
            // Seleccionar la opción
            option.selected = true;
            break;
        }
    }
    edit_comuna.addEventListener("click", function (e) {
        console.log(this.className); // logs the className of my_element
        console.log(e.currentTarget === this); // logs `true`
    });
    let edit_lugar_entrega = document.getElementsByName("edit_register_tipo_propiedad")
    edit_lugar_entrega.forEach(radio => {
        if (radio.value === entrega) {
                radio.checked = true;
            }
    });
    let edit_direccion = document.getElementById("edit_register_direccion_cliente")
    edit_direccion.value = direccion
    let edit_telefono = document.getElementById("edit_register_telefono")
    edit_telefono.value = telefono 
    let edit_email = document.getElementById("edit_register_email_cliente")
    edit_email.value = email
    let edit_nombre_usuario = document.getElementById("edit_register_name_user")
    edit_nombre_usuario.value = username
    let edit_password_1 = document.getElementById("edit_password_1")
    edit_password_1.value = password
    let edit_password_2 = document.getElementById("edit_password_2")
    edit_password_2.value = password
}
// Enviar formulario para editar Cliente del Panel de Clientes.
function enviar_form_editar_cliente(e){
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    let  form_edit = document.getElementById("editar_registro_panel_cliente")
    let regiones
    let valor_ciudad = document.getElementById("region").value
    console.warn(valor_ciudad)
    if (valor_ciudad != 0) {
        regiones = document.getElementById("region_"+valor_ciudad).getAttribute("data-region")
        console.warn(regiones)
        
    }
    let data = new FormData(form_edit)
    //Seteamos la Región porque venía solo con el número, entonces la seteamos y aparece la Regíon Correcta.
    data.set('region', regiones);
    const values = data.getAll("region");
    console.log(values); // Output: ["First value", "Second value"]
    console.warn(values)
    // Envío de datos por axios, funcionando perfectamente.
    axios.post('/clientes/edit_form_cliente/', data,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        if (response.status == 200) {
            Swal.fire({
                title: "Datos Actualizados",
                text: "Tus datos fueron actualizados con éxito",
                icon: "success",
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Recargar la página
                    location.reload();
                }
            });
        }
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
            console.warn(error.response.message)
            if (error.response.data.message == 0) {
                Swal.fire({
                    icon: "error",
                    title: "No pueden quedar campos vacíos",
                });
            }
            
            if (error.response.data.message == 4) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben cohincidir",
                });
            }
            if (error.response.data.message == 5) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener mínimo 8 carácteres",
                });
            }
            if (error.response.data.message == 6) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener almenos un carácter especial",
                });
            }
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Todas las compras realizadas por el cliente que son usuarios del sistema.
function cliente_compra(e){
    // Función para convertir las fechas que vienen de este formato; 2024-11-06T22:25:23.163Z a 06-11-2024.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    let boton_carrito = document.getElementById("compra_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(boton_carrito);
    // Abre el modal
    modalInstance.show();

    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/lista_compra_cliente/',{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Pasamos toas las compras realizadas por el usuario cliente.
        //console.warn(response.data.producto)
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#table_compra_cliente_panel').DataTable({
            responsive: true,
            // Pasamos el valor que viene directamente desde DJANGO.
            data: response.data.producto,
            columns: [
                { title: 'Nombre Producto', data: 'nombreProducto', defaultContent: '' },
                {
                    title: 'Fecha Venta',
                    data: 'fechaVenta',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                { title: 'Cant. Producto', data: 'cantProducto', defaultContent: '' },
                {
                    title: 'Total Pagar',
                    data: 'total_pagar',
                    defaultContent: '',
                    // Agregamos la función render para formatear el valor
                    render: function(data, type, row) {
                        return '$ ' + data;
                    }
                },
                { title: 'Cod Venta', data: 'num_venta', defaultContent: '' },
                
            ],
            destroy: true,
            "layout": {
                "top": {
                    "left": "inline",
                    "center": "inline",
                    "right": "inline"
                }
            },
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
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
                "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
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
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
            console.warn(error.response.message)
            if (error.response.data.message == 0) {
                Swal.fire({
                    icon: "error",
                    title: "No pueden quedar campos vacíos",
                });
            }
            
            if (error.response.data.message == 4) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben cohincidir",
                });
            }
            if (error.response.data.message == 5) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener mínimo 8 carácteres",
                });
            }
            if (error.response.data.message == 6) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener almenos un carácter especial",
                });
            }
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
//
function listar_producto_panel_cliente(e){
    let listar_productos_cliente = document.getElementById("listar_productos_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_productos_cliente);
    // Abre el modal
    modalInstance.show();
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    
}
//
function carrito_cliente_compra(e){
    let modal_listar_productos_seleccionaods_cliente = document.getElementById("modal_listar_productos_seleccionaods_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_listar_productos_seleccionaods_cliente);
    // Abre el modal
    modalInstance.show();
    //Ojo, creamos una funcion y la utilizamos acá mismo. Esto simplifica todo.
    //Función para crar subs array de un array principal y separar cada 7 elementos.
    function chunkArray(arr, chunkSize){
        return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
    var table_a = document.getElementById("tabla_producto_seleccionado_cliente");
    var tbody_a = table_a.tBodies[0].rows;
    // Selecciona la tabla
    //let tabla = document.getElementById("miTabla");

    // Selecciona todas las filas (tr) dentro de la tabla
    let filas = table_a.getElementsByTagName("tr");
    let arr = []
    // Itera sobre cada fila
    Array.from(filas).forEach(fila => {
        // Selecciona los td dentro de cada fila
        let tdElements = fila.getElementsByTagName("td");
        // Convierte la HTMLCollection a un arreglo y recorre los td
        Array.from(tdElements).forEach(td => {
            arr.push(td.textContent);
        });
    });
    // let chunkSize = 7;
    // let chunks = chunkArray(arr, chunkSize);
    // let array_val = []
    // chunks.forEach(function(x) {
    //     let id_compra = x[0]
    //     //console.warn(parseInt(id_compra))
    //     let valor = document.getElementById("valor_cantidad_td_" + id_compra).getAttribute("data-valorProd")
    //     array_val.push(parseInt(valor))
    // });
    // let valor_final = array_val.reduce((anterior, actual) => anterior + actual, 0);
    // let mostrarValor = document.getElementById("mostrarValorCliente")
    // mostrarValor.value = valor_final
}
// Listar los producto seleccionados por el cliente desde su Panel.
function datos_producto_listar(id, nombreProducto, imgProducto1,precioProd,detalle_producto,cantProdDisponible){
    // Destruimos el DataTable si es que se encontraba activa para evitar problemas.
    $('#tabla_producto_seleccionado_cliente').DataTable().destroy();
    // Función para separar los array cada 7 elementos.
    function chunkArray(arr, chunkSize){
        return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
    //Agregamos los valores necesarios para crear la tabla y mostrar los productos.
    let btn_carrito_compras = document.getElementById("agregar_carro_cliente");
    //Si existe el id, agregamos los data.
    if (btn_carrito_compras) {
      btn_carrito_compras.setAttribute("data-id", id);
      btn_carrito_compras.setAttribute("data-nombreProducto", nombreProducto);
      btn_carrito_compras.setAttribute("data-imagen_1", imgProducto1);
      btn_carrito_compras.setAttribute("data-precio", precioProd);
    }
    let valor_data_id = document.getElementById("agregar_carro_cliente")
    if (valor_data_id) {
        let id = valor_data_id.getAttribute("data-id");
        let nombreProducto = valor_data_id.getAttribute("data-nombreProducto");
        let precioProducto = valor_data_id.getAttribute("data-precio");
        let imagenProducto = valor_data_id.getAttribute("data-imagen_1");

        // Obtener la tabla y el cuerpo de la tabla
        const tabla_producto = document.getElementById("tabla_producto_seleccionado_cliente");
        const tbody_producto = tabla_producto.getElementsByClassName("tbdoy_product_client");
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
            td_nombreProducto.id = "prod_"+id;
            td_nombreProducto.innerHTML = nombreProducto;
            td_nombreProducto.setAttribute("data-td_nombre", nombreProducto)

            const td_imagen = document.createElement("td");
            const img = document.createElement("img");
            img.src = imagenProducto
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
            td_cantidad_input.setAttribute("data-cant_producto_disp", cantProdDisponible);
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
            //Función keyup Correctamente.
            td_cantidad_input.addEventListener("keyup", (event) => {
                //console.log(id)
                let arr = []
                let cant_disp = document.getElementById("valor_cantidad_td_"+id).getAttribute("data-cant_producto_disp")
                let cant = document.getElementById("valor_cantidad_td_"+id).value
                let precio = document.getElementById("valor_cantidad_td_"+id).getAttribute("data-valorprod")
                if (cant_disp < cant) {
                    Swal.fire({
                        icon: "warning",
                        title: "La cantidad solicitada, debe ser inferior o igual al stock disponible del Producto que es: " + cant_disp,
                    });
                }
                let totalPagar = parseInt(precio) * parseInt(cant);
                let pagar = document.getElementById("valor_pagar_td_"+id);
                pagar.value = totalPagar;
                // Selecciona la tabla
                let tabla = document.getElementById("tabla_producto_seleccionado_cliente");
                var tbody = table.tBodies[0].rows;
                let agregar = []
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
                //console.warn(array_val)
                valor_final = array_val.reduce((anterior, actual) => anterior + actual, 0);
                valores_finale.push(valor_final)
                td_pagar_input.setAttribute("data-valor_total", valor_final)
                let valor_mostrar = document.getElementById("mostrarValorCliente")
                valor_mostrar.value = valor_final
                //console.warn(agregar)
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
                let mostarValores = document.getElementById("mostrarValorCliente").value
                //Realizamos el descuento del producto borrado.
                let resta_valor = parseInt(mostarValores) - parseInt(obtenerValor)
                //Pasamos el valor de la resta al inputa que muestra el total.
                mostarValores.value = resta_valor
                let valor_cant = document.getElementById("valor_cantidad_td_"+id_borrado).getAttribute("data-valorProd")
                let valor_precio_total= document.getElementById("mostrarValorCliente").value
                let valor_actualizado = parseInt(valor_precio_total) - parseInt(obtenerValor)
                // Accede al input y actualiza su valor
                let inputValorPrecioTotal = document.getElementById("mostrarValorCliente");
                inputValorPrecioTotal.value = valor_actualizado;
                valor_precio_total.value = valor_actualizado
                // Eliminar tr cuando se apriete el botón de eliminar.
                fila.parentNode.removeChild(fila);
                // Eliminar el tr de DataTables.
                $('#tabla_producto_seleccionado_cliente').DataTable().row(fila).remove().draw();
                //const tds = tbody_producto.getElementsByTagName("td");
                var table = document.getElementById("tabla_producto_seleccionado_cliente");
                var tbody = table.tBodies[0];
                let verificar_td = tbody.querySelector('td').innerText
                var input = document.getElementById("total_producto_cliente")
                if (verificar_td == 'No hay información'){
                    document.querySelector('#total_producto_cliente').value = 0
                    $('#tabla_producto_seleccionado_cliente').DataTable().destroy();
                }else{
                    // En lugar de alert, actualiza el valor del campo
                    document.querySelector('#total_producto_cliente').value = tbody.rows.length;
                    console.warn(document.querySelector('#total_producto_cliente').value)
                }
                // En lugar de alert, actualiza el valor del campo
                //document.querySelector('#total_producto_cliente').value = tbody.rows.length;
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
        //
        $('#tabla_producto_seleccionado_cliente').DataTable({
            searching: true,
            destroy: true,
            //"dom": 'Bfrtip',
            "bAutoWidth": true,
            //buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5, 10, 50, -1],
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
        //--------------------------------------------------------------------------------------------------------
        var table = document.getElementById("tabla_producto_seleccionado_cliente");
        var tbody = table.tBodies[0];
        var input = document.getElementById("total_producto_cliente")
        // En lugar de alert, actualiza el valor del campo
        document.querySelector('#total_producto_cliente').value = tbody.rows.length;
        let valor_datatables = document.querySelector('#total_producto_cliente').value
        let verificar = document.getElementById("mostrarValorCliente")
        // Creamos un array para guardar tofos los valores.
        let guardar_valor_por_productos = [];
        var table_a = document.getElementById("tabla_producto_seleccionado_cliente");
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
        // Estos son los id de los Productos.
        //console.warn(guardar_valor_por_productos)
        guardar_valor_por_productos.forEach(element => {
            let valores_por_productos = document.getElementById("valor_pagar_td_" + element).getAttribute('data-valor_total')
            valor_prod.push(valores_por_productos)
            //console.warn(valor_prod)
            if (valor_datatables > 0 && valor_datatables < 2){
                let suma = 0;
                for (let i = 0; i < valor_prod.length; i++) {
                    suma += parseInt(valor_prod[i]);
                    let nuevo_valor_input_mostrar = document.getElementById("mostrarValorCliente")
                    nuevo_valor_input_mostrar.value = suma
                    nuevo_valor_input_mostrar.value
                }
            }
            //console.log(parseInt(valor_datatables))
            if (valor_datatables > 1){
                console.log("Pasamos")
                let suma = 0;
                for (let i = 0; i < valor_prod.length; i++) {
                    suma += parseInt(valor_prod[i]);
                    //console.log(suma)
                    let nuevo_valor_input_mostrar = document.getElementById("mostrarValorCliente")
                    nuevo_valor_input_mostrar.value = suma
                    console.log(nuevo_valor_input_mostrar.value)
                }  
            }
        });
        //---------------------------------------------------------------------------------------------------------
        Swal.fire({
            title: "Ingresado Correctamente",
            text: "Su producto se ha guardado en el carrito de compras",
            icon: "success"
        });
    }
}
//
function cancelar_pago_debito(e){
    let boton_cuota = document.getElementById("credit_card_cliente")
    boton_cuota.style.display = "block"
    let div_pagar = document.getElementById("div_pago_cliente")
    div_pagar.style.display = "flex";
    // Devolvemos el input de lmos el inputa de verificar los descuento al valor, por defecto, 0.
    let input_verificar_descuento = document.getElementById("cod_descuento_panel_cliente")
    input_verificar_descuento.value = 0;
    input_verificar_descuento.readOnly = false;
    // Nos traemos el botón de verificar los descuento, para que una vez que se haga
    // click en el boton cancelar, este boton de verrificación vuelva al estado normal.
    let boton_verificar_descuento = document.getElementById("btn_codigo_panel_cliente")
    boton_verificar_descuento.style.background = "#84a0eb";
    boton_verificar_descuento.disabled = false;
    boton_verificar_descuento.innerHTML = '<i class="fa-solid fa-code fa-spin-pulse"></i>  Enviar Código'
}
// Funcion para pagar
function pagar_cliente(e){
    var inputValor = document.getElementById("mostrarValorCliente");
    //Contar si existe Productos.
    var table_a = document.getElementById("tabla_producto_seleccionado_cliente");
    var tbody_a = table_a.tBodies[0].rows;
    //
    if (tbody_a.length > 0) {
        let div_pagar = document.getElementById("div_pago_cliente")
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
    }else{
        Swal.fire({
            icon: "error",
            title: "No existen Productos",
        });
    }
}
// Función para esconder las cuotas cuando se selecciona DEBITO.
function debito_panel_cliente(e){
    let ocultar_cuotas = document.getElementById("credit")
    ocultar_cuotas.style.display = "none"
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/edit_client/',{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Recibimos el OBJETO que enviamos desde DJANGO.
        const datos_cliente= response.data.final_array;
        let dato_cliente = document.getElementById("id_cliente")
        dato_cliente.value = datos_cliente[0]["id_cliente"]
        let datos_nombre = document.getElementById("nombre_panel_cliente")
        datos_nombre.value = datos_cliente[0]["nombre"]
        datos_nombre.setAttribute("readonly", "readonly");
        datos_nombre.readOnly = true
        let datos_a_paterno = document.getElementById("ap_paterno_panel_cliente")
        datos_a_paterno.value = datos_cliente[0]["a_paterno"]
        datos_a_paterno.setAttribute("readonly", "readonly");
        datos_a_paterno.readOnly = true
        let datos_a_materno = document.getElementById("ap_materno_panel_cliente")
        datos_a_materno.value = datos_cliente[0]["a_materno"]
        datos_a_materno.setAttribute("readonly", "readonly");
        datos_a_materno.readOnly = true
        // Comuna
        let datos_comuna = document.getElementById("cliente_panel_comuna")
        datos_comuna.disabled = true;
        let datos_option = datos_comuna.querySelector("option")
        //edit_comuna.remove(option)
        datos_option.value = datos_cliente[0]["comuna"]
        datos_option.innerText = datos_cliente[0]["comuna"]
        // Select dinámico, esta es la manera de recorrer el select y obtener el valorInput.
        let datos_region = document.getElementById("cliente_panel_region")
        datos_region.disabled = true;
        // Iterar sobre las opciones del select
        for (let i = 0; i < datos_region.options.length; i++) {
            let option = datos_region.options[i];
            // Verificar si el texto de la opción es "Valparaiso"
            if (option.text === datos_cliente[0]["region"]) {
                // Seleccionar la opción
                option.selected = true;
                break;
            }
        }
        datos_comuna.addEventListener("click", function (e) {
            console.log(this.className); // logs the className of my_element
            console.log(e.currentTarget === this); // logs `true`
        });
        let datos_lugar_entrega = document.getElementsByName("panel_cliente_tipo_propiedad")
        datos_lugar_entrega.forEach(radio => {
            radio.disabled = true;
            if (radio.value === datos_cliente[0]["entrega"]) {
                    radio.checked = true;
                }
            });
        let datos_direccion = document.getElementById("direccion_panel_cliente")
        datos_direccion.value = datos_cliente[0]["direccion"]
        datos_direccion.setAttribute("readonly", "readonly");
        datos_direccion.readOnly = true
        let datos_telefono = document.getElementById("panel_cliente_telefono")
        datos_telefono.value = datos_cliente[0]["telefono"]
        datos_telefono.setAttribute("readonly", "readonly");
        datos_telefono.readOnly = true
        let datos_email = document.getElementById("email_panel_cliente")
        datos_email.value = datos_cliente[0]["email"]
        datos_email.setAttribute("readonly", "readonly");
        datos_email.readOnly = true
    });
    let modal_form_productos_panel_cliente = document.getElementById("modal_form_productos_panel_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_form_productos_panel_cliente);
    // Abre el modal
    modalInstance.show();
    let pago_debito=document.getElementById("debito_cliente").value
    let input_oculto = document.getElementById("tipo_pago_panel_cliente")
    input_oculto.value = pago_debito
    let credito = document.getElementById("credit_card_cliente")
    credito.style.display = "none";
    //Borrar el el radio button elegido.
    let cuotas = document.getElementsByName("cuota")
    for (var i = 0; i < cuotas.length; i++) {
        cuotas[i].checked = false;
    }
    let mostrarPagar = document.getElementById("mostrarValorCliente").value
    let pagar = document.getElementById("div_pagar_cliente")
    pagar.innerText = "Total a Pagar: $"+mostrarPagar+" clp.";
}
// Mostrar los descuento en el Panel de Clientes.
function oferta_panel_cliente_descuento(e){
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/descuento_panel_client/',{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Recibimos el OBJETO que enviamos desde DJANGO.
        const descuento= response.data.descuento;
        // Inicializamos DataTables con los datos recibidos.
        var table = $('#table_descuento_oferta_cliente').DataTable({
            responsive: true,
            // Pasamos el valor que viene directamente desde DJANGO.
            data: descuento,
            columns: [
                { title: 'ID Descuento', data: 'id', defaultContent: '' },
                {
                    title: '% Descuento',
                    data: 'descuento',
                    defaultContent: '',
                    render: function(data, type, row) {
                        return data + '%';
                    }
                },
                { title: 'Cod Descuento', data: 'cod_descuento', defaultContent: '' },
                {
                    title: 'Fecha Término',
                    data: 'fecha_termino',
                    defaultContent: '',
                    render: function(data, type, row) {
                        if (type === 'display') {
                            return moment(data).format('DD-MM-YYYY');
                        }
                        return data;
                    }
                },
                {
                    title: 'Nueva Fecha Término',
                    data: 'nueva_fecha_termino',
                    defaultContent: '',
                    render: function(data, type, row) {
                        if (type === 'display') {
                            return moment(data).format('DD-MM-YYYY');
                        }
                        return data;
                    }
                },
            ],
            destroy: true,
            "layout": {
                "top": {
                    "left": "inline",
                    "center": "inline",
                    "right": "inline"
                }
            },
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
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
                "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
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
    });
    let modal_descuento_oferta_cliente = document.getElementById("modal_descuento_oferta_cliente")
    // Crea una instancia del modal de Bootstrap.
    const modalInstance = new bootstrap.Modal(modal_descuento_oferta_cliente);
    // Abre el modal.
    modalInstance.show();
    
}
// Pagar con y sin descuento con validacion en el lado del Backend.
function pagar_descuento_panel_cliente(e){
    //Función para crar subs array de un array principal y separar cada 7 elementos.
    function chunkArray(arr, chunkSize){
        return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
    }
    
    var table_a = document.getElementById("tabla_producto_seleccionado_cliente");
    var tbody_a = table_a.tBodies[0].rows;
    let prod_1
    let prod_2
    let prod2
    let arre = []
    // Debemos obtener los datos del datatables NO OLVIDAR.
    let form_pago_debito_cliente_panel = document.getElementById("form_pago_debito_cliente_panel")
    // Obtenemos la Dirección del cliente.
    let data = new FormData(form_pago_debito_cliente_panel)
    let regiones = document.getElementById("cliente_panel_region").value
    let region = document.getElementById("region_" + regiones)
    let verificar_region = region.getAttribute("data-region")
    data.append('region', verificar_region)
    // Obtenemos la Comuna del cliente.
    let comunas = document.getElementById("cliente_panel_comuna")
    let comuna = comunas.querySelector("option").innerText
    data.append('comuna', comuna)
    // Obtenemos el lugar de Entrega del Cliente.
    const radios = document.querySelectorAll('input[name="panel_cliente_tipo_propiedad"]');
    let selectedValue;
    radios.forEach(radio => {
        if (radio.checked) {
        selectedValue = radio.value;
        }
    });
    data.append('lugar_entrega', selectedValue)
    console.log(selectedValue);
    // Obtenemos el lugar de Entrega del Cliente.
    const radios_cuotas = document.querySelectorAll('input[name="cuota"]');
    let selectedValueCuotas;
    radios_cuotas.forEach(radio => {
        if (radio.checked) {
            selectedValueCuotas = radio.value;
        }
    });
    data.append('numero_cuotas', selectedValueCuotas)
    for (var tbody_productos of tbody_a){
        let id_producto = tbody_productos.getAttribute("data-tr_id")
        if(id_producto == null || id_producto == '' || id_producto == 'null'){
            arre.push(0, 0)
        }else{
            let obtener_nombre = document.getElementById("prod_"+id_producto)
            let nombre = obtener_nombre.getAttribute("data-td_nombre")
            let obtener_cantidad = document.getElementById("valor_cantidad_td_"+id_producto).value
            let obtener_valor_cantidad = document.getElementById("valor_pagar_td_"+id_producto).value
            arre.push(id_producto, obtener_cantidad)
        }
        
    }
    console.warn(arre)
    let prueba = chunkArray(arre, 2)
    data.append('prue', prueba)
    console.log(prueba.length)
    console.warn(prueba)
    data.forEach(element => {
        console.log(element)
    });
    // Selecciona todas las filas (tr) dentro de la tabla
    let filas = table_a.getElementsByTagName("tr");
    let arr = []
    // Itera sobre cada fila
    Array.from(filas).forEach(fila => {
        let tds = document.getElementById("tdID")
        // Selecciona los td dentro de cada fila
        let tdElements = fila.getElementsByTagName("td")
        // Convierte la HTMLCollection a un arreglo y recorre los td
        Array.from(tdElements).forEach(td => {
            arr.push(td.textContent);
        });
    });
    let chunkSize = 7;
    let chunks = chunkArray(arr, chunkSize);
    let array_val = []
    chunks.forEach(function(x) {
        let id_compra = x[0]
        //console.warn(parseInt(id_compra))
        try {
            let valor = document.getElementById("valor_cantidad_td_" + id_compra).getAttribute("data-valorProd")
            array_val.push(parseInt(valor))
        } catch (error) {
            array_val.push(parseInt(0))
        }
    });
    let valor_final = array_val.reduce((anterior, actual) => anterior + actual, 0);
    let mostrarValor = document.getElementById("mostrarValorCliente")
    mostrarValor.value = valor_final
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    Swal.fire({
        title: "¿Deseas Realizar el pago de los productos?",
        text: "Enviar Descuento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00BFFF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, pagar productos"
      }).then((result) => {
        if (result.isConfirmed) {
            // Envío de datos por axios, funcionando perfectamente.
            axios.post('/clientes/compra_debito_panel_cliente/',data,
            {
                //'datos_productos': datos_productos}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token
                }
            })
            .then(response => {
                if (response.status == 200) {
                    Swal.fire({
                        title: "!Compra realizada con éxito!",
                        text: "Su compra está lista, gracias.",
                        icon: "success"
                        })
                        .then((result) => {
                            if (result.value) {
                                window.location.reload(); // Recargar la página
                            }
                        });
                }
            })
            .catch(error => {
                // console.log(error.data);
                // console.log(error.error);
                console.log('Oh No! Error!');  
                console.log(error.response.data.error)
                if (error.response.data.error == 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error en el sistema, refugiese pronto que vamos a morir quemados :(",
                    });
                }
                if (error.response.data.error == 1) {
                    Swal.fire({
                        icon: "error",
                        title: "No se pudo realizar la venta",
                    });
                }
                if (error.response.data.error == 3) {
                    Swal.fire({
                        icon: "error",
                        title: "La cantidad solicitada debe ser menor a la cantidad disponible.",
                    });
                }
                if (error.response.data.error == 5) {
                    Swal.fire({
                        icon: "error",
                        title: "No se puedo realizar la venta",
                    });
                }
                if (error.response.data.error == 6) {
                    Swal.fire({
                        icon: "error",
                        title: "No existen productos",
                    });
                }
                if (error.response.data.error == 7) {
                    Swal.fire({
                        icon: "error",
                        title: "Debe elegir las cuotas",
                    });
                }
            })
        }
    });
}
//
function enviar_cod_panel_cliente(e){
    let valor_productos = document.getElementById("div_pagar_cliente").innerText
    let numero = valor_productos.match(/\d+/);
    let pago = parseInt(numero)
    console.log(pago)
    //Esta función nos ayuda a obtener el valor de la cookie.
    let cod = document.getElementById("cod_descuento_panel_cliente").value
    if (cod == '' || cod == null) {
        Swal.fire({
            icon: "error",
            title: "Ingrese el código",
        });
    }
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/aplicar_descuento_panel_cliente/'+cod,
        {
            //'datos_productos': datos_productos}, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token
            }
        })
        .then(response => {
            console.warn(response.data.descuento)
            let datos = response.data.descuento
            let arr = []
            const hoy = new Date();
            const dia = hoy.getDate();
            const mes = hoy.getMonth() + 1;
            const ano = hoy.getFullYear();
            const fechaFormateada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            console.log(fechaFormateada)
            if (datos["nueva_fecha_termino"] == '' || datos["nueva_fecha_termino"] == null) {
                datos.forEach(element => {
                    let id =  element['id']
                    console.warn(id)
                    let descuento =element['descuento']
                    console.warn(descuento)
                    let cod_descuento = element['cod_descuento']
                    console.warn(cod_descuento)
                    let fecha_termino = element['fecha_termino']
                    console.warn(fecha_termino)
                    // Comparar las fechas
                    if (fecha_termino >= fechaFormateada) {
                        // console.log(`${fecha_termino} es menor o igual a ${fechaFormateada}`);
                        let des = pago * descuento / 100
                        let res_final = pago - des
                        let nuevo_valor_productos = document.getElementById("div_pagar_cliente")
                        nuevo_valor_productos.innerText = 'Descuento aplicado Correctamente, el nuevo valor a pagar es: $'+res_final
                        let cod_descuento_panel_cliente = document.getElementById("cod_descuento_panel_cliente")
                        cod_descuento_panel_cliente.setAttribute("readonly", "readonly")
                        cod_descuento_panel_cliente.readOnly = true
                        let btn_codigo_panel_cliente = document.getElementById("btn_codigo_panel_cliente")
                        btn_codigo_panel_cliente.style.background = "#64FE2E"
                        btn_codigo_panel_cliente.innerText = 'Código Utilizado';
                        btn_codigo_panel_cliente.disabled = true
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "El código ingresado a expirado",
                        });
                    }
                });
            }
            if (response.status == 200) {
                Swal.fire({
                    title: "!Descuento Aplicado Correctamente!",
                    text: "El descuento realizado",
                    icon: "success"
                    });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log("Error Response:", error.response.data);
                console.log("Error Status:", error.response.status);
                console.log("Error Headers:", error.response.headers);
                if (error.response.data && error.response.data.error) {
                    console.log("Error Message:", error.response.data.error);
                    // Manejar el error basado en error.response.data.error
                    if (error.response.data.error === 0) {
                        Swal.fire({
                            icon: "warning",
                            title: "¡Inserta tú código!",
                        });
                    }
                    if (error.response.data.error === 1) {
                        Swal.fire({
                            icon: "warning",
                            title: "¡Código Inválido!",
                        });
                    }
                    if (error.response.data.error === 2) {
                        Swal.fire({
                            icon: "error",
                            title: "La fecha del descuento se encuentra expirada.",
                        });
                    }
                    if (error.response.data.error === 3) {
                        Swal.fire({
                            icon: "error",
                            title: "La fecha del descuento se encuentra expirada.",
                        });
                    }
                    if (error.response.data.error === 4) {
                        Swal.fire({
                            icon: "error",
                            title: "El código ya fue utilizado.",
                        });
                    }
                } else {
                    console.log("Error Message:", "No se proporcionó un mensaje de error");
                }
            } else if (error.request) {
                console.log("Error Request:", error.request);
            } else {
                console.log("Error Message:", error.message);
            }
        console.log("Error Config:", error.config);
    })
    
}
// Función para mostrar los datos cuando se selecciona el tipo de pagos en CUOTAS.
function credito_panel_cliente(e){
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/edit_client/',{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Recibimos el OBJETO que enviamos desde DJANGO.
        const datos_cliente= response.data.final_array;
        let dato_cliente = document.getElementById("id_cliente")
        dato_cliente.value = datos_cliente[0]["id_cliente"]
        let datos_nombre = document.getElementById("nombre_panel_cliente")
        datos_nombre.value = datos_cliente[0]["nombre"]
        datos_nombre.setAttribute("readonly", "readonly");
        datos_nombre.readOnly = true
        let datos_a_paterno = document.getElementById("ap_paterno_panel_cliente")
        datos_a_paterno.value = datos_cliente[0]["a_paterno"]
        datos_a_paterno.setAttribute("readonly", "readonly");
        datos_a_paterno.readOnly = true
        let datos_a_materno = document.getElementById("ap_materno_panel_cliente")
        datos_a_materno.value = datos_cliente[0]["a_materno"]
        datos_a_materno.setAttribute("readonly", "readonly");
        datos_a_materno.readOnly = true
        // Comuna
        let datos_comuna = document.getElementById("cliente_panel_comuna")
        datos_comuna.disabled = true;
        let datos_option = datos_comuna.querySelector("option")
        //edit_comuna.remove(option)
        datos_option.value = datos_cliente[0]["comuna"]
        datos_option.innerText = datos_cliente[0]["comuna"]
        // Select dinámico, esta es la manera de recorrer el select y obtener el valorInput.
        let datos_region = document.getElementById("cliente_panel_region")
        datos_region.disabled = true;
        // Iterar sobre las opciones del select
        for (let i = 0; i < datos_region.options.length; i++) {
            let option = datos_region.options[i];
            // Verificar si el texto de la opción es "Valparaiso"
            if (option.text === datos_cliente[0]["region"]) {
                // Seleccionar la opción
                option.selected = true;
                break;
            }
        }
        datos_comuna.addEventListener("click", function (e) {
            console.log(this.className); // logs the className of my_element
            console.log(e.currentTarget === this); // logs `true`
        });
        let datos_lugar_entrega = document.getElementsByName("panel_cliente_tipo_propiedad")
        datos_lugar_entrega.forEach(radio => {
            radio.disabled = true;
            if (radio.value === datos_cliente[0]["entrega"]) {
                    radio.checked = true;
                }
            });
        let datos_direccion = document.getElementById("direccion_panel_cliente")
        datos_direccion.value = datos_cliente[0]["direccion"]
        datos_direccion.setAttribute("readonly", "readonly");
        datos_direccion.readOnly = true
        let datos_telefono = document.getElementById("panel_cliente_telefono")
        datos_telefono.value = datos_cliente[0]["telefono"]
        datos_telefono.setAttribute("readonly", "readonly");
        datos_telefono.readOnly = true
        let datos_email = document.getElementById("email_panel_cliente")
        datos_email.value = datos_cliente[0]["email"]
        datos_email.setAttribute("readonly", "readonly");
        datos_email.readOnly = true
    });
    let modal_form_productos_panel_cliente = document.getElementById("modal_form_productos_panel_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_form_productos_panel_cliente);
    // Abre el modal
    modalInstance.show();
    let pago_credito=document.getElementById("credit_card_cliente").value
    let input_oculto = document.getElementById("tipo_pago_panel_cliente")
    input_oculto.value = pago_credito
    let credito = document.getElementById("credit_card_cliente")
    credito.style.display = "block";
    let mostrar_cuotas = document.getElementById("credit")
    mostrar_cuotas.style.display = "block";
    let mostrarPagar = document.getElementById("mostrarValorCliente").value
    let pagar = document.getElementById("div_pagar_cliente")
    pagar.innerText = "Total a Pagar: $"+mostrarPagar+" clp.";
}
// Obtener todas las compras realizadas por el usuario cliente desde el panel cliente.
function compra_debito_usuario_cliente_panel(e){
    // Función para formatear la fecha y quede de manera correcta.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    let mostra_panel_cliente_debito = document.getElementById("mostra_panel_cliente_debito")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(mostra_panel_cliente_debito);
    // Abre el modal
    modalInstance.show();
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/lista_compra_cliente_solo_debito/',{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Pasamos toas las compras realizadas por el usuario cliente.
        console.log(response.data.debito)
        // Aplanamos la lista de listas de diccionarios a una sola lista de diccionarios
        var debitoData = response.data.debito.flat();
        console.warn(debitoData)
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#table_compra_cliente_panel_solo_debito').DataTable({
            responsive: true,
            // Pasamos el valor que viene directamente desde DJANGO.
            data: debitoData,
            columns: [
                { title: 'ID', data: 'id', defaultContent: '' },
                {
                    title: 'Monto',
                    data: 'monto_total',
                    defaultContent: '',
                    // Agregamos la función render para formatear el valor
                    render: function(data, type, row) {
                        return '$ ' + data;
                    }
                },
                {
                    title: 'Fecha Compra',
                    data: 'fecha_compra',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                { title: 'Cod Venta', data: 'cod_venta', defaultContent: '' },
            ],
            destroy: true,
            "layout": {
                "top": {
                    "left": "inline",
                    "center": "inline",
                    "right": "inline"
                }
            },
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
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
                "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
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
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
            console.warn(error.response.message)
            if (error.response.data.message == 0) {
                Swal.fire({
                    icon: "error",
                    title: "No pueden quedar campos vacíos",
                });
            }
            
            if (error.response.data.message == 4) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben cohincidir",
                });
            }
            if (error.response.data.message == 5) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener mínimo 8 carácteres",
                });
            }
            if (error.response.data.message == 6) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener almenos un carácter especial",
                });
            }
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
//
function compra_credito_usuario_cliente_panel(e){
    // Función para formatear la fecha y quede de manera correcta.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    //Esta función nos ayuda a obtener el valor de la coockie.
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token
    let mostra_panel_cliente_credito = document.getElementById("mostra_panel_cliente_credito")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(mostra_panel_cliente_credito);
    // Abre el modal
    modalInstance.show();
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/clientes/lista_compra_cliente_solo_credito/',{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        // Pasamos toas las compras realizadas por el usuario cliente.
        console.log(response.data.credito)
        // Aplanamos la lista de listas de diccionarios a una sola lista de diccionarios
        var creditoData = response.data.credito.flat();
        console.warn(creditoData)
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#table_compra_cliente_panel_solo_credito').DataTable({
            responsive: true,
            // Pasamos el valor que viene directamente desde DJANGO.
            data: creditoData,
            columns: [
                { title: 'ID', data: 'id', defaultContent: '' },
                {
                    title: 'Monto Total',
                    data: 'monto_total',
                    defaultContent: '',
                    // Agregamos la función render para formatear el valor
                    render: function(data, type, row) {
                        return '$ ' + data;
                    }
                },
                { title: 'Cant. Cuotas', data: 'cantidad_cuotas', defaultContent: '' },
                {
                    title: 'Monto Cuotas',
                    data: 'monto_cuota',
                    defaultContent: '',
                    // Agregamos la función render para formatear el valor
                    render: function(data, type, row) {
                        return '$ ' + data;
                    }
                },
                {
                    title: 'Fecha Compra',
                    data: 'fecha_compra',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                { title: 'Cod Venta', data: 'cod_venta', defaultContent: '' },
            ],
            destroy: true,
            "layout": {
                "top": {
                    "left": "inline",
                    "center": "inline",
                    "right": "inline"
                }
            },
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5, 10, 50, -1],
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
                "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
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
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
            console.warn(error.response.message)
            if (error.response.data.message == 0) {
                Swal.fire({
                    icon: "error",
                    title: "No pueden quedar campos vacíos",
                });
            }
            
            if (error.response.data.message == 4) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben cohincidir",
                });
            }
            if (error.response.data.message == 5) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener mínimo 8 carácteres",
                });
            }
            if (error.response.data.message == 6) {
                Swal.fire({
                    icon: "error",
                    title: "La password deben tener almenos un carácter especial",
                });
            }
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
