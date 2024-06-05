from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Vehicle(models.Model):
    VEHICLE_TYPE = (
        ('car', 'car'),
        ('motorcycle', 'motorcycle'),
        ('truck', 'truck'),
        ('bus', 'bus'),
    )
    vehicle_type = models.CharField(max_length=25, choices=VEHICLE_TYPE , default='house')
    year_of_manufacture = models.IntegerField(default=2000,validators=[MinValueValidator(1900),MaxValueValidator(2024)])
    USE_TYPE = (
        ('personal', 'personal'),
        ('business', 'business'),
    )
    use_type = models.CharField(max_length=25, choices=USE_TYPE , default='personal')
    value = models.DecimalField(max_digits=10, decimal_places=2,default=0.0,validators=[MinValueValidator(0)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
