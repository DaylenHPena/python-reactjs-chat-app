from django.db import models

from users.models import User, get_sentinel_user

PRIVATE = 1
GROUP = 2

PM_PREFIX = 'pm-'


class ChatRoom(models.Model):
    ROOM_TYPE = ((PRIVATE, 'PRIVATE'),
                 (GROUP, 'GROUP'))

    name = models.CharField(max_length=12, null=True, blank=True)
    users = models.ManyToManyField(User)
    room_type = models.PositiveSmallIntegerField(choices=ROOM_TYPE, default=PRIVATE)

    def __str__(self):
        return 'Chat room:{0} | Users: {1} '.format(self.name, self.users.all())

    def get_hot_messages(self):
        return self.message_set.all()[:10]

    def get_last_messages(self):
        return self.message_set.last()

    def clean(self):
        if self.room_type == PRIVATE and self.users.all().count() != 2:
            raise AttributeError('A private chat must have 2 users')


# provitional, this might become a text file for messages
class Message(models.Model):
    chat_room = models.ForeignKey(ChatRoom, related_name='messages', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user().pk))

    # read_by = models.ForeignKey(User, on_delete=models.SET(get_sentinel_user().pk))

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return self.text[0:10] if len(self.text) > 11 else self.text
