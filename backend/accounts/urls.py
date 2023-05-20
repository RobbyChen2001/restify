from django.urls import path, include
from . import views
from rest_framework_simplejwt import views as jwt_views


app_name = 'accounts'

urlpatterns = [ 
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('update/', views.UpdateProfileView.as_view(), name='update_profile'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('/comments/', include('comments.urls')),
]
