from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from .models import Property
from django.http import HttpResponse

from django.shortcuts import get_object_or_404
from rest_framework.generics import UpdateAPIView, ListAPIView, DestroyAPIView, CreateAPIView
from .serializers import PropertySerializer
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import CustomUser


# Create your views here.

# Search result (18 marks)
class PropertyListView(ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()

        # filter by location
        location = self.request.query_params.get('location', None)
        if location is not None:
            queryset = queryset.filter(location__icontains=location)

        # filter by number of guests
        num_guests = self.request.query_params.get('num_guests', None)
        if num_guests is not None:
            queryset = queryset.filter(num_guests=num_guests)

        # filter by number of beds
        num_beds = self.request.query_params.get('num_beds', None)
        if num_beds is not None:
            queryset = queryset.filter(num_beds=num_beds)

        # filter by number of baths
        num_baths = self.request.query_params.get('num_baths', None)
        if num_baths is not None:
            queryset = queryset.filter(num_baths=num_baths)

        order_by = self.request.query_params.get('order_by', None)
        if order_by is not None:
            queryset = queryset.order_by(order_by)

        return queryset
    
# a view to create a new property
class PropertyCreateView(CreateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user.customuser)

        user = CustomUser.objects.get(id=self.request.user.id)
        user.is_host = True
        user.save()


# update property of each field base on input
class PropertyUpdateView(UpdateAPIView):
    model = Property
    fields = ['state', 'location', 'num_guests', 'num_beds', 'num_baths',
              'images', 'description', 'amenities', 'available_dates']
    success_url = reverse_lazy('properties:list')

    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_object(self):
        property_id = self.kwargs.get("property_id")
        return get_object_or_404(Property, id=property_id)

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        kwargs['data'] = self.request.data
        return super().get_serializer(*args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class PropertyDetailView(RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'property_id'

class PropertyDelete(DestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'property_id'
