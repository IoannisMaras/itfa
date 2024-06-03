from rest_framework import serializers

from .models import Dependent

class DependentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dependent
        fields = '__all__'