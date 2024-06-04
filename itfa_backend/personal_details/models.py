from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
class PersonalDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gross_income = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, validators=[MinValueValidator(0)])
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, validators=[MinValueValidator(0)])
    age = models.IntegerField(default=18, validators=[MinValueValidator(0),MaxValueValidator(100)])
    #options field
    TAX_TYPE_OPTIONS = (
        ('individual', 'individual'),
        ('business', 'business'),
    )
    tax_type = models.CharField(max_length=25, choices=TAX_TYPE_OPTIONS , default='individual')
    COUNTRY_OPTIONS = (
        ('greece', 'greece'),
        ('italy', 'italy'),
    )
    country = models.CharField(max_length=25, choices=COUNTRY_OPTIONS, default='greece')
