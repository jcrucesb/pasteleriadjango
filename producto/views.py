from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
# Crear carpeta para las imágenes.
import os
from .models import Producto
from cliente.models import Cliente
from direccion.models import Direccion
from venta.models import Venta
from debito.models import Debito
from credito.models import Credito
from detalle_descuento.models import Detalle_descuento
from descuentos.models import Descuentos
# Importamos el modelo de User que viene en DJANGO.
from django.contrib.auth.models import User, Group
# Agregamos el archivo forms que contiene el nuevo formulario para crear tarease importamos la clase, TaskForm
from .forms import ProductForm
# Editar lasrutas para mostrar la imagen.
from pathlib import Path
import json
# Verificamos que el usuario esté correctamente logueado con la import de login_required.
from django.contrib.auth.decorators import login_required
# No puedan ingresar mediante la url.
from .decorators import grupo_usuario_sistema_required
from datetime import datetime, date
# Eliminar la carpeta que contiene las imágenes de los productos.
import shutil
# Contar elementos de un array.
from numpy import size
# render_to_string; Sirve para enviar el HTML del correo.-------------------
from django.template.loader import render_to_string 
# Mensaje del E-mail.
from django.core.mail import EmailMessage
#
from django.conf import settings
# ------------------------------------------------------------------------------
#----- Librería para crear PDF -------------------------------------------------
import pdfkit 
#----- Fin Librería para crear PDF ---------------------------------------------
from django.db.models import Sum
from django.db import IntegrityError
# Crear un código de Venta.
import uuid

# Create your views here.
# Recordamos que pasamos los productos para el index como página principal, hicimos el cambio con
# def index(request): del objeto o tabla cliente.
def listarProducto(request):
    return render(request, 'index.html')

@login_required 
@grupo_usuario_sistema_required
def create_product(request):
    if request.method == 'POST':
        # Obtenemos al usuario que está realizando el insert de los productos.
        id_user = request.user.id
        user = User.objects.get(pk=id_user)
        # Acceder a los archivos y datos
        nombreProducto = request.POST.get('nombreProducto')
        cantProdDisponible = int(request.POST.get('cantProdDisponible'))
        cant_producto_ingresada = int(request.POST.get('cant_producto_ingresada'))
        precioProd = int(request.POST.get('precioProd'))
        detalle_producto = request.POST.get('detalle_producto')
        # De esta manera se reciben los input files que envíamos a través de AXIOS.
        ruta_img_1 = request.FILES.get('ruta_img_1')
        ruta_img_2 = request.FILES.get('ruta_img_2')
        ruta_img_3 = request.FILES.get('ruta_img_3')
        now = datetime.now()
        # Crear instancia del modelo
        product = Producto(
            nombreProducto=nombreProducto,
            cantProdDisponible=cantProdDisponible,
            cant_producto_ingresada=cant_producto_ingresada,
            precioProd=precioProd,
            detalle_producto=detalle_producto,
            ruta_img_1=ruta_img_1,
            ruta_img_2=ruta_img_2,
            ruta_img_3=ruta_img_3,
            fk_usuario_sistema = user,
        )
        try:
            product.save()
            return JsonResponse({'message': 'Datos recibidos correctamente'}, safe=False, status=200)
        except Exception as err:
            print(f"Unexpected {err=}, {type(err)=}")
            return JsonResponse({'message': 'error'}, safe=False, status=400)
# Prueba para probar el envío del formulario por medio de AXIOS.
#Recibimos los datos perfectamente.

