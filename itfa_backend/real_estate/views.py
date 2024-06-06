from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import RealEstateSerializer

class RealEstateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        real_estates = request.user.realestate_set.all()
        serializer = RealEstateSerializer(real_estates, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        response_array = []
        for real_estate in request.data:
            real_estate['user'] = request.user.id
            if real_estate.get('id'):
                real_estate_instance = request.user.realestate_set.get(id=real_estate.get('id'))
                serializer = RealEstateSerializer(real_estate_instance, data=real_estate)
            else:
                serializer = RealEstateSerializer(data=real_estate)
            if serializer.is_valid():
                serializer.save(user=request.user)
                response_array.append({"success":True, "data":serializer.data})
            else:
                response_array.append({"success":False, "data":serializer.errors})

        return Response(response_array)
    
    def delete(self, request,pk, *args, **kwargs):
        real_estate = request.user.realestate_set.get(id=pk)
        real_estate.delete()
        return Response({"message":"Real Estate deleted successfully"})