from rest_framework import serializers
from .models import Comments
from accounts.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username']
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    
    class Meta:
        model = Comments
        fields = ['id', 'user', 'content', 'rating', 'property', 'reply_to', 'created_at', 'updated_at']
        read_only_fields = ['property']