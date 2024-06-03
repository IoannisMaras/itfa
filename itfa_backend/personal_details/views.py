from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import PersonalDetailsSerializer

class PersonalDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PersonalDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(validated_data={'user_id': request.user.id})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
