from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from ..models import ChatRoom, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('pk', 'chat_room', 'text', 'created_at', 'sender')


class ChatRoomSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    identifier = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ('pk', 'identifier','name', 'users', 'room_type')

    def get_name(self, obj):
        if obj.room_type != 1:
            return obj.name
        # if private return name of the other user
        user = self.context['request'].user
        try:
            receiver = obj.users.exclude(pk=user.pk)[0]
            return receiver.username
        except:
            return 'Unknow'

    def get_identifier(self, obj):
        # if group -> -pk
        # if private ->the other user pk
        if obj.room_type != 1:
            return '-{0}'.format(obj.pk)
        user = self.context['request'].user
        try:
            receiver = obj.users.exclude(pk=user.pk)[0]
            return receiver.pk
        except:
            return '0'
