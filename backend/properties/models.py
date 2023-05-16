from django.db import models
from accounts.models import CustomUser

# Create your models here.



class Property(models.Model):
    
    #add a foreign key to the user model
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=0)
    property_id = models.AutoField(primary_key=True, null=False)
    location = models.CharField(max_length=100)
    num_guests = models.IntegerField()
    num_beds = models.IntegerField()
    num_baths = models.IntegerField()
    images = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    amenities = models.CharField(max_length=200)
    available_dates = models.DateTimeField(null=True)

    def __str__(self):
        return self.property_id
    

