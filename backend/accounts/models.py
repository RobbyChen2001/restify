from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class CustomUser(AbstractUser):
    is_host = models.BooleanField(default=False)
    phone = PhoneNumberField(null=True, blank=True, default="")

    class Meta:
        verbose_name = 'CustomUser'
        verbose_name_plural = 'CustomUsers'


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    portfolio_picture = models.ImageField(upload_to='portfolio_pictures/', null=True, blank=True)

    # Additional fields for user profile

    def __str__(self):
        return self.user.username
