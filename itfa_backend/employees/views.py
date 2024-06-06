from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import EmployeeSerializer

class EmployeesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = request.user.employee_set.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        response_array = []
        for employee in request.data:
            employee['user'] = request.user.id
            if employee.get('id'):
                employee_instance = request.user.employee_set.get(id=employee.get('id'))
                serializer = EmployeeSerializer(employee_instance, data=employee)
            else:
                serializer = EmployeeSerializer(data=employee)
            if serializer.is_valid():
                serializer.save(user=request.user)
                response_array.append({"success":True, "data":serializer.data})
            else:
                response_array.append({"success":False, "data":serializer.errors})

        return Response(response_array)
    
    def delete(self, request,pk, *args, **kwargs):
        employee = request.user.employee_set.get(id=pk)
        employee.delete()
        return Response({"message":"Employee deleted successfully"})