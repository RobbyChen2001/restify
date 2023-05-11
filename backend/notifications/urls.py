from django.urls import path
from . import views

app_name = 'notifications'

urlpatterns = [ 
    path('', views.NotificationListView.as_view(), name='notification_list'),
    path('create/', views.CreateNotificationView.as_view(), name='notification_create'),
    path('delete/<int:pk>/', views.DeleteNotificationView.as_view(), name='notification_delete'),
]