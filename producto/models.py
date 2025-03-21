from django.db import models
import os
from django.contrib.auth.models import User
# Create your models here.
#Creamos un método la cual recibe 2 parámetros, que es la instancia y el archivo que queremos que guarde.
#La instancia, es el objeto Producto.
def upload_to_path(instance, filename):
    # Obtenemos el nombre del producto
    nombre_producto = instance.nombreProducto
    #print(f"nombre_producto: {nombre_producto}")
    # Creamos la ruta dinámica
    directory_path = f"producto/static/imgProductos/{nombre_producto}"
    # Creamos la carpeta si no existe
    full_path = os.path.join("media", directory_path)
    os.makedirs(full_path, exist_ok=True)
    # Retornamos la ruta completa
    return os.path.join(directory_path, filename)

class Producto(models.Model):
    nombreProducto = models.CharField(null=True, max_length=200)
    cantProdDisponible = models.IntegerField(null=True)
    cant_producto_ingresada = models.IntegerField(null=True)
    fecha_ingreso_producto = models.DateTimeField(auto_now_add=True)
    precioProd = models.IntegerField(null=True)
    ruta_img_1 = models.FileField(upload_to=upload_to_path)
    ruta_img_2 = models.FileField(upload_to=upload_to_path)
    ruta_img_3 = models.FileField(upload_to=upload_to_path)
    detalle_producto = models.TextField(null=True)
    #nombre_usuario = models.CharField(null=True, max_length=200)
    fk_usuario_sistema = models.ForeignKey(User, on_delete=models.CASCADE)