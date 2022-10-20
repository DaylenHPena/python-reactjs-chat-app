from django.contrib.auth import get_user_model
from rest_framework import viewsets, views, status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from ..api.serializers import RegisterUserSerializer, MyTokenObtainPairSerializer, UserSerializer, ContactSerializer
from ..models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ContactsListView(generics.ListAPIView):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return self.request.user.contact.all()


class UserSearchListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = ContactSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('username',)
    permission_classes = (IsAuthenticated,)


class MyTokenObtainPairView(TokenObtainPairView):
    '''
    Overwriting the obtain access and refresh token default view
    to use MyTokenObtainPairSerializer
    '''
    serializer_class = MyTokenObtainPairSerializer


class RegistrationView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            user = reg_serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def add_contact(request, pk):
    try:
        contact = get_user_model().objects.get(pk=pk)
        request.user.contact.add(contact)
        return Response(status=200)
    except Exception as e:
        return Response(status=400)
