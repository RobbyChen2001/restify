from django.urls import path
from . import views

app_name = 'comments'

urlpatterns = [
    path('', views.CommentsListView.as_view(), name='comments_list'),
    path('create/', views.CreateCommentView.as_view(), name='create_comment'),
]
