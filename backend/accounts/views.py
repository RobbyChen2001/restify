from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer, UpdateUserSerializer
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from comments.models import Comments
from comments.serializers import CommentSerializer
from rest_framework import permissions

# Create your views here.

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User successfully created! Now you can log in.",
        })

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid username or password'})

# reference: https://medium.com/django-rest/logout-django-rest-framework-eb1b53ac6d35
class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "You logged out!"}, status=200)
        except Exception as e:
            return Response({"message": "Invalid refresh token"}, status=400)
        
class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)

        if not user.is_active:
            # Reactivate the user
            user.is_active = True
            user.save()

        return Response(serializer.data)
        
    def put(self, request):
        user = request.user
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            if not user.is_active:
                # Reactivate the user
                user.is_active = True
                user.save()
                
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class UserCommentsListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comments.objects.filter(user=self.request.user)