from django.db import models

from users.models import User, get_sentinel_user

PRIVATE = 1
GROUP = 2

PM_PREFIX = 'pm-'


class ChatRoom(models.Model):
    ROOM_TYPE = ((PRIVATE, 'PRIVATE'),
                 (GROUP, 'GROUP'))

    name = models.CharField(max_length=12, null=True)
    users = models.ManyToManyField(User)
    room_type = models.PositiveSmallIntegerField(choices=ROOM_TYPE, default=PRIVATE)

    def __str__(self):
        return 'Chat room:{0} | Users: {1} '.format(self.channel_name, self.users.all())

    def get_hot_messages(self):
        return self.message_set.all()[:10]

    def get_last_messages(self):
        return self.message_set.last()


# provitional, this might become a text file for messages
class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user().pk))

    def __str__(self):
        return self.text[0:10] if len(self.text) > 11 else self.text


def chat_room_name_gen(user1_id, user2_id):
    if int(user1_id) < int(user2_id):
        return '{0}-{1}'.format(user1_id, user2_id)
    return '{0}-{1}'.format(user2_id, user1_id)


def get_channel_room_name(room_name):
    if room_name.startswith('g'):
        return room_name
    return '{0}{1}'.format(PM_PREFIX, room_name)


def get_room_type(room_name):
    if room_name.startswith('g'): return GROUP
    return PRIVATE
