from rest_framework import serializers
from .models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'property', 'state', 'check_in_date', 'check_out_date', 'created_at', 'updated_at']
        read_only_fields = ['user', 'property', 'created_at', 'updated_at']
