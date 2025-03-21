from django.urls import path
#Agregamos las vistas.
from . import views


urlpatterns = [
    path('productos/', views.listarProducto, name='listar_productos'),
    #Crear Producto.
    path('productos/create_product/', views.create_product, name='create_product'),
    #Crear Producto con AXIOS PAGAR DEBITO.
    path('productos/pagar_debito/', views.pagar_debito_credito),
    #Listar los Usuarios del Sistema.
    path('productos/list_user_sys/', views.listaUsuarios, name='listar_usuarios'),
    #Bloquear a un Usuarios Cliente del Sistema.
    path('productos/block_user/', views.bloquear_usuario),
    #Eliminar a un Usuarios Cliente del Sistema.
    path('productos/delete_client/', views.delete_client),
    #Listar todos los productos en el Panel de Usuarios de sistea.
    path('productos/list_product_sys/', views.listar_producto_usuario_sistema),
    # Editar todos los productos en el Panel de Usuarios de sistema.
    path('productos/edit_product_sys/', views.edita_product),
    # Eliminar productos en el Panel de Usuarios de sistema.
    path('productos/borrar_producto/', views.borrar_producto),
    # Listar Todas Las Compras Realizadas en el Panel de Usuarios de sistema.
    path('productos/list_all_sales/', views.listar_compras_realizadas),
    # Contar el total de compras por clientes con DÉBITO.
    path('productos/count_list_all_sales/', views.compras_totales_debito),
    # Contar el total de compras por clientes con CRÉDITO.
    path('productos/count_list_all_sales_credit/', views.compras_totales_credito),
    # Listar las Ofertas Creadas.
    path('productos/list_offer/', views.listarOferta),
    # Crear los Descuentos.
    path('productos/create_offers/', views.crear_descuento),
    # Editar Descuentos.
    path('productos/edit_discounts/', views.editarDescuento),
    # Eliminar Descuentos.
    path('productos/delete_discounts/', views.eliminarDescuento),
    # Listar las Ofertas Creadas dentro de la fecha de término.
    path('productos/list_offer_client/', views.listarOfertaCliente),
    # Enviar correo al cliente con código de Descuento.
    path('productos/send_email_client_discounts/', views.enviar_correo_descuento),
]