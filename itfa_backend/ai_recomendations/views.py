from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from openai import OpenAI
import os
class AiRecomendations(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):


        client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )   

        personal_details = request.user.personaldetails

        dependents = request.user.dependent_set.all()

        vehicles = request.user.vehicle_set.all()

        employees = request.user.employee_set.all()

        real_estates = request.user.realestate_set.all()

        info = f'''
        Gross Income: {personal_details.gross_income}
        Total Expenses: {personal_details.total_expenses}
        Age: {personal_details.age}
        Tax Type: {personal_details.tax_type}
        Country: {personal_details.country}

        '''

        info += "Dependents:"

        if(dependents.count() == 0):
            info += "No dependents"
        else:
            for dependent in dependents:
                info += f'''
                    Age: {dependent.age}
                    Gross Income: {dependent.gross_income}

                '''
        if(employees.count() == 0):
            info += "No Employees"
        else:
            info += "Employees:"

            for employee in employees:
                info += f'''
                    Age: {employee.age}
                    Salary: {employee.salary}

                '''

        info += "Real Estates:"
        
        if(real_estates.count() == 0):
            info += "No Real Estates"
        else:
            for real_estate in real_estates:
                info += f'''
                    Value: {real_estate.value}
                    Property Type: {real_estate.property_type}
                    Square Meters: {real_estate.square_meters}
                
                '''

        info += "Vehicles:"
        if(vehicles.count() == 0):
            info += "No Vehicles"
        else:
            for vehicle in vehicles:
                info += f'''
                    Type: {vehicle.vehicle_type}
                    Year of Manufacture: {vehicle.year_of_manufacture}
                    Use Type: {vehicle.use_type}
                    Value: {vehicle.value}

                '''

        response = client.chat.completions.create(
            model = "gpt-3.5-turbo",
            #response_format={ "type": "json_object" },
            messages = [
                {"role": "system", "content": "You are a tax expert. You have been given information about a user's tax filing and asked to provide recommendations on how they should proceed. The user has provided information about their gross income, total expenses, age, tax type, country, dependents, employees, real estates, and vehicles. The user has asked for recommendations on how they should proceed with their tax filing."},
                {"role": "user", "content": f"I have the following information about my tax filing: {info} Can you provide some recommendations on how I should proceed?"}
            ],
        )

        final_content = response.choices[0].message.content

        return Response(final_content)
