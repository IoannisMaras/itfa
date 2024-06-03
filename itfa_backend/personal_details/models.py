from django.db import models
from django.contrib.auth.models import User

class PersonalDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gross_income = models.DecimalField(max_digits=10, decimal_places=2)
    age = models.IntegerField()
    #options field
    TAX_TYPE_OPTIONS = (
        ('individual', 'individual'),
        ('business', 'business'),
    )
    tax_type = models.CharField(max_length=25, choices=TAX_TYPE_OPTIONS)
    COUNTRY_OPTIONS = (
        ('greece', 'greece'),
        ('italy', 'italy'),
    )
