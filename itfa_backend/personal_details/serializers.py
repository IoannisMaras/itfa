from rest_framework import serializers

from .models import PersonalDetails

class PersonalDetailsSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user_id = validated_data.get('user_id')
        try:
            personal_details = PersonalDetails.objects.get(user_id=user_id)
            for attr, value in validated_data.items():
                setattr(personal_details, attr, value)
            personal_details.save()
            return personal_details
        except PersonalDetails.DoesNotExist:
            return super().create(validated_data)

    class Meta:
        model = PersonalDetails
        fields = '__all__'