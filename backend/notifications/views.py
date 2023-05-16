from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

# Create your views here.

class CreateNotificationView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(notified_user=user).order_by('datetime')
    
# method: DELETE
class DeleteNotificationView(generics.DestroyAPIView):
    queryset = Notification.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk)
        except Notification.DoesNotExist:
            return Response(status=404)

        # Check if the user is authorized to delete this notification
        if notification.notified_user.pk != request.user.id:
            return Response(status=403)

        notification.delete()
        return Response(status=204)