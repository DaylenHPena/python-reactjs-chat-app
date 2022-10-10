from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.urls import reverse_lazy
from django.views.generic import CreateView

from .models import User


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username",)


class RegistrationFormView(CreateView):
    form_class = RegistrationForm
    success_url = reverse_lazy('/')
    template_name = 'registration/register.html'

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except:
            text = 'Error'
            messages.error(request, text)
            return HttpResponseRedirect(self.success_url)

