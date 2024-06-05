from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
class Dependent(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(default=18,validators=[MinValueValidator(0),MaxValueValidator(100)])
    gross_income = models.DecimalField(max_digits=10, decimal_places=2,default=0.0,validators=[MinValueValidator(0)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
