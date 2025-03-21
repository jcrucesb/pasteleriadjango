from django.db import models

# Create your models here.
class Descuentos(models.Model):
    descuento = models.FloatField(null=True)
    cod_descuento = models.CharField(null=True, max_length=200)
    detalle_descuento = models.TextField(null=True)
    nombre_usuario = models.CharField(null=True, max_length=200)
    fecha_creacion = models.DateField(null=True)
    fecha_termino = models.DateField(null=True)
    nueva_fecha_termino = models.DateField(null=True)
    fecha_modificacion = models.DateField(null=True)
    usuario_actualizado = models.CharField(null=True, max_length=200)