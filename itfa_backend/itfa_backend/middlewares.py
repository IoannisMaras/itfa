from rest_framework import status
from rest_framework.response import Response
from rest_framework import exceptions
from django.http import HttpResponseForbidden
class TokenAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        #check if user is authenticated
        #skip for login and register
        if not (request.path == '/login/' or request.path == '/register/'):
            if request.user.is_authenticated:
                pass
            else:
                return HttpResponseForbidden('You are not authenticated')
        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response