from django.urls import path, include
from rest_framework import routers

from .views import MyTokenObtainPairView, UserViewSet, RegistrationView, ContactsListView, UserSearchListView, \
    add_contact, uploadImage, ChatsViewSet,ContactDetailView

router = routers.DefaultRouter()

router.register('users', UserViewSet, basename='users')

router.register('chats', ChatsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('auth/registration/', RegistrationView.as_view(), name='registration'),
    path('contacts/', ContactsListView.as_view(), name='contacts'),
    path('contacts/<int:pk>/', ContactDetailView.as_view(), name='contacts_detail'),
    path('search-contact/', UserSearchListView.as_view(), name='contact_search'),
    path('add_contact/<int:pk>/', add_contact, name='add_contact'),
    path('update_avatar/', uploadImage, name='update_avatar'),
]

# ---- rest_framework_simplejwt ---------------------------------
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns_jwt = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += urlpatterns_jwt
