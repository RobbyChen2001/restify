# Generated by Django 4.2 on 2023-04-23 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0005_alter_property_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='id',
            new_name='property_id',
        ),
    ]
