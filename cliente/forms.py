#Utilizado para crear formularios.
from django.forms import ModelForm
#Iportamos los Models.
from .models import Cliente
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model



class RegisterForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Elimina el campo usable_password
        if 'usable_password' in self.fields:
            del self.fields['usable_password']

    class Meta:
        model = get_user_model()
        fields = ["username", "password1", "password2", "email", "last_name", "first_name"]

# class ClienteForms(ModelForm):
#     #Creamos la clase Meta, la cual es para utilizar el import ModelForm.
#     #Clase Meta: Esta es una clase interna dentro de TaskForm que se utiliza para especificar metadatos
#     # del formulario. En este caso, se utiliza para indicar el modelo y los campos que se incluirán 
#     # en el formulario.
#     class Meta:
#         #Hacemos referencia al modelo que queremos utilizar para crear el formulario.
#         model = Cliente
#         #Seleccionamos los campos que queremos para nuestro nuevo formulario de Clientes.
#         fields = ['nombre', 'a_paterno', 'a_materno', 'sexo','edad','telefono','email']