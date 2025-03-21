from django.shortcuts import render, redirect, get_object_or_404
# Editar lasrutas para mostrar la imagen.
from pathlib import Path
# Llamamos este comando para ejecutar un formulario.
# UserCreationForm; SIRVE PARA CREAR UN USUARIO.
# AuthenticationForm; Validar si un usuario existe. (Loguin)
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
# Utilizaremos la librería mencionada para poder registrar a los nuevos usuarios.
# Importamos el modelo de User que viene en DJANGO.
from django.contrib.auth.models import User, Group
# Agregamos el modelo de dirección.
from direccion.models import Direccion
# Agregamos el modelo de Debito.
from debito.models import Debito
# Agregamos el modelo de Credito.
from credito.models import Credito
# Agregamos el modelo de Venta.
from venta.models import Venta
# Agregamos el modelo de Venta.
from producto.models import Producto
# Agregamos el modelo de Descuento.
from descuentos.models import Descuentos
# Agregamos el modelo de Detalle_descuentos.
from detalle_descuento.models import Detalle_descuento
# Utilizamso este import para ver si el usuario tiene session activa, NO verifica si esta bien logueado o no.
#authenticate; Es el que verifica si el usuario existe en la BD.
from django.contrib.auth import login, logout, authenticate, get_user_model
# Creamos una reverse para la respuesta al momento de insertar un nuevo usuario Cliente.
from django.urls import reverse
# Importamos IntegrityError para detectar un error en la BD.
from django.db import IntegrityError
# Agregamos el archivo forms que contiene el nuevo formulario para crear tarease importamos la clase, TaskForm
from .forms import Cliente
#Necesitamos el model para ñistar todas las tareas.
from .models import Cliente
#desde sjango.urils, importamos timezone.
from django.utils import timezone
# Verificamos que el usuario esté correctamente logueado con la import de login_required.
from django.contrib.auth.decorators import login_required
# Utilizamos este formulario, ya que se modificó un campo enespecial.
from .forms import RegisterForm
#No puedan ingresar mediante la url.
from .decorators import grupo_usuario_cliente_required
from datetime import date, datetime
#
from django.http import JsonResponse, HttpResponse
import json
import re
from django.conf import settings
# render_to_string; Sirve para enviar el HTML del correo.-------------------
from django.template.loader import render_to_string 
# Mensaje del E-mail.
from django.core.mail import EmailMessage
#----- Librería para crear PDF -------------------------------------------------
import pdfkit 
#----- Fin Librería para crear PDF ---------------------------------------------
# Crear un código de Venta.
import uuid

# Create your views here.
def index(request):
    productos = Producto.objects.all()
    #print(productos)
    # Cremos un nuevo array.
    producto_ruta_limpia = []
    #
    for producto in productos:
        # Realizamos el tratamiento de las rutas, eliminamos parte del directorio para poder mostrar las impágenes.
        ruta_path1 = Path(str(producto.ruta_img_1))
        ruta_limpia_img1 = str(ruta_path1.relative_to("producto/static"))
        ruta_path2 = Path(str(producto.ruta_img_2))
        ruta_limpia_img2 = str(ruta_path2.relative_to("producto/static"))
        ruta_path3 = Path(str(producto.ruta_img_3))
        ruta_limpia_img3 = str(ruta_path3.relative_to("producto/static"))
        # Recordar que si tenemos problemas al momento de mostrar el producto, se debe a las comillas simples, 
        # se debe verificar.
        print(producto.detalle_producto.replace("'", '"'))
        # ca = "camión"
        # print(ca.replace("'", '"'))
        # Creamos un diccionario mientras recorremos el objeto producto para obterner sus propiedades.
        producto_dic = {
            'id': producto.id,
            'nombreProducto': producto.nombreProducto,
            'cantProdDisponible': producto.cantProdDisponible,
            'precioProd': producto.precioProd,
            'ruta_img_1': ruta_limpia_img1,
            'ruta_img_2': ruta_limpia_img2,
            'ruta_img_3': ruta_limpia_img3,
            'detalle_producto': producto.detalle_producto.replace("'", '"'),
        }
        # Pasamos al array, nuestro nuevo diccionario.
        producto_ruta_limpia.append(producto_dic)
    return render(request, 'listarProductos.html', {
        'productos': producto_ruta_limpia
    })
