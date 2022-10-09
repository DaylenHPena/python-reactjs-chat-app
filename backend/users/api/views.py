from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView

from ..api.serializers import MyTokenObtainPairSerializer
from ..api.serializers import UserSerializer
from ..models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer