from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import UserSerializer
from personal_details.serializers import PersonalDetailsSerializer
@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = serializer.instance
        token = Token.objects.create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        #logout
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        personal_details = user.personaldetails
        real_estates = user.realestate_set.count()
        vehicles = user.vehicle_set.count()
        employees = user.employee_set.count()
        dependents = user.dependent_set.count()
        serializer = PersonalDetailsSerializer(personal_details)
        return Response({
            "personal_details": serializer.data,
            "real_estates": real_estates,
            "vehicles": vehicles,
            "employees": employees,
            "dependents": dependents
        })
    
    
