from rest_framework import serializers

from chat.models import ChatRoom,Message
from core.settings import HOST


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('pk', 'chat_room', 'text', 'created_at', 'sender')


class ChatRoomSerializer(serializers.ModelSerializer):
    '''
    fields: ['pk', 'users', 'room_type', 'messages':{},'name','identifier','img']
    '''

    class Meta:
        model = ChatRoom
        fields = ('pk', 'users', 'room_type', 'messages')
        depth = 1

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.room_type != 1:
            ret['name'] = instance.name
            ret['identifier'] = 'g{0}'.format(instance.pk)
            ret['img'] = 'img'

        else:
            # if private return name of the other user
            user = self.context['request'].user
            try:
                receiver = instance.users.exclude(pk=user.pk)[0]
                ret['name'] = receiver.username
                ret['identifier'] = receiver.pk
                ret['img'] = HOST + receiver.avatar.url if receiver.avatar else ''
            except:
                ret['name'] = 'unknown'
                ret['identifier'] = 'unknown'
        return ret
