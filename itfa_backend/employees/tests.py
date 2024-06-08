from django.test import TestCase

from .models import Employee
# class EmployeeTestCase(TestCase):
#     def test_employee_creation(self):
#         # Create an employee
#         employee = Employee.objects.create(
#             first_name="John",
#             last_name="Doe",
#             position="Manager",
#             salary=50000,
#         )

#         # Assert that the employee was created successfully
#         self.assertEqual(employee.first_name, "John")
#         self.assertEqual(employee.last_name, "Doe")
#         self.assertEqual(employee.position, "Manager")
#         self.assertEqual(employee.salary, 50000)