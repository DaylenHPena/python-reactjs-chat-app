from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from ..models import ChatRoom, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('pk', 'chat_room', 'text', 'created_at', 'sender')


class ChatRoomSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ('pk', 'name', 'users', 'room_type')

    def get_name(self, obj):
        if obj.room_type != 1:
            return obj.name
        user=CurrentUserDefault()
        print('CurrentUserDefault',user,type(user),self.context['request'].user)
        return 'Private'
