# Generated by Django 4.2 on 2023-04-23 13:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0006_rename_id_property_property_id'),
        ('reservations', '0003_alter_reservation_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='property',
            field=models.ForeignKey(db_column='property_id', on_delete=django.db.models.deletion.CASCADE, related_name='reservations', to='properties.property'),
        ),
    ]