from django.core.exceptions import ValidationError, ImproperlyConfigured
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.views.generic import CreateView


class AjaxCreateView(CreateView):
    '''
    Class based on CreateView for ajax
    this class needs to define the "ajax_template" where the ajax response will apppear
    '''
    ajax_template = None

    def get_ajax_template(self):
        if self.ajax_template:
            return self.ajax_template
        else:
            raise ImproperlyConfigured('Must define "ajax_template"')

    def post(self, *args, **kwargs):
        self.object = None
        if self.request.is_ajax and self.request.method == "POST":
            form = self.form_class(self.request.POST)

            if form.is_valid():
                return self.form_valid(form)
            return self.form_invalid(form)

    def form_valid(self, form):
        try:
            self.object = form.save()
            ser_instance = render_to_string(
                self.get_ajax_template(),
                {'object': self.object})
            return JsonResponse(
                {"instance": ser_instance, 'is_valid': True},
                status=200)
        except ValidationError as e:
            form.add_error(None, e)
            return self.form_invalid(form)

    def form_invalid(self, form):
        print(form.errors)
        return JsonResponse({'errors': form.errors, 'is_valid': False},
                            status=200)