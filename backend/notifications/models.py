from django.db import models
from accounts.models import CustomUser

# Create your models here.

class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    notified_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.CharField(max_length=500)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message