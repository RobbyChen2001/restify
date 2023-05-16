from django.db import models
from accounts.models import CustomUser
from properties.models import Property
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.

class Comments(models.Model):
    content = models.TextField()
    #TODO bring back when user implemented
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    RATING_CHOICES = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]
    rating = models.IntegerField(choices=RATING_CHOICES)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    @classmethod
    def has_user_commented(cls, property, user):
        return cls.objects.filter(property=property, user=user, reply_to=None).exists()
    def __str__(self):
        return f'{self.user} - {self.property} - {self.content}'