# 
def singup(request):
    if request.method=='GET':
        return render(request, 'singup.html')
    else:
        try:
            # Si los datos se envían como JSON
            data = json.loads(request.body)
            if isinstance(data, dict):
                # Validación básica para que los campos no estén vacíos.
                if not all([data.get("password_1"), data.get("register_nombre_cliente"), data.get("register_ap_paterno_cliente"), data.get("register_ap_materno_cliente"), data.get("register_email_cliente"),
                            data.get("register_telefono"), data.get("region"), data.get("comuna"), data.get("register_tipo_propiedad"), data.get("register_direccion_cliente")]):
                    return JsonResponse({'message': 3}, safe=False, status=400)
                # Validqación que no exista el correo de usuario en la tabla User de DJANGO.
                email_user = User.objects.filter(email=data.get("register_email_cliente")).first()
                if email_user != None:
                    return JsonResponse({'message': 8}, safe=False, status=400)
                # Validación de la pass sean iguales.
                if data.get("password_1") != data.get("password_2"):
                    return JsonResponse({'message': 4}, safe=False, status=400)
                if int(len(data.get("password_1")) < 8):
                    return JsonResponse({'message': 5}, safe=False, status=400)
                caracteres_especiales = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", ":", "<", ">", "?", ",", ".", "/"]
                if any(caracter in data.get("password_1") for caracter in caracteres_especiales):
                    pass
                else:
                    return JsonResponse({'message': 7}, safe=False, status=400)
                password_1 = data.get("password_1")
                register_name_user = data.get("register_name_user")
                register_nombre_cliente = data.get("register_nombre_cliente")
                last_name = data.get("register_ap_paterno_cliente") + ' ' + data.get("register_ap_materno_cliente")
                register_email_cliente = data.get("register_email_cliente")
                user = User.objects.create_user(
                            username=register_name_user, password=password_1, email=register_email_cliente, last_name=last_name,first_name=register_nombre_cliente)
                # Obtenemos el grupo a la cual queremos destinar al nuevo usuario.
                group = Group.objects.get(name='usuario_cliente')
                #Agregamos al Grupo.
                user.groups.add(group)
                # Guardamos los datos obtenidos en la BD.
                user.save()
                # Registrar Cliente---------------------------------------------------
                register_nombre_cliente = data.get("register_nombre_cliente")
                register_ap_paterno_cliente = data.get("register_ap_paterno_cliente")
                register_ap_materno_cliente = data.get("register_ap_materno_cliente")
                register_telefono = data.get("register_telefono")
                register_email_cliente = data.get("register_email_cliente")
                
                #print(guardar_datos)
                cliente = Cliente(
                    nombre=register_nombre_cliente,
                    a_paterno = register_ap_paterno_cliente,
                    a_materno = register_ap_materno_cliente,
                    telefono = register_telefono,
                    email = register_email_cliente,
                    fk_user = user
                )
                cliente.save()
                # Fin Registrar Cliente---------------------------------------------------
                # Fin Registrar Dirección---------------------------------------------------
                region = data.get("region")
                comuna = data.get("comuna")
                register_tipo_propiedad = data.get("register_tipo_propiedad")
                register_direccion_cliente = data.get("register_direccion_cliente")
                # Dirección
                direccion = Direccion(
                    region = region,
                    comuna = comuna,
                    entrega = register_tipo_propiedad,
                    direccion = register_direccion_cliente,
                    fk_cliente = cliente
                )
                direccion.save()
                # Llamamos el import Loguin para obtener los datos del Usuario.
                login(request, user)
                # Retornamos una resuesta que hace reverse y nos manda al panel de cliente desde JS.
                return JsonResponse({'success': True, 'redirect_url': reverse('panel_cliente')}, safe=False)
        except Exception as err:
            print(f"Unexpected {err=}, {type(err)=}")
            return JsonResponse({'message':1} ,safe=False, status=400)
# Loggin
def signin(request):
    if request.method=='GET':
        return render(request, 'signin.html',{
            'form': AuthenticationForm
        })
    else:
        #User nos devuelve un None si no existe el usuario.
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        #Realizamos la validación del usuario es None.
        if user is None:
            return render(request, 'signin.html', {
                'form': AuthenticationForm,
                'error': 'El Usuario o Password es incorrecta'
            })
        else:
            #ANTES DE REDIRECCIONAR, DEBEMOS GUARDAR LA SESSION.
            login(request, user)
            grupo = User.objects.filter(groups__name='usuario_cliente')
            if user.groups.filter(name='usuario_cliente').exists():
                # El usuario pertenece al grupo 'usuario_cliente'
                return redirect('panel_cliente')
            else:
                # El usuario no pertenece al grupo 'usuario_cliente'
                return redirect('listar_usuarios')

@login_required
@grupo_usuario_cliente_required
#Panel Usuarios Clientes.
def panel_usuario_cliente(request):
    productos = list(Producto.objects.all().values())
    nombre = request.user.first_name
    apellidos = request.user.last_name
    nombre_apellido = nombre + ' ' + apellidos
    print(nombre_apellido)
    for product in productos:
        product['ruta_img_1'] = product['ruta_img_1'].replace('producto', '')
        product['ruta_img_2'] = product['ruta_img_2'].replace('producto', '')
        product['ruta_img_3'] = product['ruta_img_3'].replace('producto', '')
        # Reemplazamos las comilla simple, por comillas dobles, esto debido a que genera
        # problemas cuando se debe mostrar el producto, si el detalle del Producto es en Español, 
        # entonces no hay pronlema.
        product['detalle_producto'] = product['detalle_producto'].replace("'", '"')
    return render(request, 'clientes/panel_cliente.html',{
        'productos':productos,
        'nombre_apellido': nombre_apellido
    })

@login_required 
# Crear Cerrar Sesión. OJO, NOSE PUEDE COLOCAR EL NOMBRE DE logout, PORQUE GENERA CONFLICTO CON EL IMPORT,
# DEBE SER CUALQUIER OTRO NOMBRE.
def cerrar_sesion(request):
    # Llamamos al método que importamos, logout.
    logout(request)
    return redirect('home')

