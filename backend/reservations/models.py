from django.db import models
from properties.models import Property
from accounts.models import CustomUser
# Create your models here.

class Reservation(models.Model):
    
    STATE_CHOICES = [
        ('pending', 'Pending'),
        ('denied', 'Denied'),
        ('expired', 'Expired'),
        ('approved', 'Approved'),
        ('cancelled', 'Cancelled'),
        ('terminated', 'Terminated'),
        ('completed', 'Completed')
    ]
    
    id = models.AutoField(primary_key=True, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservations', db_column='property_id')
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default='pending')
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.user} - {self.property} - {self.state}'