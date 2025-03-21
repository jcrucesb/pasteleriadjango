from django.contrib import admin
from django.urls import path
#Agregamos las vistas.
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    #
    path('', views.index, name='home'),
    # Ruta Registro.
    path('singup/', views.singup, name='registro'),
    # Loggin.
    path('signin/', views.signin, name='loggin'),
    # Cerrar Sesión.
    path('logout/', views.cerrar_sesion, name="logout"),
    # Ruta Panel Usuarios Clientes.
    path('clientes/panel_usuario_cliente/', views.panel_usuario_cliente, name='panel_cliente'),
    # Ruta Panel Usuarios Clientes.
    path('clientes/edit_client/', views.edit_client, name='edit_client'),
    # Ruta Panel Usuarios Clientes editar cliente.
    path('clientes/edit_form_cliente/', views.edit_form_cliente, name='edit_form_cliente'),
    # Ruta Panel Usuarios Clientes editar cliente.
    path('clientes/lista_compra_cliente/', views.compra_cliente, name='compra_cliente'),
    # Lista de Productos disponibles en el Panel Usuarios Clientes.
    path('clientes/lista_producto_disponible_cliente/', views.listar_productos_panel_cliente, name='listar_productos_panel_cliente'),
    # Lista de Productos disponibles en el Panel Usuarios Clientes.
    path('clientes/descuento_panel_client/', views.descuento_panel_client, name='descuento_panel_client'),
    # Lista de Productos disponibles en el Panel Usuarios Clientes.
    path('clientes/aplicar_descuento_panel_cliente/<str:cod>', views.aplicar_descuento_panel_cliente, name='aplicar_descuento_panel_cliente'),
    # Efectuar la compra por Débito del cliente desde el panel de Clientes.
    path('clientes/compra_debito_panel_cliente/', views.efectuar_compra_panel_cliente_debito, name='efectuar_compra_panel_cliente_debito'),
    # Mostrar solo las compra con Débito del cliente desde el panel de Clientes.
    path('clientes/lista_compra_cliente_solo_debito/', views.lista_compra_cliente_solo_debito, name='lista_compra_cliente_solo_debito'),
    # Mostrar solo las compra con CRÉDITO del cliente desde el panel de Clientes.
    path('clientes/lista_compra_cliente_solo_credito/', views.lista_compra_cliente_solo_credito, name='lista_compra_cliente_solo_credito'),
]