# Editar datos Clientes Panel Clientes Registrados.
def edit_client(request):
    try:
        #Creamos el array deobjeto vacío.
        arr = {}
        user = request.user
        #print(user)
        email_user = request.user.email
        # Esta es la manera de obtener los datos por el email..
        user_data = list(User.objects.filter(email=email_user).values())
        # Recorrimos la lista User para obtener el username y el id del usuario.
        for user in user_data:
            arr.update({'id_user': user['id'], 'user_name': user['username'], 'password': user['password']})
        # Esta es la manera de obtener los datos por el email..
        cliente_data = list(Cliente.objects.filter(email=email_user).values())
        # Recorremos la lista cliente y obtenemos sus datos para pasar al nuevo DICT.
        for cliente in cliente_data:
            arr.update({'id_cliente': cliente['id'], 'nombre': cliente['nombre'], 'a_paterno':cliente['a_paterno'], 'a_materno':cliente['a_materno'], 'telefono':cliente['telefono'], 'email':cliente['email']})
        cliente = cliente_data 
        #print(cliente)
        # Accede al campo 'id' del diccionario
        cliente_id = cliente[-1]
        #print(cliente_id['id'])
        direccion = list(Direccion.objects.filter(fk_cliente_id=cliente_id['id']).values())
        for dir in direccion:
            arr.update({'region': dir['region'], 'comuna': dir['comuna'], 'entrega': dir['entrega'], 'direccion': dir['direccion']})
        
        print(arr)
        # Debemos agregar el array de objeto a un array normal para que NO tenga problemas en el DataTables.
        array = [arr]
        return JsonResponse({'final_array': array} ,safe=False, status=200)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'message':1} ,safe=False, status=400)

# Editar informacion del clientes desde el Panel de Cliente.
def edit_form_cliente(request):
    try:
        if request.method == 'POST':
            if int(len(request.POST.get("edit_password_1")) < 8):
                return JsonResponse({'message': 5}, safe=False, status=400)
            caracteres_especiales = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "{", "}", ":", "<", ">", "?", ",", ".", "/"]
            if any(caracter in request.POST.get("edit_password_1") for caracter in caracteres_especiales):
                pass
            else:
                return JsonResponse({'message': 6}, safe=False, status=400)
            id_cliente = int(request.POST.get('id_cliente'))
            edit_nombre = request.POST.get("edit_register_nombre_cliente")
            edit_register_ap_paterno_cliente = request.POST.get("edit_register_ap_paterno_cliente")
            edit_register_ap_materno_cliente = request.POST.get("edit_register_ap_materno_cliente")
            edit_region = request.POST.get("region")
            #print(edit_region)
            edit_comuna = request.POST.get("comuna")
            #print(edit_comuna)
            print("-------------------------------------------------------------------------------")
            edit_register_direccion_cliente = request.POST.get("edit_register_direccion_cliente")
            edit_register_telefono = request.POST.get("edit_register_telefono")
            edit_register_tipo_propiedad = request.POST.get("edit_register_tipo_propiedad")
            edit_register_email_cliente = request.POST.get("edit_register_email_cliente")
            edit_register_name_user = request.POST.get("edit_register_name_user")
            edit_password_1 = request.POST.get("edit_password_1")
            edit_password_2 = request.POST.get("edit_password_2")
            # Validación de los campos que no se encuentren vacíos.
            if not all([id_cliente, edit_nombre, edit_register_ap_paterno_cliente, edit_register_ap_materno_cliente, edit_region, edit_comuna,
                        edit_register_direccion_cliente, edit_register_telefono, edit_register_tipo_propiedad, edit_register_email_cliente,
                        edit_register_name_user, edit_password_1, edit_password_2]):
                return JsonResponse({'message': 0}, safe=False, status=400)
            if edit_password_1 != edit_password_2:
                return JsonResponse({'message': 4}, safe=False, status=400)
            cliente = Cliente.objects.get(pk=id_cliente)
            cliente.nombre = edit_nombre
            cliente.a_paterno =edit_register_ap_paterno_cliente
            cliente.a_materno = edit_register_ap_materno_cliente
            cliente.telefono = edit_register_telefono
            cliente.email = edit_register_email_cliente
            # Editamos la dirección del cliente.
            direccion = Direccion.objects.get(fk_cliente_id=id_cliente)
            direccion.region = edit_region
            direccion.comuna = edit_comuna
            direccion.entrega = edit_register_tipo_propiedad
            direccion.direccion = edit_register_direccion_cliente
            # Editamos algunos campos del model User.
            user = User.objects.get(pk=cliente.fk_user_id)
            # Crear instancia del modelo
            
            user.username=edit_register_name_user
            user.last_name=edit_register_ap_paterno_cliente + ' ' + edit_register_ap_materno_cliente
            user.first_name= edit_nombre
            user.email=edit_register_email_cliente
            
            # Realizamos la validación de la actualización de datos.
            cliente.save()
            direccion.save()
            user.save()
            # Asegurámos de que la sesión del usuario se mantenga activa
            from django.contrib.auth import update_session_auth_hash
            update_session_auth_hash(request, user)
            # 
            return JsonResponse({'final_array': 1} ,safe=False, status=200)
    except Exception as err:
        print(err)
        return JsonResponse({'message':2} ,safe=False, status=400)

