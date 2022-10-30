from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.serializers import ChatRoomSerializer
from chat.models import ChatRoom


class ChatsViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = (IsAuthenticated,)

    def filter_queryset(self, queryset):
        print(self.request.user)
        return queryset.filter(users__pk=self.request.user.pk)