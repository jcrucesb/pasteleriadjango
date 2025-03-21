from django.db import models
# Utilizaremos la librería mencionada para poder registrar a los nuevos usuarios.
# Importamos el model de User que viene en DJANGO.
from django.contrib.auth.models import User

# Create your models here.
class Detalle_descuento(models.Model):
    fk_descuento = models.ForeignKey('descuentos.Descuentos', on_delete=models.CASCADE, related_name='detalle_descuentos')
    fk_user = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_utilizacion_descuento = models.DateTimeField(null=True)