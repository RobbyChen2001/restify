from django.urls import path, include
from . import views

app_name = 'properties'

urlpatterns = [
    path('', views.PropertyListView.as_view(), name='list'),
    path('create/', views.PropertyCreateView.as_view(), name='create'),
    path('<int:property_id>/update/', views.PropertyUpdateView.as_view(), name='update'),
    path('<int:property_id>/delete/', views.PropertyDelete.as_view(), name='delete'),
    path('<int:property_id>/', views.PropertyDetailView.as_view(), name='detail'),
    path('<int:property_id>/comments/', include('comments.urls')),
    path('', include('reservations.urls')),
]