def pagar_debito_credito(request):
    if request.method == 'POST':
        try:
            # Si los datos se envían como JSON
            data = json.loads(request.body)
            if isinstance(data, dict):
                # Datos de las Tortas.
                productosSegmentados = data.get('datos_productos')
                if not productosSegmentados:
                    return JsonResponse({'error': 5}, safe=False, status=400)
                monto_pagar = []
                # Datos del cliente que se encunetra comprando.
                #guardar_datos = data.get('guardar_datos')
                guardar_datos = [dato for dato in data.get('guardar_datos', []) if dato != '']
                #print(guardar_datos)
                if not guardar_datos:
                    # Manejar el caso en el que el array esté vacío
                    return JsonResponse({'error': '1'}, safe=False, status=400)
                if (len(guardar_datos) < 10):
                    return JsonResponse({'error': '1'}, safe=False, status=400)
                # Validamos qiue el correo sea distinto al ingresado por el usuario cliente del sistema.
                email_user = User.objects.filter(email=guardar_datos[5]).count()
                if int(email_user) > 0:
                    return JsonResponse({'error': 3}, safe=False, status=400)
                cliente = Cliente(
                    nombre=guardar_datos[0],
                    a_paterno = guardar_datos[1],
                    a_materno = guardar_datos[2],
                    telefono = guardar_datos[4],
                    email = guardar_datos[5],
                )
                cliente.save()
                # Dirección
                direccion = Direccion(
                    region = guardar_datos[7],
                    comuna = guardar_datos[8],
                    entrega = guardar_datos[6],
                    direccion = guardar_datos[3],
                    fk_cliente = cliente
                )
                direccion.save()
                # Creamos un array para guardar os datos de comnpra y mostrarlos en la tabla del correo.
                arr = []
                cuota_cliente = []
                # Segmentar el array en sublistas de 4 elementos cada una
                productos_segmentados = [productosSegmentados[i:i+3] for i in range(0, len(productosSegmentados), 3)]
                #print("Productos segmentados:", productos_segmentados)
                nuevo_uuid = uuid.uuid4()
                for datos_producto in productos_segmentados:
                    if len(datos_producto) == 3:
                        producto_id = datos_producto
                        #print("producto_id")
                        #print(producto_id)
                        cantidad = datos_producto
                        #print("cantidad")
                        #print(cantidad)
                        precio = datos_producto
                        #print(precio)
                        #print(f"Producto ID: {producto_id[2]}, Cantidad: {cantidad[0]}, Precio: {precio[1]}")
                        producto_instance = Producto.objects.get(pk=producto_id[2])
                        producto = Producto.objects.get(pk=producto_id[2])
                        # Validación Cantidad Producto Solicitado.
                        if int(producto.cantProdDisponible) < int(cantidad[0]):
                            return JsonResponse({'error': '2'}, safe=False, status=400)
                        nombre_producto = producto.nombreProducto
                        monto_pagar.append(precio[1])
                        venta = Venta(
                            cantProducto=cantidad[0],
                            fk_cliente=cliente,
                            nombre_producto=nombre_producto,
                            total_pagar=precio[1],
                            numero_venta = nuevo_uuid,
                        )
                        mostrar_producto = {
                            'id_producto': producto_id[2],
                            'nombreProducto': nombre_producto,
                            'cantidad': cantidad[0],
                            'total_pagar': precio[1],
                        }
                        arr.append(mostrar_producto)
                        venta.save()
                        # Realizamos el descuentos de los productos solicitados por el cliente.
                        # Actualizar la cantidad disponible del producto
                        producto_instance.cantProdDisponible = int(producto_instance.cantProdDisponible) - int(cantidad[0])
                        producto_instance.save()
                        print("Ready")
                    #print(monto_pagar)
                # Sumamos el array que nos trae el valor total de los productos.
                total = sum(int(monto)for monto in monto_pagar)
                # Suponiendo que ya tienes el ID de la venta
                venta_id = venta.id
                # Obtener la instancia de Venta
                venta_instance = Venta.objects.get(id=venta_id)
                if guardar_datos[9] == '0':
                    # Debito
                    debito = Debito(
                        debito = guardar_datos[9],
                        monto_total = total,
                        fk_venta = venta_instance,
                        cod_venta = nuevo_uuid,
                    )
                    debito.save()
                
                if guardar_datos[9] == '1':
                    if len(guardar_datos) < 11:
                        return JsonResponse({'error': 4}, safe=False, status=400)
                    #Monto por cuota.
                    pagar_cuota = total / int(guardar_datos[10])
                    # Debito
                    credito = Credito(
                        credito = guardar_datos[9],
                        cantidad_cuotas = guardar_datos[10],
                        monto_total = total,
                        monto_cuota = pagar_cuota,
                        fk_venta = venta_instance,
                        cod_venta = nuevo_uuid,
                    )
                    credito.save()
                    last_productos_cliente = Venta.objects.filter(fk_cliente_id = cliente).last()
                    obtener_credito = Credito.objects.filter(fk_venta_id=last_productos_cliente).first()
                    cuota_cliente.append({'monto_total':obtener_credito.monto_total,
                                                            'cantidad_cuotas': obtener_credito.cantidad_cuotas,
                                                            'monto_cuota': obtener_credito.monto_cuota
                                                            })
                subject = "Correo de Verificación de Compras"
                # Crearemos una lista para pasar los datos al template de manera correcta y ordenada.
                guardar_datos_dict = {
                    'nombre': guardar_datos[0],
                    'a_paterno':guardar_datos[1],
                    'a_materno':guardar_datos[2],
                    'telefono':guardar_datos[4],
                    'email':guardar_datos[5],
                    'region':guardar_datos[6],
                    'comuna':guardar_datos[7],
                    'entrega':guardar_datos[8],
                    'direccion':guardar_datos[3],
                    'tipo_pago':int(guardar_datos[9]),
                    'total':total,
                    'cod_venta': nuevo_uuid,
                    # Agrega otros campos según sea necesario
                }
                
                # Crearemos el envío de correos.
                template = render_to_string("correos/compra_cliente.html",{
                    'guardar_datos': guardar_datos_dict,
                    'datos_compra': arr,
                    'cuota_cliente':cuota_cliente,
                })
                # Generación del nombre de archivo único
                now = datetime.now()
                filename = f"Boleta_Compra_{guardar_datos[0]}_{guardar_datos[1]}_{guardar_datos[2]}_{now.strftime('%Y-%m-%d_%H-%M-%S')}.pdf"
                # Creación del PDF.
                # Configuración de pdfkit
                config = pdfkit.configuration(wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
                options = {'enable-local-file-access': None}
                # Generar el PDF
                # template; Pertenece 
                pdf = pdfkit.from_string(template, f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}", configuration=config, options=options)
                # Fin Creación PDF.
                # Envío del mensaje. Debemos pasar el template, 
                emailSender = EmailMessage(
                    subject, 
                    template,
                    settings.EMAIL_HOST_USER,
                    ["matiasfamilycrew@gmail.com"],
                    )
                print("Creacion del correo ")
                # Formato del mensaje en HTML.
                emailSender.content_subtype = "html"
                emailSender.fail_silently = False
                # Agregamos el PDF que hemos creado como adjunto al correo.
                emailSender.attach_file(f"C:\\Users\\Plask91\\Documents\\PasteleriaDjango\\Boleta_PDF_CLIENTES\\{filename}")
                # Enviamos el correo.
                emailSender.send()
                #Fin del envío de correos.
                # Respuesta de éxito
                return JsonResponse({'message': 'Datos recibidos correctamente'}, safe=False, status=200)
            else:
                return JsonResponse({'error': 'Los datos enviados no son un diccionario'}, safe=False, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Error al decodificar JSON'}, safe=False, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, safe=False, status=405)

#Sección Usuarios Clientes.
# @login_required 
# @grupo_usuario_sistema_required
# def vista_usuario_cliente(request):
#     return render(request, 'listar_usuarios.html')

@login_required 
@grupo_usuario_sistema_required
#Listar otdos los usuarios clientes del sistema de ventas.
def listaUsuarios(request):
    #users =list(User.objects.all().values('id', 'email', 'username', 'date_joined', 'last_login', 'is_staff', 'is_active'))
    if request.method == 'GET':
        #Obtenemos al usuario logueado para obtenersus datos.
        usuario_logueado = request.user.username
        usuario_email = request.user.email
        # usuario_password = request.user.password
        usuario_nombre = request.user.first_name
        usuario_apellido_paterno = request.user.first_name
        usuario_apellido_materno = request.user.last_name
        usuario = {'usuario':usuario_logueado, 
                   'email':usuario_email,
                #    'password':usuario_password,
                   'usuario_nombre':usuario_nombre,
                   'usuario_apellido_paterno': usuario_apellido_paterno,
                   'usuario_apellido_materno': usuario_apellido_materno}
        users = list(User.objects.exclude(groups__name='usuario_cliente').values('id', 'email', 'username', 'date_joined', 'last_login', 'is_staff', 'is_active'))
    
        grupo = User.objects.all().filter(groups__name='usuario_cliente').values('id', 'email', 'username', 'date_joined', 'last_login', 'is_staff', 'is_active')
        #
        return render(request, 'listar_usuarios.html',{
                'grupos':grupo,
                'users':users,
                'usuario': usuario
            })
    else:
        user = request.user
        #Recibimos los datos para editarlos.
        # Si los datos se envían como JSON
        data = json.loads(request.body)
        if isinstance(data, dict):
            datos_edit = data.get('datos')
            print(datos_edit)
            if datos_edit["password"] == '' or datos_edit["password"] is None or datos_edit["username"] is None or datos_edit["username"] == '' or  datos_edit["email"] is None or datos_edit["email"] == '':
                return JsonResponse({'message': '2'}, safe=False, status=400)
            if 'email' in datos_edit and 'username' in datos_edit and 'password' in datos_edit:
                user.email = datos_edit["email"]
                user.username = datos_edit["username"]
                user.set_password(datos_edit["password"])
            user.save()
            # Asegurámos de que la sesión del usuario se mantenga activa
            from django.contrib.auth import update_session_auth_hash
            update_session_auth_hash(request, user)
            return JsonResponse({'message': '1'}, safe=False, status=200)
        else:
            return JsonResponse({'error': 'Los datos enviados no son un diccionario'}, safe=False, status=400)

# Bloquear a un usuario.
@login_required 
@grupo_usuario_sistema_required
def bloquear_usuario(request):
    #Recibimos los datos para editarlos.
    # Si los datos se envían como JSON
    data = json.loads(request.body)
    if isinstance(data, dict):
        bloquear_id = data.get('id')
        #Para obetener el campo de la BD is_active de un usuario por si id, SE DEBE UTILIZAR EL MÉTODO GET.
        usuario = User.objects.get(pk=bloquear_id)
        if usuario.is_active == True: 
            usuario.is_active = False
            usuario.save()
            return JsonResponse({'message': '0'}, safe=False, status=200)
        if usuario.is_active == False:
            usuario.is_active = True
            usuario.save()
            return JsonResponse({'message': '1'},safe=False, status=200)
    else:
        return JsonResponse({'error': 'Los datos enviados no son un diccionario'}, safe=False, status=400)

@login_required 
@grupo_usuario_sistema_required
def delete_client(request):
    #Recibimos los datos para editarlos.
    # Si los datos se envían como JSON
    data = json.loads(request.body)
    if isinstance(data, dict):
        eliminar_id = data.get('id')
        #Para obetener el campo de la BD is_active de un usuario por si id, SE DEBE UTILIZAR EL MÉTODO GET.
        usuario = User.objects.get(pk=eliminar_id)
        print('Listo')
        usuario.delete()
        return JsonResponse({'delete': 'Cliente Eliminado'}, safe=False, status=200)

#Obtenemos todos los productos para el usuario del sistema.
@login_required 
@grupo_usuario_sistema_required
def listar_producto_usuario_sistema(request):
    if request.method == 'GET':
        producto =list(Producto.objects.all().values('id','nombreProducto', 'cantProdDisponible', 'cant_producto_ingresada', 
                                                     'precioProd', 'detalle_producto', 'ruta_img_1', 'ruta_img_2','ruta_img_3'));
        #print(producto['cantProdDisponible']
        #print('precioProd')
        #print('detalle_producto')
        return JsonResponse({'producto':producto} ,safe=False, status=200)

#Editar Producto
@login_required 
@grupo_usuario_sistema_required
def edita_product(request):
    if request.method == 'POST':
        id_producto = int(request.POST.get('id_producto'))
        # Acceder a los archivos y datos
        edit_nombreProducto = request.POST.get('editar_Producto')
        edit_cantProdDisponible = int(request.POST.get('editar_cantProdDisponible'))
        edit_cant_producto_ingresada = int(request.POST.get('editar_cant_producto_ingresada'))
        edit_precioProd = int(request.POST.get('editar_precioProd'))
        edit_detalle_producto = request.POST.get('editar_detalle_producto')
        # De esta manera se reciben los input files que envíamos a través de AXIOS.
        edit_ruta_img_1 = request.FILES.get('editar_ruta_img_1')
        edit_ruta_img_2 = request.FILES.get('editar_ruta_img_2')
        edit_ruta_img_3 = request.FILES.get('editar_ruta_img_3')
        now = datetime.now()
        producto = Producto.objects.get(pk=id_producto)
        # Crear instancia del modelo
        producto.nombreProducto=edit_nombreProducto
        producto.cantProdDisponible=edit_cantProdDisponible
        producto.cant_producto_ingresada=edit_cant_producto_ingresada
        producto.precioProd=edit_precioProd
        producto.detalle_producto=edit_detalle_producto
        producto.ruta_img_1=edit_ruta_img_1
        producto.ruta_img_2=edit_ruta_img_2
        producto.ruta_img_3=edit_ruta_img_3
        
        try:
            producto.save()
            return JsonResponse({'message': 'Datos recibidos correctamente'}, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'message': 'error'}, safe=False, status=400)

#Eliminar producto de la BD.
@login_required 
@grupo_usuario_sistema_required
def borrar_producto(request):
    data = json.loads(request.body)
    if isinstance(data, dict):
        eliminar_id = data.get('id')
        ruta_imagen =  data.get('ruta_imagen')
        #Para obetener el campo de la BD is_active de un usuario por si id, SE DEBE UTILIZAR EL MÉTODO GET.
        producto = Producto.objects.get(pk=eliminar_id)
        ruta = ruta_imagen
        # Construir la ruta completa usando os.path.join
        # Recordar que debemos obtener la ruta completa donde se encuentra nuestro proyecto.
        base_dir = r"C:\Users\Plask91\Documents\PasteleriaDjango"
        carpeta_a_borrar = os.path.dirname(os.path.join(base_dir, ruta_imagen))

        if os.path.isdir(carpeta_a_borrar):
            try:
                shutil.rmtree(carpeta_a_borrar)
                producto.delete()
                return JsonResponse({'message': f"La carpeta '{carpeta_a_borrar}' ha sido borrada con éxito."}, safe=False, status=200)
            except Exception as e:
                return JsonResponse({'message': f"Error al borrar la carpeta: {e}"}, safe=False, status=400)
        else:
            return JsonResponse({'message': f"La carpeta '{carpeta_a_borrar}' no existe."}, safe=False, status=404)

# Listar todas las compras realizadas.
@login_required 
@grupo_usuario_sistema_required
def listar_compras_realizadas(request):
    try:
        if request.method == 'GET':
            cliente = list(Cliente.objects.all().values("id","nombre", "a_paterno","a_materno"))
            #print(cliente)
            producto = list(Producto.objects.all().values())
            #print(producto)
            ventas = list(Venta.objects.all().values('id', 'fk_cliente__nombre', 'fk_cliente__a_paterno', 'fk_cliente__a_materno', 'nombre_producto', 'fechaVenta','cantProducto', 'total_pagar', 'numero_venta'))
            return JsonResponse({'ventas':ventas} ,safe=False, status=200)
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        return JsonResponse({'message':1} ,safe=False, status=400)

# Listar y Contar las compras.
@login_required 
@grupo_usuario_sistema_required
def compras_totales_debito(request):
    cliente = list(Cliente.objects.all().values("id","nombre", "a_paterno","a_materno"))
    # Obtenemos la cantidad total de productos adquiridos por el cliente.
    debito = list(Debito.objects.all().values('id', 'fecha_compra', 'monto_total', 'cod_venta','fk_venta__id', 'fk_venta__fk_cliente__id','fk_venta__fk_cliente__nombre', 'fk_venta__fk_cliente__a_paterno', 'fk_venta__fk_cliente__a_materno'))
    ventas_por_cliente = Venta.objects.values('fk_cliente__id', 'fk_cliente__nombre', 'fk_cliente__a_paterno', 'fk_cliente__a_materno', 'numero_venta') \
        .annotate(total_cantProducto=Sum('cantProducto')) \
        .order_by('fk_cliente__id')
    # Convertir el queryset a una lista
    ventas_por_cliente_list = list(ventas_por_cliente)
    # Crear un diccionario para mapear el total de productos por cliente
    total_por_cliente = {venta['fk_cliente__id']: venta['total_cantProducto'] for venta in ventas_por_cliente_list}

    # Agregar el total de productos a cada entrada en debito
    for debito_entry in debito:
        cliente_id = debito_entry['fk_venta__fk_cliente__id']
        if cliente_id in total_por_cliente:
            debito_entry['total_cantProducto'] = total_por_cliente[cliente_id]
        else:
            debito_entry['total_cantProducto'] = 0
    return JsonResponse({'debito':debito} ,safe=False, status=200)

# Listar y contar las compras realizadas con CRÉDITO
@login_required 
@grupo_usuario_sistema_required
def compras_totales_credito(request):
    cliente = list(Cliente.objects.all().values("id","nombre", "a_paterno","a_materno"))
    # Obtenemos la cantidad total de productos adquiridos por el cliente.
    credito = list(Credito.objects.all().values('id', 'fecha_compra', 'cantidad_cuotas','monto_total', 'cod_venta','fk_venta__id', 'fk_venta__fk_cliente__id','fk_venta__fk_cliente__nombre', 'fk_venta__fk_cliente__a_paterno', 'fk_venta__fk_cliente__a_materno', 'monto_cuota'))
    ventas_por_cliente = Venta.objects.values('fk_cliente__id', 'fk_cliente__nombre', 'fk_cliente__a_paterno', 'fk_cliente__a_materno') \
        .annotate(total_cantProducto=Sum('cantProducto')) \
        .order_by('fk_cliente__id')
    # Convertir el queryset a una lista
    ventas_por_cliente_list = list(ventas_por_cliente)
    # Crear un diccionario para mapear el total de productos por cliente
    total_por_cliente = {venta['fk_cliente__id']: venta['total_cantProducto'] for venta in ventas_por_cliente_list}

    # Agregar el total de productos a cada entrada en debito
    for credito_entry in credito:
        cliente_id = credito_entry['fk_venta__fk_cliente__id']
        if cliente_id in total_por_cliente:
            credito_entry['total_cantProducto'] = total_por_cliente[cliente_id]
        else:
            credito_entry['total_cantProducto'] = 0
    return JsonResponse({'credito':credito} ,safe=False, status=200)

#
@login_required 
@grupo_usuario_sistema_required
def listarOferta(request):
    if request.method == 'GET':
        descuentos = list(Descuentos.objects.all().values("id","descuento", "cod_descuento", "detalle_descuento","fecha_creacion", "fecha_termino","nombre_usuario", "fecha_modificacion", "usuario_actualizado", "nueva_fecha_termino"))
        return JsonResponse({'descuentos':descuentos} ,safe=False, status=200)

# Crear Ofertas o Descuentos.
@login_required 
@grupo_usuario_sistema_required
def crear_descuento(request):
    try:
        if request.method == 'POST':
            # Obtenemos los nombres del usuario logueado que está creando wl descuento.
            first_name = request.user.first_name
            # Obtenemos el Apellido del usuario logueado que está creando el descuento.
            last_name = request.user.last_name
            nombre_usuario = first_name + ' ' + last_name
            prueba = request.POST
            print(len(prueba))
            descuento = request.POST.get('descuento')
            #print(descuento)
            cod_descuento = request.POST.get('cod_descuento')
            #print(cod_descuento)
            detalle = request.POST.get('detalle')
            #print(detalle)
            fecha_termino = request.POST.get('fecha_termino')
            print(fecha_termino)
            #Día actual
            today = date.today()
            print(today)
            #Fecha actual
            now = datetime.now()
            # Validación básica
            if not all([descuento, cod_descuento, detalle, fecha_termino]):
                return JsonResponse({'message': 'Faltan datos'}, safe=False, status=400)
            else:
                # Insertamos el descuento
                descuentos = Descuentos(
                    descuento = descuento,
                    cod_descuento = cod_descuento,
                    detalle_descuento = detalle,
                    nombre_usuario = nombre_usuario,
                    fecha_creacion = today,
                    fecha_termino = fecha_termino
                )
                #print(descuentos)
                descuentos.save()
            return JsonResponse({'message':0} ,safe=False, status=200)
        else:
            return JsonResponse({'message': 'Faltan datos'}, safe=False, status=400)
    except:
        return JsonResponse({'message':1} ,safe=False, status=400)

# Editar Descuento
@login_required 
@grupo_usuario_sistema_required
def editarDescuento(request):
    if request.method == 'POST':
        try:
            # Obtener los campos del formulario
            campos = request.POST
            # Verificar si hay campos vacíos
            campos_vacios = {key: value for key, value in campos.items() if not value.strip()}
            if campos_vacios:
                print(f"Campos vacíos: {campos_vacios}")
                # Enviamos el error de Campos vacíos.
                return JsonResponse({'error': 'Hay campos vacíos'}, status=400)
            # Obtenemos los nombres del usuario logueado que está creando wl descuento.
            first_name = request.user.first_name
            # Obtenemos el Apellido del usuario logueado que está creando el descuento.
            last_name = request.user.last_name
            nombre_usuario = first_name + ' ' + last_name
            id = int(request.POST.get('id_descuento'))
            descuentos = Descuentos.objects.get(pk=id)
            edit_descuento = request.POST.get('edit_descuento')
            edit_cod_descuento = request.POST.get('edit_cod_descuento')
            edit_detalle = request.POST.get('edit_detalle')
            edit_fecha_termino = request.POST.get('edit_fecha_termino')
            #Día actual
            today = date.today()
            print(today)
            #Fecha actual
            now = datetime.now()
            # Actualizamos los atributos del objeto existente
            descuentos.descuento = request.POST.get('edit_descuento')
            descuentos.cod_descuento = request.POST.get('edit_cod_descuento')
            descuentos.detalle_descuento = request.POST.get('edit_detalle')
            descuentos.usuario_actualizado = nombre_usuario
            descuentos.nueva_fecha_termino = request.POST.get('edit_fecha_termino')
            descuentos.fecha_modificacion = today
            descuentos.save()
            return JsonResponse({'message':0} ,safe=False, status=200)
        except Exception as err:
            return JsonResponse({'message':1} ,safe=False, status=400)

# Eliminar Descuento.
@login_required 
@grupo_usuario_sistema_required
def eliminarDescuento(request):
    try:
        data = json.loads(request.body)
        if isinstance(data, dict):
            print(data)
            id = data.get('id')
            descuento = Descuentos.objects.get(pk=id)
            descuento.delete()
            return JsonResponse({'message':0} ,safe=False, status=200)
    except Exception as err:
            print(f"Unexpected {err=}, {type(err)=}")
            return JsonResponse({'message':1} ,safe=False, status=400)

# Listar las Ofertas para enviarselas al cliente.
def listarOfertaCliente(request):
    #Día actual
    today = date.today()
    print(today)
    descuentos = list(Descuentos.objects.all().values("id","descuento", "cod_descuento", "detalle_descuento","fecha_termino"))
    return JsonResponse({'descuentos':descuentos} ,safe=False, status=200)
        
# Listar las Ofertas para enviarselas al cliente.
def enviar_correo_descuento(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            if isinstance(data, dict):
                # Obtener los campos del formulario
                campos = request.POST
                # Obtenemos los nombres del usuario logueado que está creando wl descuento.
                first_name = request.user.first_name
                # Obtenemos el Apellido del usuario logueado que está creando el descuento.
                id_user = request.user.id
                last_name = request.user.last_name
                nombre_usuario = first_name + ' ' + last_name
                name_usuario = data.get('usuario')
                user = list(User.objects.filter(username=name_usuario).values("id"))
                id_descuento = data.get('id_descuento')
                descuento = data.get('descuento')
                cod_descuento = data.get('cod_descuento')
                desc = {
                    'id_descuento':id_descuento,
                    'descuento':descuento,
                    'cod_descuento':cod_descuento,
                }
                subject = "Correo de Descuento"
                # Generación del nombre de archivo único.
                now = datetime.now()
                # Crearemos el envío de correos.
                template = render_to_string("correos/correo_descuento_cliente.html",{
                    'desc': desc,
                })
                # Envío del mensaje. Debemos pasar el template, 
                emailSender = EmailMessage(
                    subject, 
                    template,
                    settings.EMAIL_HOST_USER,
                    ["matiasfamilycrew@gmail.com"],
                    )
                # Obtenemos el id del cliente.
                descuento = list(Descuentos.objects.filter(pk=id_descuento).values("id"))
                #print(descuento[0]["id"])
                verificar_detalle_desc = Detalle_descuento.objects.filter(fk_user_id=id_user, fk_descuento_id=descuento[0]["id"]).values("id").count()
                #print(verificar_detalle_desc)
                #print("--------------------------------------")
                if int(verificar_detalle_desc) == 0:
                    # Insertamos el descuento en la tabla detalle_descuento.
                    detalle_descuento_sistema = Detalle_descuento(
                        fk_user_id = user[0]['id'],
                        fk_descuento_id = id_descuento,
                    )
                    detalle_descuento_sistema.save()
                else:
                    return JsonResponse({'message': '2'} ,safe=False, status=400)
                print("Creacion del correo ")
                # Formato del mensaje en HTML.
                emailSender.content_subtype = "html"
                emailSender.fail_silently = False
                # Enviamos el correo.
                emailSender.send()
                
                #Fin del envío de correos.
                return JsonResponse({'message':0} ,safe=False, status=200)
        except Exception as err:
            print(f"Unexpected {err=}, {type(err)=}")
            return JsonResponse({'message':1} ,safe=False, status=400)