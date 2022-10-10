from rest_framework import serializers

from ..models import ChatRoom, Message


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('pk','chat_room','text','created_at','sender')

class ChatRoomSerializer(serializers.ModelSerializer):


    class Meta:
        model = ChatRoom
        fields = ('pk','channel_name','users','room_type')