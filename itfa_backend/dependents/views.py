from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import DependentSerializer

class DependentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        dependents = request.user.dependent_set.all()
        serializer = DependentSerializer(dependents, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        #send many dependents and save them
        response_array = []
        for dependent in request.data:
            dependent['user'] = request.user.id
            if dependent.get('id'):
                dependent_instance = request.user.dependent_set.get(id=dependent.get('id'))
                serializer = DependentSerializer(dependent_instance, data=dependent)
            else:
                serializer = DependentSerializer(data=dependent)
            if serializer.is_valid():
                serializer.save(user=request.user)
                response_array.append({"success":True, "data":serializer.data})
            else:
                response_array.append({"success":False, "data":serializer.errors})

        return Response(response_array)
    
    def delete(self, request,pk, *args, **kwargs):
        # dependent_id = request.data.get('id')
        dependent = request.user.dependent_set.get(id=pk)
        dependent.delete()
        return Response({"message":"Dependent deleted successfully"})