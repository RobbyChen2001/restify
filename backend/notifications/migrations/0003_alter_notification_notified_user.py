# Generated by Django 4.2 on 2023-04-23 02:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('notifications', '0002_rename_user_notification_notified_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='notified_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.customuser'),
        ),
    ]