# Listar todos los productos para insertar descuentos desde el panel de Clientes del Sistema.
def listar_productos_panel_cliente(request):
    productos = list(Producto.objects.all().values())
    return JsonResponse({'productos':productos} ,safe=False, status=200)

# Lista de Compras del Cliente. Faltan detalles.
def compra_cliente(request):
    if request.method == 'GET':
        user = request.user
        email = request.user.email
        id = request.user.id
        usuario = User.objects.filter(pk=id).values("id", "email");
        email_cliente = usuario[0]["email"]
        cliente = list(Cliente.objects.filter(email=email_cliente).values("id"));
        # Declaramos el array donde guardaremos los datos de las compras del cliente.
        prod_cl = []
        for cl in cliente:
            venta = list(Venta.objects.filter(fk_cliente_id=cl["id"]).values("fechaVenta", "cantProducto", "total_pagar", "nombre_producto", "numero_venta"));
            for vent in venta:
                #print(vent["fechaVenta"], vent["cantProducto"], vent["total_pagar"], vent["fk_producto_id"])
                producto =list(Producto.objects.filter(nombreProducto=vent["nombre_producto"]).values("id"));
                for prod in producto:
                    prod_cl.append({"fechaVenta": vent["fechaVenta"], "cantProducto":vent["cantProducto"], "total_pagar":vent["total_pagar"], "fk_producto_id":prod["id"], "nombreProducto":vent["nombre_producto"], "num_venta":vent["numero_venta"]})
        return JsonResponse({'producto':prod_cl} ,safe=False, status=200)

#
def descuento_panel_client(request):
    try:
        id_user = request.user.id
        user = request.user
        cliente = list(Cliente.objects.filter(fk_user_id=id_user).values("fk_user_id"))
        detalle_descuento = list(Detalle_descuento.objects.filter(fk_user_id=id_user, fecha_utilizacion_descuento__isnull=True).values("fk_descuento_id", "fecha_utilizacion_descuento"))
        print(detalle_descuento)
        # Inicializa una lista vacía para almacenar todos los descuentos
        descuentos = []
        for detalle_desc in detalle_descuento:
            descuento = list(Descuentos.objects.filter(pk=detalle_desc["fk_descuento_id"]).values("id", "descuento","cod_descuento", "fecha_termino", "nueva_fecha_termino"))
            # Agrega el descuento a la lista
            descuentos.extend(descuento)
        return JsonResponse({'descuento':descuentos} ,safe=False, status=200)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'error':0} ,safe=False, status=200)

#
def aplicar_descuento_panel_cliente(request, cod):
    try:
        if request.method == 'GET':
            id_user = request.user.id
            #print(id_user)
            if cod == '':  # Verificar si el valor es una cadena vacía
                return JsonResponse({'error': 0}, status=400)
                # Manejar el caso en el que el parámetro está vacío
            else:
                #print("El parámetro 'cod' tiene el valor:", cod)
                cliente = Cliente.objects.filter(fk_user_id=id_user).values("id")
                #print(cliente[0]["id"])
                contar_descuento = Descuentos.objects.filter(cod_descuento=cod).values("id", "descuento","cod_descuento", "fecha_termino", "nueva_fecha_termino").count()
                #print(contar_descuento)
                if int(contar_descuento) == 0:
                    return JsonResponse({'error': 1}, status=400)
                descuento = list(Descuentos.objects.filter(cod_descuento=cod).values("id", "descuento","cod_descuento", "fecha_termino", "nueva_fecha_termino"))
                # Obtener la fecha actual
                fecha_actual = date.today()
                # Convertir la cadena de fecha a un objeto date
                fecha_termino_str = str(descuento[0]["fecha_termino"])
                fecha_termino = datetime.strptime(fecha_termino_str, "%Y-%m-%d").date()
                if descuento[0]["nueva_fecha_termino"] is None:
                    try:
                        if fecha_termino >= fecha_actual:
                            detalle_descu_1 = Detalle_descuento.objects.filter(fk_descuento_id=descuento[0]["id"], fk_user_id=id_user).values("id", "fecha_utilizacion_descuento")
                            detalle_descuento_2 = Detalle_descuento.objects.get(pk=detalle_descu_1[0]["id"])
                            if detalle_descuento_2.fecha_utilizacion_descuento is None:
                                detalle_descuento_2.fecha_utilizacion_descuento = fecha_actual
                                #detalle_descuento_2.save()
                                return JsonResponse({'descuento': descuento}, status=200)
                            else:
                                return JsonResponse({'error': 4}, status=400)
                        else:
                            return JsonResponse({'error': 2}, status=400)
                    except Exception as err:
                        print(f"Unexpected {err=}, {type(err)=}")
                        return JsonResponse({'error': 3}, status=400)
                if descuento[0]["nueva_fecha_termino"] != None:
                    nueva_fecha = str(descuento[0]["nueva_fecha_termino"])
                    nueva_fecha_2 = datetime.strptime(nueva_fecha, "%Y-%m-%d").date()
                    if nueva_fecha_2 >= fecha_actual:
                        detalle_descu = Detalle_descuento.objects.filter(fk_descuento_id=descuento[0]["id"], fk_user_id=id_user).values("id", "fecha_utilizacion_descuento")
                        detalle_descuento = Detalle_descuento.objects.get(pk=detalle_descu[0]["id"])
                        if detalle_descuento.fecha_utilizacion_descuento is None:
                            detalle_descuento.fecha_utilizacion_descuento = fecha_actual
                            #detalle_descuento.save()
                            return JsonResponse({'descuento': descuento}, status=200)
                        else:
                            return JsonResponse({'error': 4}, status=400)
                    else:
                        return JsonResponse({'error': 2}, status=400)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'error':0} ,safe=False, status=400)
    
