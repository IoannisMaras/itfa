from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import PersonalDetails
from .serializers import PersonalDetailsSerializer

class PersonalDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if(PersonalDetails.objects.filter(user=request.user).exists()):
            personal_details = PersonalDetails.objects.get(user=request.user)
            serializer = PersonalDetailsSerializer(personal_details)
            return Response(serializer.data)
        else:
            return Response({"message":"No personal details found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):

        if(PersonalDetails.objects.filter(user=request.user).exists()):
            #update
            personal_details = PersonalDetails.objects.get(user=request.user)
            serializer = PersonalDetailsSerializer(personal_details, data={"user":request.user.id,**request.data})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            #create
            serializer = PersonalDetailsSerializer(data={"user":request.user.id,**request.data})
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
