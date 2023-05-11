from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Reservation
from .serializers import ReservationSerializer
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework import generics, permissions, serializers
from properties.models import Property
from notifications.models import Notification

# Create your views here.

class ReservationListView(generics.ListAPIView):
    serializer_class = ReservationSerializer
    pagination_class = PageNumberPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Reservation.objects.all()
        
        # filter by user type
        # if user is a host then show all reservations for their properties, so all the properties in the reservation table that property.user = user
        if self.request.user.is_host:
            queryset = queryset.filter(property__user=self.request.user)
        elif self.request.user.is_guest:
            queryset = queryset.filter(user=self.request.user)
            
        user = self.request.user
        if user.is_authenticated:
            properties_owned = Property.objects.filter(user=user)            
            reservations_for_properties_owned = Reservation.objects.filter(property__in=properties_owned)
            reservations_for_user = Reservation.objects.filter(user=user)
            queryset = (reservations_for_properties_owned | reservations_for_user).distinct()
            
        
        # filter by status
        status = self.request.query_params.get('status', None)
        if status is not None:
            queryset = queryset.filter(status=status)
        
        return queryset

class ReserveView(generics.CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user.customuser
        property_id = self.kwargs['property_id']
        check_in_date = self.request.data.get('check_in_date')
        check_out_date = self.request.data.get('check_out_date')
        
        property_instance = get_object_or_404(Property, property_id=property_id)
        if property_instance.user == user:
            raise serializers.ValidationError("You cannot make a reservation on your own property.")
        serializer.save(user=user, property=property_instance, check_in_date=check_in_date, check_out_date=check_out_date)

        Notification.objects.create(
            notified_user=property_instance.user,
            message=f"A new reservation at property {property_instance.location} has been requested."
        )

class CancelReservationView(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    

    def perform_destroy(self, instance):
        
        reservation = self.get_object()
        property_instance = reservation.property 
        if instance.user != self.request.user and property_instance.user != self.request.user:
            raise serializers.ValidationError("You can only cancel your own reservations.")

        Notification.objects.create(
            notified_user=property_instance.user,
            message=f"A reservation at property {property_instance.location} has been cancelled."
        )
        instance.delete()

        if property_instance.user != self.request.user:
            raise serializers.ValidationError("You can only update the status of reservations for your own properties.")

class UpdateReservationStatusView(generics.UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        status = self.request.data.get('status')
        reservation = self.get_object()
        property_instance = reservation.property

        if property_instance.user != self.request.user:
            raise serializers.ValidationError("You can only update the status of reservations for your own properties.")

        if status in ['approved', 'denied', 'terminated']:
            serializer.save(state=status)

            Notification.objects.create(
            notified_user=property_instance.user,
            message=f"Your reservation at property {property_instance.location} has been {status}."
        )
        else:
            raise serializers.ValidationError("Invalid status")
