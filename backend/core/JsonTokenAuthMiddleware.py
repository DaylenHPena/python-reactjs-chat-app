import jwt
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

from backend.core.settings import SECRET_KEY, SIMPLE_JWT


# https://gist.github.com/AliRn76/1fb99688315bedb2bf32fc4af0e50157#file-django_channels3_custom_auth_middleware-py

#frontend new WebSocket(ws://8000/{your_path}?token=${localStorage.getItem('token')})
@database_sync_to_async
def get_user(token_key):
    #print('token_key', token_key)
    # If you are using jwt
    try:
        user_id: int = jwt.decode(token_key, SECRET_KEY, algorithms=[SIMPLE_JWT['ALGORITHM']]).get(
            SIMPLE_JWT['USER_ID_CLAIM'])
    except jwt.exceptions.DecodeError:
        return AnonymousUser()
    except jwt.exceptions.ExpiredSignatureError:
        return AnonymousUser()
    try:
        return AnonymousUser() if user_id is None else get_user_model().objects.get(id=user_id)
    except get_user_model().DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        #print('scope', scope)
        try:
            token_key = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('token', None)
        except ValueError:
            token_key = None
        scope['user'] = AnonymousUser() if token_key is None else await get_user(token_key)
        return await super().__call__(scope, receive, send)
