from rest_framework import viewsets

from ..api.serializers import ChatRoomSerializer
from ..models import ChatRoom


class ChatsViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer