
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Dependent
from rest_framework.authtoken.models import Token
from rest_framework.test import APILiveServerTestCase
class DependentTests(APILiveServerTestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user_token = Token.objects.create(user=self.user).key
        self.url_create_or_update = reverse('dependents')

    def test_dependent_creation(self):
        # Create a dependent
        dependent = Dependent.objects.create(
            name="John",
            gross_income=50000,
            age=19,
            user=self.user
        )

        # Assert that the dependent was created successfully
        self.assertEqual(dependent.name, "John")
        self.assertEqual(dependent.gross_income, 50000)
        self.assertEqual(dependent.age, 19)
        self.assertEqual(dependent.user, self.user)

    def test_crud(self):
        response = self.client.post(self.url_create_or_update,data=[{"name":"test_name" ,"gross_income":20000,"age":19}],headers={'Authorization': 'Token ' + self.user_token},format='json')
        
       
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Dependent.objects.count(), 1)
        
        created_dependent_id = response.json()[0]['data']['id']
        created_dependent = Dependent.objects.get(id=created_dependent_id)

        self.assertEqual(created_dependent.name, 'test_name')
        self.assertEqual(created_dependent.gross_income, 20000)
        self.assertEqual(created_dependent.age, 19)
        self.assertEqual(created_dependent.user, self.user)

        response = self.client.post(self.url_create_or_update,data=[{"id":created_dependent_id, "name":"new_test_name" ,"gross_income":25000,"age":20}],headers={'Authorization': 'Token ' + self.user_token},format='json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Dependent.objects.count(), 1)

        updated_dependent = Dependent.objects.get(id=created_dependent_id)

        self.assertEqual(updated_dependent.name, 'new_test_name')
        self.assertEqual(updated_dependent.gross_income, 25000)
        self.assertEqual(updated_dependent.age, 20)

        url_delete = reverse('dependents', args=[created_dependent_id])

        response = self.client.delete(url_delete,headers={'Authorization': 'Token ' + self.user_token},format='json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Dependent.objects.count(), 0)

