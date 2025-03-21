from django.db import models

# Create your models here.
class Direccion(models.Model):
    region = models.CharField(null=True, max_length=200)
    comuna = models.CharField(null=True, max_length=200)
    entrega = models.CharField(null=True, max_length=50)
    direccion = models.CharField(null=True, max_length=200)
    fk_cliente =  models.ForeignKey('cliente.Cliente', on_delete=models.CASCADE)