#
def efectuar_compra_panel_cliente_debito(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            #print(data)
            producto_solicitados_verificar = data['prue']
            if producto_solicitados_verificar == '0,0' or producto_solicitados_verificar == '':
                return JsonResponse({'error': 6}, status=400)
            id_user = request.user.id
            user = request.user
            tipo_pago_panel_cliente = data['tipo_pago_panel_cliente']
            cuota = data['numero_cuotas']
            nombre_panel_cliente = data['nombre_panel_cliente']
            ap_paterno_panel_cliente = data['ap_paterno_panel_cliente']
            ap_materno_panel_cliente = data['ap_materno_panel_cliente']
            direccion_panel_cliente = data['direccion_panel_cliente']
            panel_cliente_telefono = data['panel_cliente_telefono']
            email_panel_cliente = data['email_panel_cliente']
            cod_descuento_panel_cliente = data['cod_descuento_panel_cliente']
            cliente_panel_region = data['region']
            cliente_panel_comuna = data['comuna']
            panel_cliente_tipo_propiedad = data['lugar_entrega']
            descuento_aplicar = ''
            id_producto = ''
            # Validar que se haya seleccionado las cuotas.
            if tipo_pago_panel_cliente == '1':
                if cuota == 'undefined':
                    return JsonResponse({'error': 7}, status=400)
            guardar_datos = {
                'id_user': id_user,
                'tipo_pago_panel_cliente': tipo_pago_panel_cliente,
                'nombre_panel_cliente': nombre_panel_cliente,
                'ap_paterno_panel_cliente': ap_paterno_panel_cliente,
                'ap_materno_panel_cliente': ap_materno_panel_cliente,
                'direccion_panel_cliente': direccion_panel_cliente,
                'panel_cliente_telefono': panel_cliente_telefono,
                'email_panel_cliente': email_panel_cliente,
                'cod_descuento_panel_cliente': cod_descuento_panel_cliente,
                'cliente_panel_region': cliente_panel_region,
                'cliente_panel_comuna': cliente_panel_comuna,
                'panel_cliente_tipo_propiedad': panel_cliente_tipo_propiedad
            }
            cliente = Cliente(
                nombre=nombre_panel_cliente,
                a_paterno = ap_paterno_panel_cliente,
                a_materno = ap_materno_panel_cliente,
                telefono = panel_cliente_telefono,
                email = email_panel_cliente,
                fk_user_id = id_user,
            )
            cliente.save()
            # Dirección
            direccion = Direccion(
                region = cliente_panel_region,
                comuna = cliente_panel_comuna,
                entrega = panel_cliente_tipo_propiedad,
                direccion = direccion_panel_cliente,
                fk_cliente = cliente
            )
            direccion.save()
            # Parsear la lista de strings JSON
            try:
                prue = data['prue']
                #prue = json.loads(prue)
                #print(type(prue))
                valor_x_cantidad = []
                verificar = []
                # Dividir el string por comas y convertir a enteros
                elements = [int(x) for x in prue.split(',')]
                #print(type(elements))
                # Agrupar los elementos en pares
                pairs = list(zip(elements[::2], elements[1::2]))
                #print(pairs)
                # Array para los id de los productos.
                primeros_elementos = []
                id_prod = []
                nombreProducto = []
                cantProdDisponible =[]
                precio_prod = []
                for t in pairs:
                    # Separa mos los ID de los productos de las cantidad, pero solo mantenemos el id.
                    primeros_elementos.append(t[0])
                    # Separamos la cantidad de los ID de los priductos para realizar la validación más abajo.
                    verificar.append(t[1])
                productos = Producto.objects.filter(pk__in=primeros_elementos).values("id", "nombreProducto", "cantProdDisponible", "precioProd")
                # Inicializa el monto total
                monto_total = 0
                for prod, ver in zip(productos, verificar):
                    id_prod.append(prod["id"])
                    nombreProducto.append(prod["nombreProducto"])
                    cantProdDisponible.append(int(prod["cantProdDisponible"]))
                    precio_prod.append(int(prod["precioProd"]))
                    # Funcionando la validación de todos los productos ingreesado por el cliente.
                    if int(prod["cantProdDisponible"]) < ver:
                        return JsonResponse({'error': 3}, status=400)
                    # Calcula el total por producto y suma al monto total
                    total_por_producto = int(prod["precioProd"]) * ver
                    guardar_datos.update({'total': total_por_producto})
                    monto_total += total_por_producto
                    guardar_datos.update({'monto_total': monto_total})
                    #print(f"Total por producto {prod['id']}: {total_por_producto}")
                    valor_x_cantidad.append(total_por_producto)
                    # Descontar los productos solicitados por el cliente en la BD.
                    descontar_product = int(prod["cantProdDisponible"]) - ver
                    # Actualizar los productos en la tabla Productos.
                    # Obtenemos de productos los id y realizamos el UPDATE a todos los productos solicitados.
                    act_productos = Producto.objects.get(pk=prod["id"])
                    act_productos.cantProdDisponible = descontar_product
                    act_productos.save()
                    #--------------------Prueba de Código de descuento.------------------------------------------------
                    if cod_descuento_panel_cliente != '0':
                        #print(id_user)
                        # Obtenemos el ID del usuario y el ID del descuento que se vá a aplicar.
                        obtener_descuento_usuario = Detalle_descuento.objects.filter(fk_user_id=id_user)
                        # Obtenemos Cod de descuento si existe.
                        descuento = Descuentos.objects.filter(cod_descuento=cod_descuento_panel_cliente).values("id","cod_descuento").count()
                        # print(descuento)
                        # print(type(descuento))
                        if descuento != 0:
                            descuento = Descuentos.objects.filter(cod_descuento=cod_descuento_panel_cliente).values("id","descuento","cod_descuento", "fecha_termino", "nueva_fecha_termino")
                            #print(descuento[0]["nueva_fecha_termino"])
                            # Comparar las fecha actual con la fecha de término del descuento.
                            # Obtener la fecha actual
                            fecha_actual = date.today()
                            #print(descuento[0]["fecha_termino"])
                            # Convertir la cadena de fecha a un objeto date
                            fecha_termino_str = str(descuento[0]["fecha_termino"])
                            fecha_termino = datetime.strptime(fecha_termino_str, "%Y-%m-%d").date()
                            #print(fecha_termino)
                            if descuento[0]["nueva_fecha_termino"] is None:
                                try:
                                    # Funcionando aplicando descuento.
                                    if fecha_termino >= fecha_actual:
                                        print("Entramos 0")
                                        # Falta Realizar la validacion si el usuario ya utilizó el descuento.
                                        # Obtenemos el dato de detalles de descuento.
                                        det_des_utilizado = Detalle_descuento.objects.filter(fk_descuento_id=descuento[0]["id"],fk_user_id=id_user).values("id","fecha_utilizacion_descuento")
                                        print(det_des_utilizado[0]["fecha_utilizacion_descuento"])
                                        print("Entramos 1")
                                        if det_des_utilizado[0]["fecha_utilizacion_descuento"] is None:
                                            print("Entramos 2")
                                            aplicar_descuento = descuento[0]['descuento'] * guardar_datos.get('monto_total') / 100
                                            descuento_aplicado = guardar_datos.get('monto_total') - aplicar_descuento
                                            guardar_datos.update({'monto_total': int(descuento_aplicado)})
                                            fecha_utilizacion_desc = Detalle_descuento.objects.get(pk=det_des_utilizado[0]["id"])
                                            fecha_utilizacion_desc.fecha_utilizacion_descuento = fecha_actual
                                            fecha_utilizacion_desc.save()
                                    else:
                                        pass
                                except Exception as err:
                                    print(f"Unexpected {err=}, {type(err)=}")
                                    return JsonResponse({'error': 3}, status=400)
                            if descuento[0]["nueva_fecha_termino"] != None:
                                print("3")
                                print("Es acá")
                                det_des_utilizado = Detalle_descuento.objects.filter(fk_descuento_id=descuento[0]["id"],fk_user_id=id_user).values("id","fecha_utilizacion_descuento")
                                print(det_des_utilizado[0]["fecha_utilizacion_descuento"])
                                # Fecha si existe una nueva fecha de término del descuento.
                                nueva_fecha_termino_str = str(descuento[0]["nueva_fecha_termino"])
                                nueva_fecha_termino = datetime.strptime(nueva_fecha_termino_str, "%Y-%m-%d").date()
                                try:
                                    # Funcionando aplicando descuento.
                                    if nueva_fecha_termino >= fecha_actual:
                                        if det_des_utilizado[0]["fecha_utilizacion_descuento"] is None:
                                            aplicar_descuento = descuento[0]['descuento'] * guardar_datos.get('monto_total') / 100
                                            descuento_aplicado = guardar_datos.get('monto_total') - aplicar_descuento
                                            guardar_datos.update({'monto_total': int(descuento_aplicado)})
                                            fecha_utilizacion_desc = Detalle_descuento.objects.get(pk=det_des_utilizado[0]["id"])
                                            fecha_utilizacion_desc.fecha_utilizacion_descuento = fecha_actual
                                            fecha_utilizacion_desc.save()
                                    else:
                                        pass
                                except Exception as err:
                                    print(f"Unexpected {err=}, {type(err)=}")
                                    return JsonResponse({'error': 3}, status=400)
                    #--------------------------------------------------------------------------------------------------
                #print(valor_x_cantidad)
                try:
                    compra_clinte = {}
                    products = []
                    cuota_cliente = []
                    # Creamos el cod de ventas.
                    nuevo_uuid = uuid.uuid4()
                    # Funcionando a la perfección.
                    # Itera sobre los IDs de los productos y crea las ventas con sus respectivos totales.
                    for id, total, prod in zip(primeros_elementos, valor_x_cantidad, productos):
                        venta = Venta(
                            cantProducto=int(verificar[primeros_elementos.index(id)]),
                            fk_cliente=cliente,
                            nombre_producto=prod["nombreProducto"],
                            total_pagar=total,
                            numero_venta = nuevo_uuid
                        )
                        venta.save()
                    #print(valor_x_cantidad)
                    #
                    ven = Venta.objects.filter(pk=venta.id).values("numero_venta")
                    if tipo_pago_panel_cliente == '0':
                        # Debito
                        debito = Debito(
                            debito = int(tipo_pago_panel_cliente),
                            monto_total = monto_total,
                            fk_venta_id = venta.id,
                            cod_venta=nuevo_uuid
                        )
                        debito.save()
                        total_pagar_productos = Venta.objects.filter(fk_cliente_id = cliente.id).values("total_pagar")
                        #
                        productos_cliente = Venta.objects.filter(fk_cliente_id = cliente.id)
                        ids_de_ventas = [venta.id for venta in productos_cliente]
                        print("--1")
                        # Obtener los nombres de los productos asociados a estas ventas
                        producto_ids = productos_cliente.values_list('id', flat=True)
                        # Obtener los productos correspondientes
                        #productos = Producto.objects.filter(pk__in=producto_ids).values("nombreProducto")
                        #nombres_productos = [producto['nombreProducto'] for producto in productos]
                        # Extraer solo los valores de total_pagar para agregarlo al array de objeto.
                        total_pagar_values = [total['total_pagar'] for total in total_pagar_productos]
                     
                        for prod_cl, nomProd,ver,total in zip(producto_ids, nombreProducto,verificar, total_pagar_values):
                            products.append({
                                'prod_cl': prod_cl,
                                'nombre_prod': nomProd,
                                'ver': ver,
                                'total': total,
                            })
                        subject = "Correo de Verificación de Compras"
                        print(nuevo_uuid)
                        guardar_datos.update({'cod_venta': nuevo_uuid})
                        
                        # Crearemos el envío de correos.
                        template = render_to_string("clientes\correo_compra_panel_cliente\correo_panel_cliente.html",{
                            'guardar_datos': guardar_datos,
                            'datos_compra': products,
                            'cuota_cliente': cuota_cliente
                        })
                        # Generación del nombre de archivo único
                        now = datetime.now()
                        filename = f"Boleta_Compra_{nombre_panel_cliente}_{ap_paterno_panel_cliente}_{ap_materno_panel_cliente}_{now.strftime('%Y-%m-%d_%H-%M-%S')}.pdf"
                        # Creación del PDF.
                        # Configuración de pdfkit
                        config = pdfkit.configuration(wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
                        options = {'enable-local-file-access': None}
                        # Generar el PDF
                        # template; Pertenece 
                        pdf = pdfkit.from_string(template, f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}", configuration=config, options=options)
                        # Envío del mensaje. Debemos pasar el template.
                        emailSender = EmailMessage(
                            subject, 
                            template,
                            settings.EMAIL_HOST_USER,
                            ["matiasfamilycrew@gmail.com"],
                        )
                        # print("Creacion del correo ")
                        # Formato del mensaje en HTML.
                        emailSender.content_subtype = "html"
                        emailSender.fail_silently = False
                        # # Agregamos el PDF que hemos creado como adjunto al correo.
                        emailSender.attach_file(f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}")
                        # Enviamos el correo.
                        emailSender.send()
                        return JsonResponse({'success': 1}, status=200)
                    if tipo_pago_panel_cliente == '1':
                        # Realizamos la división de las cuotas.
                        monto_x_cuota = guardar_datos.get('monto_total') / int(cuota)
                        #print(monto_x_cuota)
                        # Debito
                        credito = Credito(
                            credito = int(tipo_pago_panel_cliente),
                            cantidad_cuotas = int(cuota),
                            monto_total = guardar_datos.get('monto_total'),
                            monto_cuota = monto_x_cuota,
                            fk_venta_id = venta.id,
                            cod_venta = nuevo_uuid
                        )
                        credito.save()
                        #
                        total_pagar_productos = Venta.objects.filter(fk_cliente_id = cliente.id).values("total_pagar")
                        #
                        productos_cliente = Venta.objects.filter(fk_cliente_id = cliente.id)
                        last_productos_cliente = Venta.objects.filter(fk_cliente_id = cliente.id).last()
                        ids_de_ventas = [venta.id for venta in productos_cliente]
                        # Obtener los ID de los productos asociados a estas ventas
                        producto_ids = productos_cliente.values_list('id', flat=True)
                        # Obtener los productos correspondientes
                        #productos = Producto.objects.filter(pk__in=producto_ids).values("nombreProducto")
                        #nombres_productos = [producto['nombreProducto'] for producto in productos]
                        # Extraer solo los valores de total_pagar para agregarlo al array de objeto.
                        total_pagar_values = [total['total_pagar'] for total in total_pagar_productos]
                        #
                        obtener_credito = Credito.objects.filter(fk_venta_id=last_productos_cliente).first()
                        #ids_de_ventas = [venta.id for venta in productos_cliente]
                        #obtener_credito = Credito.objects.filter(fk_venta_id__in=ids_de_ventas)
                        cuota_cliente.append({'monto_total':obtener_credito.monto_total,
                                              'cantidad_cuotas': obtener_credito.cantidad_cuotas,
                                              'monto_cuota': obtener_credito.monto_cuota
                                             })
                        for prod_cl, nombre_prod, ver,total in zip(producto_ids, nombreProducto, verificar, total_pagar_values):
                            products.append({
                                'prod_cl': prod_cl,
                                'nombre_prod': nombre_prod,
                                'ver': ver,
                                'total': total,
                            })
                        subject = "Correo de Verificación de Compras"
                        guardar_datos.update({'cod_venta': nuevo_uuid})
                        # Crearemos el envío de correos.
                        template = render_to_string("clientes\correo_compra_panel_cliente\correo_panel_cliente.html",{
                            'guardar_datos': guardar_datos,
                            'datos_compra': products,
                            'cuota_cliente': cuota_cliente
                        })
                        # Generación del nombre de archivo único
                        now = datetime.now()
                        filename = f"Boleta_Compra_{nombre_panel_cliente}_{ap_paterno_panel_cliente}_{ap_materno_panel_cliente}_{now.strftime('%Y-%m-%d_%H-%M-%S')}.pdf"
                        # Creación del PDF.
                        # Configuración de pdfkit
                        config = pdfkit.configuration(wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
                        options = {'enable-local-file-access': None}
                        # Generar el PDF
                        # template; Pertenece 
                        pdf = pdfkit.from_string(template, f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}", configuration=config, options=options)
                        # Envío del mensaje. Debemos pasar el template.
                        emailSender = EmailMessage(
                            subject, 
                            template,
                            settings.EMAIL_HOST_USER,
                            ["matiasfamilycrew@gmail.com"],
                        )
                        # print("Creacion del correo ")
                        # Formato del mensaje en HTML.
                        emailSender.content_subtype = "html"
                        emailSender.fail_silently = False
                        # # Agregamos el PDF que hemos creado como adjunto al correo.
                        emailSender.attach_file(f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}")
                        # Enviamos el correo.
                        emailSender.send()
                        return JsonResponse({'success': 1}, status=200)
                except Exception as err:
                        print(f"Unexpected {err=}, {type(err)=}")
                        return JsonResponse({'error': 5}, status=400)
            except Exception as err:
                print(f"Unexpected {err=}, {type(err)=}")
                return JsonResponse({'error': 0}, status=400)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'error': 1}, status=400)

#
def lista_compra_cliente_solo_debito(request):
    try:
        # Obtenemos el email del usuario.
        email_user = request.user.email
        # Obtenemos todos los id de las compras.
        cliente = list(Cliente.objects.filter(email=email_user).values("id"))
        todas_compras_debito = []
        for cl in cliente:
            #print(cl["id"])
            venta = Venta.objects.filter(fk_cliente_id = cl["id"]).values("id", "fechaVenta", "cantProducto", "fk_cliente_id", "nombre_producto")
            for vent in venta:
                # Obtenemos todas las compras realizadas con débito.
                debito = list(Debito.objects.filter(fk_venta_id=vent["id"]).values("id", "fecha_compra", "monto_total", "fk_venta_id", "cod_venta"))
                print(debito)
                # Verificamos si el array no está vacío
                if debito:
                    todas_compras_debito.append(debito)
            print(todas_compras_debito)
        return JsonResponse({'debito': todas_compras_debito}, status=200)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'error': 1}, status=400)

#
def lista_compra_cliente_solo_credito(request):
    try:
        # Obtenemos el email del usuario.
        email_user = request.user.email
        # Obtenemos todos los id de las compras.
        cliente = list(Cliente.objects.filter(email=email_user).values("id"))
        todas_compras_credito = []
        for cl in cliente:
            #print(cl["id"])
            venta = Venta.objects.filter(fk_cliente_id = cl["id"]).values("id")
            for vent in venta:
                # Obtenemos todas las compras realizadas con débito.
                credito = list(Credito.objects.filter(fk_venta_id=vent["id"]).values("id", "fecha_compra", "cantidad_cuotas","monto_total", "monto_cuota","fk_venta_id", "cod_venta"))
                #print(credito)
                # Verificamos si el array no está vacío
                if credito:
                    todas_compras_credito.append(credito)
                print(todas_compras_credito)
        return JsonResponse({'credito': todas_compras_credito}, status=200)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'error': 1}, status=400)