from django.urls import path, include
from rest_framework import routers

from ..api.views import MyTokenObtainPairView
from ..api.views import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]

#---- rest_framework_simplejwt ---------------------------------
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns_jwt = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += urlpatterns_jwt
