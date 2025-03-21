# Generated by Django 5.1 on 2024-12-31 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Descuentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descuento', models.FloatField(null=True)),
                ('cod_descuento', models.CharField(max_length=200, null=True)),
                ('detalle_descuento', models.TextField(null=True)),
                ('nombre_usuario', models.CharField(max_length=200, null=True)),
                ('fecha_creacion', models.DateField(null=True)),
                ('fecha_termino', models.DateField(null=True)),
                ('nueva_fecha_termino', models.DateField(null=True)),
                ('fecha_modificacion', models.DateField(null=True)),
                ('usuario_actualizado', models.CharField(max_length=200, null=True)),
            ],
        ),
    ]
