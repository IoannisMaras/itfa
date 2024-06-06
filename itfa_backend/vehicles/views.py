from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import VehicleSerializer

class VehiclesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vehicles = request.user.vehicle_set.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        response_array = []
        for vehicle in request.data:
            vehicle['user'] = request.user.id
            if vehicle.get('id'):
                vehicle_instance = request.user.vehicle_set.get(id=vehicle.get('id'))
                serializer = VehicleSerializer(vehicle_instance, data=vehicle)
            else:
                serializer = VehicleSerializer(data=vehicle)
            if serializer.is_valid():
                serializer.save(user=request.user)
                response_array.append({"success":True, "data":serializer.data})
            else:
                response_array.append({"success":False, "data":serializer.errors})

        return Response(response_array)
    
    def delete(self, request,pk, *args, **kwargs):
        vehicle = request.user.vehicle_set.get(id=pk)
        vehicle.delete()
        return Response({"message":"Vehicle deleted successfully"})