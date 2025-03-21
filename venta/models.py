from django.db import models

# Create your models here.
class Venta(models.Model):
    fechaVenta = models.DateTimeField(auto_now_add=True)
    cantProducto = models.IntegerField(null=True)
    nombre_producto = models.CharField(max_length=255, null=True)
    fk_cliente = models.ForeignKey('cliente.Cliente', on_delete=models.CASCADE)
    total_pagar = models.IntegerField(null=True)
    numero_venta = models.CharField(max_length=255, null=True)
    # def __str__(self):
    #     pass
        #Retornamos de esta clase la propiedad llamada Title.
        #Este es el nombre del Proyecto que aparece en DASHBOARD ADMIN.
        #return 'Fecha de Venta' + self.fechaVenta + ' y Cantidad de Productos' + self.cantProducto