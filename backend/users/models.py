from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import QuerySet


def get_sentinel_user():
    '''
    Returns a default user when the user is not available
    :return: AUTH_USER_MODEL
    '''
    return get_user_model().objects.get_or_create(username='deleted')[0]

class UserQuery(QuerySet):
    pass
class User(AbstractUser):
    contact = models.ManyToManyField('User')
    avatar = models.ImageField(upload_to='media/', null=True, blank=True, default='logo.svg')


