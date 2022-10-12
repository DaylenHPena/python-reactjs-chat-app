from rest_framework import viewsets, permissions

from ..api.serializers import ChatRoomSerializer
from ..models import ChatRoom


class ChatsViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    #permission_classes = (permissions.IsAuthenticated,)

    def filter_queryset(self, queryset):
        print(self.request.user)
        return queryset.filter(users__pk=self.request.user.pk)