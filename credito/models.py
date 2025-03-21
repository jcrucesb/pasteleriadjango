from django.db import models

# Create your models here.
class Credito(models.Model):
    credito= models.IntegerField(null=True)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    #fk_cuota = models.ForeignKey('cuota.Cuota', on_delete=models.CASCADE)
    fk_venta = models.ForeignKey('venta.Venta',on_delete=models.CASCADE)
    cantidad_cuotas = models.IntegerField(null=True)
    monto_total = models.IntegerField(null=True)
    monto_cuota = models.IntegerField(null=True)
    cod_venta = models.CharField(max_length=255,null=True)