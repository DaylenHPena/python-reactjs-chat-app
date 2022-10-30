import json

from django.contrib.auth import get_user_model
from rest_framework import viewsets, views, status, generics
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.filters import SearchFilter
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from api.serializers import RegisterUserSerializer, MyTokenObtainPairSerializer, UserSerializer, ContactSerializer, \
    ChangeAvatarSerializer
from users.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


class ContactDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)


class ContactsListView(generics.ListAPIView):
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.contact.all()


class UserSearchListView(generics.ListAPIView):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = ContactSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('username',)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        #exclude the user from the search
        queryset = super().get_queryset().exclude(pk=self.request.user.pk)
        return queryset


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
        return Response(status=200, data=json.dumps({'message': 'done'}))
    except Exception as e:
        return Response(status=400)


class Test(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = ChangeAvatarSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.avatar = request.data['avatar']
            instance.save()
            return Response(status=200)
        except:
            return Response(status=400)

    '''def update(self, request, pk=None, *args, **kwargs):
        user = request.user
        data = request.data
        print('data', data)
        posts_serializer = self.serializer_class(data=request.data)
        print('posts_serializer', posts_serializer)
        if posts_serializer.is_valid():

            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def uploadImage(request):
    print(request.data)
    try:
        user = request.user
        user.avatar = request.data['avatar']
        user.save()
        return Response(status=200)
    except:
        return Response(status=400)
