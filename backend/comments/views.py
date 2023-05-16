from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from .models import Comments, Property
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from reservations.models import Reservation
from rest_framework.exceptions import ValidationError
from reservations.models import Reservation
from rest_framework.exceptions import ValidationError
class CommentsPagination(pagination.PageNumberPagination):
    page_size = 10

class CommentsListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentsPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        property_id = self.kwargs['property_id']
        return Comments.objects.filter(property_id=property_id).select_related('user').prefetch_related('replies')




class CreateCommentView(generics.CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        property = get_object_or_404(Property, pk=self.kwargs['property_id'])
        parent_comment_id = self.request.data.get('reply_to', None)
        parent_comment = None

        if parent_comment_id:
            parent_comment = get_object_or_404(Comments, pk=parent_comment_id)

        if property.user == user and not parent_comment:
            raise ValidationError("You cannot comment on your own property, but you can reply to other comments.")
        
        reservation = Reservation.objects.filter(property=property, user=user).first()
        if reservation and reservation.state not in ['completed', 'terminated'] and not parent_comment:
            raise ValidationError("You can only comment on properties with reservation status completed or terminated.")

        if Comments.has_user_commented(property, user) and not parent_comment:
            raise ValidationError("You can only comment once on a property.")

        serializer.save(user=user, property=property, reply_to=parent_comment if parent_comment_id else None)


class UserCommentsListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = CommentsPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(get_user_model(), id=user_id)
        return Comments.objects.filter(user=user).select_related('property').prefetch_related('replies')

