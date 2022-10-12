from django.urls import path, include

from .views import RegistrationFormView

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('register', RegistrationFormView.as_view(), name='register'),
]