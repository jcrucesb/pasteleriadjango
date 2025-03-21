from django.forms import ModelForm
from .models import Producto

class ProductForm(ModelForm):
    class Meta:
        #Hacemos referencia al modelo que queremos utilizar para crear el formulario.
        model = Producto
        #Seleccionamos los campos que queremos para nuestro nuevo formulario de tareas.
        fields = ['nombreProducto', 'cantProdDisponible', 'cant_producto_ingresada', 'precioProd', 'ruta_img_1', 'ruta_img_2', 'ruta_img_3','detalle_producto']