from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_image=serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'profile_image', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            profile_image=validated_data.get('profile_image'),
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password')
        )
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    profile_image=serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_image']

