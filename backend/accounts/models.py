from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class CustomUser(User):
    is_host = models.BooleanField(default=False)
    phone = PhoneNumberField(null=True, blank=True, default="")

    class Meta:
        verbose_name = 'CustomUser'
        verbose_name_plural = 'CustomUsers'
