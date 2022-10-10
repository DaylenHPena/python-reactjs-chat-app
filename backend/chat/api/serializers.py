from rest_framework import serializers

from chat.chat_base.models import Message, ChatRoom


class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ('pk','chat_room','text','created_at','sender')

class ChatRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatRoom
        fields = ('pk','channel_name','users','room_type')