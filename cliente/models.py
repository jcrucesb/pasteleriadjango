from django.db import models
# Utilizaremos la librería mencionada para poder registrar a los nuevos usuarios.
# Importamos el model de User que viene en DJANGO.
from django.contrib.auth.models import User

# Create your models here.
class Cliente(models.Model):
    nombre = models.CharField(null=True, max_length=200)
    a_paterno = models.CharField(null=True, max_length=200)
    a_materno = models.CharField(null=True, max_length=200)
    #sexo = models.CharField(null=True, max_length=1)
    #edad = models.IntegerField(null=True)
    telefono = models.CharField(null=True, max_length=200)
    email = models.CharField(null=True, max_length=200)
    #fk_tipo_usuario_id =  models.OneToOneField('tipo_usuario.TipoUsuario', on_delete=models.CASCADE)
    #Relacionamos la tarea con algún usuario.
    fk_user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    
    def __str__(self):
        #Retornamos de esta clase la propiedad llamada Title.
        #Este es el nombre del Proyecto que aparece en DASHBOARD ADMIN.
        return self.nombre + ' ' + self.a_paterno + self.a_materno
    