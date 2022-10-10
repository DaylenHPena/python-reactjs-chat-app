from django.contrib import messages
from django.core.exceptions import ValidationError
from django.http import HttpResponseRedirect


class ActionMessageMixin:
    '''
    Use with FormViews
    '''
    success_message = 'Success'
    failure_message = 'Error. '
    get_model_error = False

    def post(self, request, *args, **kwargs):
        try:
            messages.success(request, self.success_message)
            return super().post(request, *args, **kwargs)
        except:
            text = self.failure_message
            messages.error(request, text)
            return HttpResponseRedirect(self.success_url)

def clean_str(string):
    string = string.replace('[', '')
    string = string.replace(']', '')
    return string