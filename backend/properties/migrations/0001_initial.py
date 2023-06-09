# Generated by Django 4.2 on 2023-05-20 03:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Property",
            fields=[
                ("property_id", models.AutoField(primary_key=True, serialize=False)),
                ("location", models.CharField(max_length=100)),
                ("num_guests", models.IntegerField()),
                ("num_beds", models.IntegerField()),
                ("num_baths", models.IntegerField()),
                ("images", models.CharField(max_length=200)),
                ("description", models.CharField(max_length=200)),
                ("amenities", models.CharField(max_length=200)),
                ("available_dates", models.DateTimeField(null=True)),
                (
                    "user",
                    models.ForeignKey(
                        default=0,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
