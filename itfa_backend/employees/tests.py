from django.urls import reverse
from django.contrib.auth.models import User
from .models import Employee
from rest_framework.authtoken.models import Token
from rest_framework.test import APILiveServerTestCase

class EmployeeTests(APILiveServerTestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_token = Token.objects.create(user=self.user).key
        self.url_create_or_update = reverse('employees')

    def test_employee_creation(self):
        # Create a employee
        employee = Employee.objects.create(
            name="John",
            salary=50000,
            age=19,
            user=self.user
        )

        # Assert that the employee was created successfully
        self.assertEqual(employee.name, "John")
        self.assertEqual(employee.salary, 50000)
        self.assertEqual(employee.age, 19)
        self.assertEqual(employee.user, self.user)

    def test_crud(self):
        response = self.client.post(self.url_create_or_update, data=[{"name":"test_name" ,"salary":20000,"age":19}], headers={'Authorization': 'Token ' + self.user_token}, format='json')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Employee.objects.count(), 1)
        
        created_employee_id = response.json()[0]['data']['id']
        created_employee = Employee.objects.get(id=created_employee_id)

        self.assertEqual(created_employee.name, 'test_name')
        self.assertEqual(created_employee.salary, 20000)
        self.assertEqual(created_employee.age, 19)
        self.assertEqual(created_employee.user, self.user)

        response = self.client.post(self.url_create_or_update, data=[{"id":created_employee_id, "name":"new_test_name" ,"salary":25000,"age":20}], headers={'Authorization': 'Token ' + self.user_token}, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Employee.objects.count(), 1)

        updated_employee = Employee.objects.get(id=created_employee_id)

        self.assertEqual(updated_employee.name, 'new_test_name')
        self.assertEqual(updated_employee.gross_income, 25000)
        self.assertEqual(updated_employee.age, 20)

        url_delete = reverse('employees', args=[created_employee_id])

        response = self.client.delete(url_delete, headers={'Authorization': 'Token ' + self.user_token}, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Employee.objects.count(), 0)