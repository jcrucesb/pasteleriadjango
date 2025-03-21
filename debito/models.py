from django.db import models

# Create your models here.
class Debito(models.Model):
    debito = models.IntegerField(null=True)
    fecha_compra =models.DateTimeField(auto_now_add=True)
    monto_total = models.IntegerField(null=True)
    fk_venta = models.ForeignKey('venta.Venta', on_delete=models.CASCADE)
    cod_venta = models.CharField(max_length=255,null=True)