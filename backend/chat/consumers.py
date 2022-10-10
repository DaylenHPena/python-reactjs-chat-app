import json
from datetime import datetime

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model

from .models import ChatRoom, Message, chat_room_name_gen, get_room_type, GROUP, PM_PREFIX
import utils.shortcuts as utils


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps({'type': 'connection on',
                                        'message': '{0}: You are connected to {1}'.format(self.scope['user'],self.room_name)}))


    # send message to a group after typing it in the chat form
    def receive(self, text_data=None, bytes_data=None):
        # text_data ={'message':'', 'user_id':'', 'room_name':''}
        text_data_json = json.loads(text_data)
        text_data_json['date'] = datetime.now().isoformat()
        text_data_json['type'] = 'chat_message'

        print('receive is working now for message: {0} and {1} is receiving it'.format(text_data_json['message'],
                                                                                       self.scope['user']))

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            text_data_json)

    def disconnect(self, close_code):
        pass

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        #user_id = event['user_id']

        print(
            'chat_message is working now for message: {0} and {1} is receiving it'.format(message, self.scope['user']))

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            #'user_id': user_id,
            'date': datetime.now().isoformat()
        }))

    def connect_to_chat(self):
        # get receiver from url and define if is a group or private room
        receiver = self.scope['url_route']['kwargs']['receiver']
        if get_room_type(receiver) == GROUP:
            self.receiver_pm_channel = receiver
            chat_room_name = self.receiver_pm_channel
            self.chat_room = utils.get_object_or_none(ChatRoom, channel_name=chat_room_name)
            # TODO manage error
            if not self.chat_room: raise Exception('Chat room not found. Please, create first')
        else:
            self.receiver_pm_channel = '{0}{1}'.format(PM_PREFIX, receiver)
            chat_room_name = chat_room_name_gen(receiver, self.scope['user'].pk)
            self.chat_room, created = ChatRoom.objects.get_or_create(channel_name=chat_room_name)
            if created:
                self.chat_room.users.add(self.scope['user'])
                # TODO check if  receiver user exists
                self.chat_room.users.add(get_user_model().objects.get(pk=receiver))

        print('My private room is {0} and I am ready to send to {1}'.format(self.pm_channel, self.receiver_pm_channel))

        print('chat_room_name', chat_room_name)