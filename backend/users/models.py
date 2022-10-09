from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser


def get_sentinel_user():
    '''
    Returns a default user when the user is not available
    :return: AUTH_USER_MODEL
    '''
    return get_user_model().objects.get_or_create(username='deleted')[0]


class User(AbstractUser):
    pass
