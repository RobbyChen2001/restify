from django.urls import path
from . import views

app_name = 'reservations'

urlpatterns = [
    path('', views.ReservationListView.as_view(), name='list'),
    path('<int:property_id>/reserve/', views.ReserveView.as_view(), name='reserve'),
    path('<int:id>/cancel/', views.CancelReservationView.as_view(), name='cancel'),
    path('<int:id>/update_status/', views.UpdateReservationStatusView.as_view(), name='update_status'),
]
