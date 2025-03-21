from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import redirect
from django.contrib.auth import get_user_model, logout

#Obtenemos el modelo de User.
User = get_user_model()
#Decorador para que un cliente NO pueda acceder al Sistema Interno.
def grupo_usuario_sistema_required(view_func):
    # _wrapped_view es la función que se ejecutará en lugar de la vista original. 
    # Esta función toma el objeto request y 
    # cualquier otro argumento (*args y **kwargs) que la vista original esperaría
    def _wrapped_view(request, *args, **kwargs):
        # Aquí se verifica si el usuario actual pertenece al grupo usuario_cliente. 
        # El método filter devuelve un queryset, y el método exists devuelve True 
        # si hay al menos un elemento en el queryset.
        if request.user.groups.filter(name='usuario_cliente').exists():
            logout(request)
            return redirect('loggin')
        else:
            # Redirige a una página si no pertenece al grupo
            return view_func(request, *args, **kwargs)
    # El decorador devuelve la función _wrapped_view, que será la nueva 
    # vista que se ejecutará en lugar de la original.
    return _wrapped_view