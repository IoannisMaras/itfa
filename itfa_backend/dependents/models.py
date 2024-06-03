from django.db import models
from django.contrib.auth.models import User
class Dependent(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gross_income = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
