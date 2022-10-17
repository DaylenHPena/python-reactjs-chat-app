import json
from datetime import datetime

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .models import ChatRoom, Message


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # TODO: make this connects only once and change receiver channel instead of making a new connection
        # print('This ChatConsumer channel_name automatic generated is ', self.channel_name)
        self.get_personal_channel_name()

        self.listen_personal_channel()

        self.get_receiver_personal_channel_name()

        self.get_group_channels()

    # send message to a group after typing it in the chat form
    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        text_data_json['created_at'] = datetime.now().isoformat()
        text_data_json['type'] = 'chat_message'
        text_data_json['sender'] = self.personal_channel

        # print('Socket is receiving the message: {0} that was sent by {1} with personal channel {2} '.format(text_data_json['message'],self.scope['user'], self.personal_channel))

        async_to_sync(self.channel_layer.group_send)(
            self.receiver_personal_channel,
            text_data_json
        )
        async_to_sync(self.channel_layer.send)(
            self.channel_name,
            text_data_json
        )

        #self.save_db(text_data_json)

    def disconnect(self, close_code):
        pass

    # Receive message from room group
    def chat_message(self, event):
        # event={'message':'','date':'',...}
        print('event', event)
        # print('chat_message is working now for message: {0} and {1} is receiving it'.format(event['message'], self.scope['user']))

        # Send message to WebSocket
        self.send(text_data=json.dumps(event))

    def get_personal_channel_name(self):
        '''
        Personal channel names are the user.pk, so they are unique
        :return: void
        '''
        self.personal_channel = '{0}'.format(self.scope['user'].pk)

    def listen_personal_channel(self):
        # listen to own personal channel
        async_to_sync(self.channel_layer.group_add)(
            self.personal_channel,
            self.channel_name
        )
        self.accept()
        self.send(text_data=json.dumps({'type': 'connection on',
                                        'message': '{0}: You are connected to your personal channel {1}'.format(
                                            self.scope['user'],
                                            self.personal_channel)}))

    def get_receiver_personal_channel_name(self):
        room_name = self.scope['url_route']['kwargs']['room_name']
        self.receiver_personal_channel = room_name
        # print('I am ready to send to {0}'.format(self.receiver_personal_channel))

    def get_group_channels(self):
        # TODO: start listening to user group channels
        pass

    def get_room_type(self):
        room = self.scope['url_route']['kwargs']['room_name']
        if (room.startswith('g')): return 'group'
        return 'private'

    def save_db(self, text_data_json):
        print('get_room_type', self.get_room_type())
        print('chat_room', text_data_json['chat_room'])
        chat_room = ChatRoom.objects.get(pk=int(text_data_json['chat_room']))
        message = Message(chat_room=chat_room,
                          text=text_data_json['text'],
                          sender=self.scope['user']
                          )
        message.save()

    def get_chat_room(self):
        return None
