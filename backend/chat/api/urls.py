from django.urls import path, include
from rest_framework.routers import DefaultRouter

from ..api.views import ChatsViewSet

router = DefaultRouter()
router.register('api/chats', ChatsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
