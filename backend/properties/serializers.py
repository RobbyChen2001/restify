from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [ 'property_id', 'user', 'location', 'num_guests', 'num_beds', 'num_baths', 'images', 'description', 'amenities', 'available_dates']
