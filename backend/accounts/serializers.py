from rest_framework import serializers
from django.db import models
from accounts.models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'is_host', 'phone')
        extra_kwargs = {
            'password':{'write_only': True},
        }     
    def create(self, validated_data):
        user = CustomUser.objects.create_user(validated_data['username'], password = validated_data['password'], first_name=validated_data['first_name'],  last_name=validated_data['last_name'], email=validated_data['email'])
        return user
    
class UpdateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'profile_picture', 'is_host']
        extra_kwargs = {
            'password': {'write_only': True},
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'