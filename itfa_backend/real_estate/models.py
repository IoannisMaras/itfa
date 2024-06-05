from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class RealEstate(models.Model):
    PROPERTY_TYPE = (
        ('house', 'house'),
        ('apartment', 'apartment'),
        ('land', 'land'),
        ('business', 'business'),
    )
    property_type = models.CharField(max_length=25, choices=PROPERTY_TYPE , default='house')
    square_meters = models.IntegerField(default=50,validators=[MinValueValidator(0),MaxValueValidator(1000)])
    value = models.DecimalField(max_digits=10, decimal_places=2,default=0.0,validators=[MinValueValidator(0)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
