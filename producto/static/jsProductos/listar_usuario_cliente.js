//
function listarUsuarios(e){
    //window.location.href = "/productos";
    let listar_usuarios_cliente = document.getElementById("listar_usuarios_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_usuarios_cliente);
    // Abre el modal
    modalInstance.show();
    //Inicializamos DataTables con los datos recibidos.
    var table = $('#cliente_datos').DataTable({
        destroy: true,
        "dom": 'Bfrtip',
        "bAutoWidth": true,
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
}
//
function listarUsuariosSistema(e){
    //window.location.href = "/productos";
    let listar_usuarios_sistema = document.getElementById("listar_usuarios_sistema")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_usuarios_sistema);
    // Abre el modal
    modalInstance.show();
    //Inicializamos DataTables con los datos recibidos.
    var table = $('#usuario_datos').DataTable({
        destroy: true,
        "dom": 'Bfrtip',
        "bAutoWidth": true,
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
}
// Funciones para Bloquear a un Usuario Cliente.
function bloquearUsuarioCliente(id) {
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
    const token = getCookie("csrftoken");
    // Envío de datos por axios, funcionando perfectamente.
    axios.post('/productos/block_user/',{'id': id},{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        if (response.data.message == 1) {
            Swal.fire({
                title: "Usuario Desbloqueado!",
                text: "!El usuario fue desbloqueado con éxito¡",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        }
        if (response.data.message == 0) {
            Swal.fire({
                title: "Usuario Bloqueado!",
                text: "!El usuario fue bloqueado con éxito¡",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        }
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
//Función para Eliminar a un Cliente.
function eliminarUsuarioCliente(id, username) {
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
    Swal.fire({
        title: "¿Estás seguro de eliminar al cliente " + username + '?',
        text: "El cliente será eliminado de la base de datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar cliente!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Envío de datos por axios, funcionando perfectamente.
            axios.post('/productos/delete_client/',{'id':id},{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token
                }
            })
            .then(response => {
                if (response.status == 200){
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El usuario ha sido eliminado correctamente",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                    console.log('Error Status:', error.response.status);
                    console.log('Error Headers:', error.response.headers);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                } else {
                    console.log('Error Message:', error.message);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                }
                console.log('Oh No Error!');
                console.log(error)
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar tu archivo.',
                    'error'
                );
            });
        }
    });
}
//Abrir solo el Modal para Editar a la información de un usuarios del sistema, NO clientes.
function formEditarUser(e){
    let datatables_user_system_panel = $('#datos_user_system_panel').DataTable()
    let edit_user_sys = document.getElementById("edit_user_sys")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(edit_user_sys);
    // Abre el modal
    modalInstance.show();
}
//Formulario Para Editar Usuarios del sistema.
function envioForm(id, email, username){
    let modal_usuario_edit_sistem_panel = document.getElementById("modal_usuario_edit_sistem_panel")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_usuario_edit_sistem_panel);
    // Abre el modal
    modalInstance.show();
}
//
function enviar_datos_edit_user_system(id){
    let username = document.getElementById("inputUsername").value
    let email = document.getElementById("inputEmail").value
    let password = document.getElementById("inputPassword").value
    console.log(username)
    console.log(email)
    console.log(password)
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
    const token = getCookie("csrftoken"); // o cualquier otro nombre que Django use para el token.
    let datos = {
        'id': id,
        'email': email,
        'username': username,
        'password': password,
    }
    axios.post('/productos/list_user_sys/',{'datos':datos},{
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        let recibido = response.data.message
        if (recibido == '1') {
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
            if (error.response.status == 400) {
                Swal.fire({
                    title: "Error",
                    text: "No pueden quedar campos vacíos",
                    icon: "error",
                    confirmButtonText: 'Aceptar'
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
//Funciona para abrir modal para Crear Productos.
function modalCrearProducto(e){
    let create_producto_modal = document.getElementById("create_producto_modal")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(create_producto_modal);
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
    axios.get('/productos/list_product_sys/',{
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        console.log(response.data)
        // Recibimos el OBJETO que enviamos desde DJANGO.
        const valoresDelProducto = Object.values(response.data);
        // Recordar que para obtener los valores enviados desde DJANGO en forma de lista, 
        //se debe utilizar; valoresDelProducto[0] que hace mención a la posición donde se 
        //encuntran los valores que necesitamos.
        // console.log(valoresDelProducto[0]);
        //Recorremos los vlores con un ForeAch.
        valoresDelProducto[0].forEach(element => {
            let nombreProducto = element['nombreProducto']
            let cantProdDisponible = element['cantProdDisponible']
            let cant_producto_ingresada = element['cant_producto_ingresada']
            let precioProd = element['precioProd']
            let detalle_producto = element['detalle_producto']
            let ruta_img_1 = element['ruta_img_1']
            let ruta_img_2 = element['ruta_img_2']
            let ruta_img_3 = element['ruta_img_3']
        });
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#producto_datos').DataTable({
            //Pasamos el valor que viene directamente desde DJANGO.
            data: valoresDelProducto[0],
            columns: [
                { title: 'ID', data: 'id', defaultContent: ''  },
                { title: 'Nombre Producto', data: 'nombreProducto', defaultContent: ''  },
                { title: 'Cant. Disponible', data: 'cantProdDisponible', defaultContent: ''  },
                { title: 'Cant. Ingresada', data: 'cant_producto_ingresada', defaultContent: ''  },
                {
                    title: 'Precio',
                    data: 'precioProd',
                    defaultContent: '',
                    render: function(data, type, row, meta) {
                        return '$' + data;
                    }
                },
                { title: 'Detalle', data: 'detalle_producto', defaultContent: ''  },
                {
                    title: 'Imagen 1',
                    data: 'ruta_img_1',
                    defaultContent: '',
                    render: function (data, type, row, meta) {
                        let imagePath = data.replace('producto', '');
                        return `<img src="${imagePath}" width="100" height="100"/>`;
                    }
                },
                {
                    title: 'Imagen 2',
                    data: 'ruta_img_2',
                    defaultContent: '',
                    render: function (data, type, row, meta) {
                        let imagePath = data.replace('producto', '');
                        return `<img src="${imagePath}" width="100" height="100"/>`;
                    }
                },
                {
                    title: 'Imagen 3',
                    data: 'ruta_img_3',
                    defaultContent: '',
                    render: function (data, type, row, meta) {
                        let imagePath = data.replace('producto', '');
                        return `<img src="${imagePath}" width="100" height="100"/>`;
                    }
                },
                //Agregamos los botones para Editar y Eliminar
                {
                    title: 'Acciones',
                    defaultContent: '',
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `
                            <button class="btn btn-sm btn-primary" onclick="editarProducto(${row.id},'${row.nombreProducto}', ${row.cantProdDisponible}, ${row.cant_producto_ingresada}, ${row.precioProd}, '${row.detalle_producto}')">
                                <i class="fa-solid fa-file-pen"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="delete_producto(${row.id}, '${row.nombreProducto}', '${row.ruta_img_1}')">
                                <i class="fa fa-trash"></i> Eliminar
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
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
function abrirModalInsertarProducto(e){
    let insert_producto_modal = document.getElementById("insert_producto_modal")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(insert_producto_modal);
    // Abre el modal
    modalInstance.show();
}
//Función para enviar el formulario de registro de Productos.
function create_product(e){
    let form_productos = document.getElementById('form_productos')
    console.warn(form_productos)
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
    
    form_productos.addEventListener('submit', (event) => {
        event.preventDefault();
        //Realizamos el formData para caprturartodos los inputs del formulario.
        let data = new FormData(form_productos)
        // const nombreProducto = data.get('nombreProducto');
        // const cantProdDisponible = data.get('cantProdDisponible');
        // const cant_producto_ingresada = data.get('cant_producto_ingresada');
        // const precioProd = data.get('precioProd');
        // const ruta_img_1 = data.get('ruta_img_1');
        // const ruta_img_2 = data.get('ruta_img_2');
        // const ruta_img_3 = data.get('ruta_img_3');
        // const detalle_producto = data.get('detalle_producto');

        // Envío de datos por axios, funcionando perfectamente.
        axios.post('/productos/create_product/', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': token
            }
        })
        .then(response => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Correcto!",
                    text: "!Producto agregado con éxito¡",
                    icon: "success"
                  }).then(() => {
                    window.location.reload();
                });
            }
            if (response.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo agregar el producto",
                });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
                Swal.fire({
                    icon: "error",
                    title: "No se puedieron actualizar tus datos",
                });
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
            console.log('Oh No Error!');
            console.log(error)
        });
    })
}
//Función para listar todos los productos Disponibles en el Panel de Usuarios del Sistema.
function editarProducto(id, nombreProducto,cantProdDisponible, cant_producto_ingresada, precioProd, detalle_producto){
    let editar_producto_modal = document.getElementById("editar_producto_modal")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(editar_producto_modal);
    // Abre el modal
    modalInstance.show();

    let id_edit = document.getElementById('id_producto')
    id_edit.value = id
    let edit_nombreProducto = document.getElementById('editar_Producto')
    edit_nombreProducto.value = nombreProducto
    let edit_cantProdDisponible = document.getElementById('editar_cantProdDisponible')
    edit_cantProdDisponible.value = cantProdDisponible
    let edit_cant_producto_ingresada = document.getElementById('editar_cant_producto_ingresada')
    edit_cant_producto_ingresada.value = cant_producto_ingresada
    let edit_precioProd = document.getElementById('editar_precioProd')
    edit_precioProd.value = precioProd
    let edit_detalle_producto = document.getElementById('editar_detalle_producto')
    edit_detalle_producto.value = detalle_producto
}
//
function form_edit_product(e){
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
 
    let form_edit = document.getElementById('form_productos_edit')
    form_edit.addEventListener('submit', (event) => {
        event.preventDefault();
        let data = new FormData(form_edit)
        // Envío de datos por axios, funcionando perfectamente.
        axios.post('/productos/edit_product_sys/', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': token
            }
        })
        .then(response => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Correcto!",
                    text: "!Los datos del producto fueron actualizados con éxito¡",
                    icon: "success"
                  });
            }
            if (response.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "No se puedieron actualizar los datos del producto",
                });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
                Swal.fire({
                    icon: "error",
                    title: "No se puedieron actualizar tus datos",
                });
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
            console.log('Oh No Error!');
            console.log(error)
        });
    })
}
//Función para eliminar un producto.
function delete_producto(id, nombreProducto, ruta_imagen){
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
    Swal.fire({
        title: "¿Estás seguro de eliminar al Producto " + nombreProducto + '?',
        text: "El producto será eliminado de la base de datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar producto!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Envío de datos por axios, funcionando perfectamente.
            axios.post('/productos/borrar_producto/',{'id':id, 'ruta_imagen': ruta_imagen},{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token
                }
            })
            .then(response => {
                if (response.status == 200){
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto ha sido eliminado correctamente",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                    console.log('Error Status:', error.response.status);
                    console.log('Error Headers:', error.response.headers);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                } else {
                    console.log('Error Message:', error.message);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar tu archivo.',
                        'error'
                    );
                }
                console.log('Oh No Error!');
                console.log(error)
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar tu archivo.',
                    'error'
                );
            });
        }
    });
}
// Modal Listar todos las compras realizadas.
function abrir_modal_listar_compras(){
    // Función formatear la fecha.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    let listar_compra = document.getElementById("listar_compra")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_compra);
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
    const token = getCookie("csrftoken");

    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/productos/list_all_sales/',{
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        //console.warn(response.data.response_data.clientes)
        //const userDataCliente = response.data.response_data.clientes;
        //const userDataProducto = response.data.response_data.productos;
        const userDataVenta = response.data.ventas;
        console.log(userDataVenta);
        // Recorrer el array de usuarios para demostrar cómo acceder a los datos.
        // Iterar sobre el array usando forEach
        userDataVenta.forEach(item => {
            console.log(item.id);
            console.log(item.fk_cliente__nombre);
            console.log(item.fk_cliente__a_paterno);
            console.log(item.fk_cliente__a_materno);
            console.log(item.fk_producto__id);
            console.log(item.nombre_producto);
            console.log(item.fechaVenta);
            console.log(item.cantProducto);
            console.log(item.total_pagar);
            
        });
        //var combinedData = userDataCliente.concat(userDataProducto).concat(userDataVenta);
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#tabla_compra').DataTable({
            data: userDataVenta,
            columns: [
                { title: 'ID Venta', data: 'id', defaultContent: '' },
                {
                    title: 'Nombre Completo',
                    data: null,
                    //Realizamos la concatenación para mostrar el nombre completo.
                    render: function(data, type, row) {
                        return row.fk_cliente__nombre + ' ' + row.fk_cliente__a_paterno + ' ' + row.fk_cliente__a_materno;
                    }
                },
                { title: 'Nombre Producto', data: 'nombre_producto', defaultContent: '' },
                {
                    title: 'Fecha Compra',
                    data: 'fechaVenta',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                { title: 'Cant. Producto', data: 'cantProducto', defaultContent: '' },
                { title: 'Total', data: 'total_pagar', defaultContent: '' },
                { title: 'Cod Venta', data: 'numero_venta', defaultContent: '' }
            ],
            destroy: true,
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5,10, 25, 50, -1],
                ['5 Resultados', '10 Resultados', '50 Resultados', 'Mostrar Todos']
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
            // Swal.fire({
            //     icon: "error",
            //     title: "No se puedieron actualizar tus datos",
            // });
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Listar los usuarios con DÉBITO, cantidad de productos, etc.
function abrir_modal_total_compras(e){
    // Función para formatear las fechas.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    let listar_compras_total = document.getElementById("listar_compras_total")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_compras_total);
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
    const token = getCookie("csrftoken");

    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/productos/count_list_all_sales/',{
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        const userDataVenta = response.data.debito;
        console.log(userDataVenta);
        //var combinedData = userDataCliente.concat(userDataProducto).concat(userDataVenta);
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#tabla_compras_realizadas_totales').DataTable({
            data: userDataVenta,
            columns: [
                { title: 'ID Cliente', data: 'fk_venta__fk_cliente__id', defaultContent: '' },
                {
                    title: 'Nombre Completo',
                    data: null,
                    //Realizamos la concatenación para mostrar el nombre completo.
                    render: function(data, type, row) {
                        return row.fk_venta__fk_cliente__nombre + ' ' + row.fk_venta__fk_cliente__a_paterno + ' ' + row.fk_venta__fk_cliente__a_materno;
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
                { title: 'Cant. Productos', data: 'total_cantProducto', defaultContent: '' },
                { title: 'Monto Total', data: 'monto_total', defaultContent: '' },
                { title: '  Cod Venta', data: 'cod_venta', defaultContent: '' },
            ],
            destroy: true,
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5, 10, 25, -1],
                ['5 Resultados', '10 Resultados', '50 Resultados', 'Mostrar Todos']
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
            // Swal.fire({
            //     icon: "error",
            //     title: "No se puedieron actualizar tus datos",
            // });
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Listar los usuarios con CRÉDITO, cantidad de productos, etc.
function abrir_modal_total_compras_credito(e){
    // Función para formatear las fechas.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    let listar_compras_total_credito = document.getElementById("listar_compras_total_credito")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(listar_compras_total_credito);
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
    const token = getCookie("csrftoken");
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/productos/count_list_all_sales_credit/',{
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        const userDataVenta = response.data.credito;
        console.log(userDataVenta);
        //var combinedData = userDataCliente.concat(userDataProducto).concat(userDataVenta);
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#tabla_compras_realizadas_totales_credito').DataTable({
            data: userDataVenta,
            columns: [
                { title: 'ID Cliente', data: 'fk_venta__fk_cliente__id', defaultContent: '' },
                {
                    title: 'Nombre Completo',
                    data: null,
                    //Realizamos la concatenación para mostrar el nombre completo.
                    render: function(data, type, row) {
                        return row.fk_venta__fk_cliente__nombre + ' ' + row.fk_venta__fk_cliente__a_paterno + ' ' + row.fk_venta__fk_cliente__a_materno;
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
                { title: 'Cant. Productos', data: 'total_cantProducto', defaultContent: '' },
                { title: 'Monto Total', data: 'monto_total', defaultContent: '' },
                { title: 'Cant. Cuota', data: 'cantidad_cuotas', defaultContent: '' },
                { title: 'Monto Cuota', data: 'monto_cuota', defaultContent: '' },
                { title: 'Cod Venta', data: 'cod_venta', defaultContent: '' },
            ],
            destroy: true,
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5, 10, 25, 50, -1],
                ['5 Resultados', '10 Resultados', '50 Resultados', 'Mostrar Todos']
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
            // Swal.fire({
            //     icon: "error",
            //     title: "No se puedieron actualizar tus datos",
            // });
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Abrir Modal Crear Oferta.
function abrir_modal_descuento(e){
    // Función para formatear las fechas.
    function formatFecha(isoDate) {
        const fecha = new Date(isoDate);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
    }
    let crear_oferta_modal = document.getElementById("crear_oferta_modal")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(crear_oferta_modal);
    // Abre el modal
    modalInstance.show();
    // Obtener la fecha de hoy en formato YYYY-MM-DD
    var hoy = new Date().toISOString().split('T')[0];
        
    // Establecer el atributo min del input para desactivar fechas anteriores
    document.getElementById("fecha_termino").setAttribute('min', hoy);

    // Realizamos la teición por get en AXIOS.
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
    const token = getCookie("csrftoken");
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/productos/list_offer/',{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        console.warn(response.data.descuentos)
        let descuentos = response.data.descuentos
        //Inicializamos DataTables con los datos recibidos.
        var table = $('#tabla_oferta').DataTable({
            data: descuentos,
            columns: [
                { title: 'ID Descuento', data: 'id', defaultContent: '' },
                { title: 'Descuento', data: 'descuento', defaultContent: '' },
                { title: 'Cod. Descuento', data: 'cod_descuento', defaultContent: '' },
                { title: 'Detalle Descuento', data: 'detalle_descuento', defaultContent: '' },
                {
                    title: 'Fecha Creación',
                    data: 'fecha_creacion',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                {
                    title: 'Fecha Término',
                    data: 'fecha_termino',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return formatFecha(data);
                    }
                },
                { title: 'Nombre Usuario', data: 'nombre_usuario', defaultContent: '' },
                {
                    title: 'Fecha Modificación',
                    data: 'fecha_modificacion',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return data ? formatFecha(data) : 'Null';
                    }
                },
                {
                    title: 'NuevaFecha Término',
                    data: 'nueva_fecha_termino',
                    // Llamamos a la función de las fechas para que nos formateé la fecha de manera correcta.
                    render: function(data, type, row) {
                        return data ? formatFecha(data) : 'Null';
                    }
                },
                { title: 'Último Usuario en Editar', data: 'usuario_actualizado', defaultContent: '' },
                //Agregamos los botones para Editar y Eliminar
                {
                    title: 'Acciones',
                    defaultContent: '',
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `
                            <button class="btn btn-sm btn-primary" onclick="editar_descuento(${row.id},${row.descuento}, '${row.cod_descuento}', '${row.detalle_descuento}', '${row.fecha_termino}')">
                                <i class="fa-solid fa-file-pen"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="delete_descuento(${row.id})">
                                <i class="fa fa-trash"></i> Eliminar
                            </button>
                        `;
                    }
                }
            ],
            destroy: true,
            "dom": 'Bfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "lengthMenu": [
                [5,10, 25, 50, -1],
                ['5 Resultados','10 Resultados', '25 Resultados', '50 Resultados', 'Mostrar Todos']
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
            Swal.fire({
                icon: "error",
                title: "No se puedieron actualizar tus datos",
            });
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Abrir Modal Insertar Descuento.
function abrir_modal_insertar(e){
    let formulario_insertar_oferta = document.getElementById("formulario_insertar_oferta")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(formulario_insertar_oferta);
    // Abre el modal
    modalInstance.show();
}
// Crear Descuentos desde el Panel de Usuarios del Sistema.
function enviar_desc(e){
    let form_desc = document.getElementById("form_desc")
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
    //Realizamos el formData para caprturartodos los inputs del formulario.
    let data = new FormData(form_desc)
    console.warn(data)
    // Envío de datos por axios, funcionando perfectamente.
    axios.post('/productos/create_offers/', data,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        console.warn(response.data)
        if (response.status == 200) {
            Swal.fire({
                title: "Correcto!",
                text: "!Descuento agregado con éxito¡",
                icon: "success"
            }).then((result) => {
                if (result.value) {
                    window.location.reload(); // Recargar la página
                }
            });
        }
        if (response.status == 400) {
            Swal.fire({
                icon: "error",
                title: "No se pudo agregar el descuento",
            });
        }
    })
    .catch(error => {
        if (error.response) {
            console.log('Error Response:', error.response.data);
            console.log('Error Status:', error.response.status);
            console.log('Error Headers:', error.response.headers);
            Swal.fire({
                icon: "error",
                title: "No se puedieron actualizar tus datos",
            });
        } else if (error.request) {
            console.log('Error Request:', error.request);
        } else {
            console.log('Error Message:', error.message);
        }
        console.log('Oh No Error!');
        console.log(error)
    });
}
// Abrir Modal formulario_editar_oferta.
function editar_descuento(id, descuento, cod_descuento, detalle_descuento, fecha_termino){
    let formulario_editar_descuento = document.getElementById("formulario_editar_descuento")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(formulario_editar_descuento);
    // Abre el modal
    modalInstance.show();
    // Obtener la fecha de hoy en formato YYYY-MM-DD
    var hoy = new Date().toISOString().split('T')[0];
        
    // Establecer el atributo min del input para desactivar fechas anteriores
    document.getElementById("edit_fecha_termino").setAttribute('min', hoy);
    let id_descuento = document.getElementById("id_descuento")
    id_descuento.value = id
    let edit_descuento = document.getElementById("edit_descuento")
    edit_descuento.value = descuento
    let edit_cod_descuento = document.getElementById("edit_cod_descuento")
    edit_cod_descuento.value = cod_descuento
    let edit_detalle = document.getElementById("edit_detalle")
    edit_detalle.value = detalle_descuento
    let edit_fecha_termino = document.getElementById("edit_fecha_termino")
    edit_fecha_termino.value = fecha_termino
    var fecha_modifiacion = new Date().toISOString().split('T')[0];
}
//
function enviar_editar_desc(e){
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
    const token = getCookie("csrftoken");
    let form = document.getElementById("form_edit_desc")
    let data = new FormData(form)
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const id_desc = data.get('id_descuento');
        const edit_descuento = data.get('edit_descuento');
        const edit_cod_descuento = data.get('edit_cod_descuento');
        const edit_detalle = data.get('edit_detalle');
        const edit_fecha_termino = data.get('edit_fecha_termino');
        let datos = {
            'id_descuento': id_desc,
            'edit_descuento': edit_descuento,
            'edit_cod_descuento': edit_cod_descuento,
            'edit_detalle': edit_detalle,
            'edit_fecha_termino': edit_fecha_termino
        }
        console.warn(datos)
        // Envío de datos por axios, funcionando perfectamente.
        axios.post('/productos/edit_discounts/', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': token
            }
        })
        .then(response => {
            if (response.status == 200) {
                Swal.fire({
                    title: "Correcto!",
                    text: "!Descuento actulizado con éxito¡",
                    icon: "success"
                  }).then((result) => {
                    if (result.value) {
                        window.location.reload(); // Recargar la página
                    }
                });
            }
            if (response.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo agregar el producto",
                });
            }
            if (response.data.message == 3) {
                Swal.fire({
                    icon: "error",
                    title: "Debe completar todos los campos del formulario",
                });
            }
        })
        .catch(error => {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                console.log('Error Status:', error.response.status);
                console.log('Error Headers:', error.response.headers);
                Swal.fire({
                    icon: "error",
                    title: "No se puedieron actualizar tus datos",
                });
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
            console.log('Oh No Error!');
            console.log(error)
        });
    })    
}
//
function delete_descuento(id){
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
    const token = getCookie("csrftoken");
    Swal.fire({
        title: "¿Deseas Eliminar el Descuento?",
        text: "Eliminar Descuento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00BFFF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar descuento"
      }).then((result) => {
        if (result.isConfirmed) {
            // Envío de datos por axios, funcionando perfectamente.
            axios.post('/productos/delete_discounts/',{'id':id},
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
                        title: "!Descuento Eliminado!",
                        text: "El descuento fue eliminado correctamente",
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
                if (error.response.data.message == '1') {
                    Swal.fire({
                        icon: "error",
                        title: "No se puedo eliminar el descuento",
                    });
                }
            })
        }
    });
}
//Mostrar descuento del Usuario Cliente listarUsuariosSistema.
function descuentos(id, usuario, email){
    let modal_descuento_cliente = document.getElementById("modal_descuento_cliente")
    // Crea una instancia del modal de Bootstrap
    const modalInstance = new bootstrap.Modal(modal_descuento_cliente);
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
    const token = getCookie("csrftoken");
    // Envío de datos por axios, funcionando perfectamente.
    axios.get('/productos/list_offer_client/',{
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-CSRFToken': token
        }
    })
    .then(response => {
        console.warn(response.data.descuentos)
        let descuentos = response.data.descuentos
        var table = $('#tabla_aplicar_descuento_cliente').DataTable({
            data: descuentos,
            columns: [
                { title: 'ID Descuento', data: 'id', defaultContent: '' },
                { title: 'Descuento', data: 'descuento', defaultContent: '' },
                { title: 'Cod. Descuento', data: 'cod_descuento', defaultContent: '' },
                { title: 'Detalle Descuento', data: 'detalle_descuento', defaultContent: '' },
                //Cambiamos el formato de la fecha, recordar que la para cambiar la fecha, se agregó un CDN.
                {
                    title: 'Fecha Término',
                    data: 'fecha_termino',
                    defaultContent: '',
                    render: function (data, type, row, meta) {
                        if (type === 'display' || type === 'filter') {
                            return moment(data).format('DD/MM/YYYY');
                        }
                        return data;
                    }
                },
                //Agregamos los botones para Editar y Eliminar
                {
                    title: 'Acciones',
                    defaultContent: '',
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return `
                            <button type="button" class="btn btn-sm btn-primary" onclick="enviar_descuento_cliente_panel_usario_sistema(${row.id},${row.descuento}, '${row.cod_descuento}', '${row.detalle_descuento}', '${row.fecha_termino}', '${email}', '${usuario}')">
                                <i class="fa-regular fa-paper-plane"></i> Enviar
                            </button>
                        `;
                    }
                }
            ],
            destroy: true,
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
            // Swal.fire({
            //     icon: "error",
            //     title: "No se puedieron actualizar tus datos",
            // });
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
function enviar_descuento_cliente_panel_usario_sistema(id, descuento, cod_descuento, detalle, fecha_termino, email, usuario){
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
    const token = getCookie("csrftoken");
    let correo = {
        'id_descuento': id,
        'descuento': descuento,
        'cod_descuento': cod_descuento,
        'detalle': detalle,
        'fecha_termino': fecha_termino,
        'email': email,
        'usuario': usuario,
    }
    Swal.fire({
        title: "¿Deseas Enviar al cliente de email, " + email + " el descuento?",
        text: "Enviar Descuento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00BFFF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, enviar descuento"
      }).then((result) => {
        if (result.isConfirmed) {
            // Envío de datos por axios, funcionando perfectamente.
            axios.post('/productos/send_email_client_discounts/',correo,
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
                        title: "!Descuento Enviado Correctamente!",
                        text: "El descuento fue enviado correctamente",
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
                if (error.response.data.message == '1') {
                    Swal.fire({
                        icon: "error",
                        title: "No se puedo enviar el correo",
                    });
                }
                if (error.response.data.message == '2') {
                    Swal.fire({
                        icon: "error",
                        title: "El cliente ya fué notificado con el descuento",
                    });
                }
            })
        }
    });
}
