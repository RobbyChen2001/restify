from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class CustomUser(AbstractUser):
    is_host = models.BooleanField(default=False)
    phone = PhoneNumberField(null=True, blank=True, default="")
    profile_picture = models.ImageField(upload_to='user_portfolios')

    class Meta:
        verbose_name = 'CustomUser'
        verbose_name_plural = 'CustomUsers'

