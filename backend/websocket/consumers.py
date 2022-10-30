import json
from datetime import datetime

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from chat.models import ChatRoom, Message

CONNECTION_ON = 0
CONNECTION_OFF = 1
CHAT_MESSAGE = 2
NEW_CHAT = 3


class ChatRoomConnector:
    chat_class = ChatRoom


class ChatConsumer(WebsocketConsumer):
    '''
    Types of message:
    chat_message
    new_message
    '''

    def connect(self):
        # TODO: make this connects only once and change receiver channel instead of making a new connection
        # print('This ChatConsumer channel_name automatic generated is ', self.channel_name)
        # TODO: check error
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print('room name: ',self.room_name)
        self.chat_room = self.get_chat_room()
        self.get_personal_channel_name()

        self.listen_personal_channel()

        self.get_receiver_personal_channel_name()

        self.get_group_channels()

    # send message to a group right after typing it in the chat form
    def receive(self, text_data=None, bytes_data=None):
        print('recive')
        text_data_json = json.loads(text_data)
        text_data_json['created_at'] = datetime.now().isoformat()
        text_data_json['sender'] = self.personal_channel

        # print('Socket is receiving the message: {0} that was sent by {1} with personal channel {2} '.format(text_data_json['message'],self.scope['user'], self.personal_channel))

        # send to other individual
        async_to_sync(self.channel_layer.group_send)(
            self.receiver_personal_channel,
            text_data_json
        )

        # send to self
        async_to_sync(self.channel_layer.send)(
            self.channel_name,
            text_data_json
        )

    # Receive message from room group
    def chat_message(self, event):
        # event={'text': '', 'chat_room': #, 'type': '', 'created_at': '', 'sender': ''}
        print('chat_message', event)
        # print('chat_message is working now for message: {0} and {1} is receiving it'.format(event['message'], self.scope['user']))

        # Send message to WebSocket
        self.send(text_data=json.dumps(event))
        self.save_db(event)

    def proxy_message(self, event):
        pass

    def new_chat(self, event):
        print('new_chat', event)
        self.send(text_data=json.dumps(event))

    def get_personal_channel_name(self):
        '''
        Personal channel names are the user.pk, so they are unique
        :return: void
        '''
        self.personal_channel = '{0}'.format(self.scope['user'].pk)
        print(self.personal_channel)
        return self.personal_channel

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
        # TODO change to check type of chat
        self.receiver_personal_channel = self.room_name
        # print('I am ready to send to {0}'.format(self.receiver_personal_channel))
        return self.receiver_personal_channel

    def get_group_channels(self):
        # TODO: start listening to user group channels
        pass

    def get_room_type(self):
        if (self.room_name.startswith('g')): return 'group'
        return 'private'

    def get_chat_room(self):
        if self.room_name:
            try:
                chat_room = ChatRoom.objects.filter(users__pk=int(self.get_personal_channel_name())).get(
                    users__pk=int(self.get_receiver_personal_channel_name()))
                return chat_room
            except:
                return None
        return None

    def save_db(self, text_data_json):
        print('save_db', text_data_json)
        print('self.get_room_type()', self.get_room_type())
        print('self.get_chat_room()', self.get_chat_room())
        if self.get_room_type() == 'private':
            chat_room = self.get_chat_room()
            if not chat_room:
                chat_room = self.new_chat_room_db()

                self.receive(json.dumps(
                    {'type': 'new_chat',
                     'text': '{0} just started a new chat'.format(self.scope['user']),
                     'room_name': self.room_name
                     }))

        else:
            # TODO change to real way
            chat_room = ChatRoom.objects.get(name=text_data_json['chat_room'][1:])

        message = Message(chat_room=chat_room,
                          text=text_data_json['text'],
                          sender=self.scope['user']
                          )
        message.save()

    def new_chat_room_db(self):
        # TODO add type and users
        chat_room = ChatRoom.objects.create()
        chat_room.users.add(int(self.get_receiver_personal_channel_name()))
        chat_room.users.add(int(self.get_personal_channel_name()))
        chat_room.save()
        return chat_room

    def disconnect(self, close_code):
        pass
