from rest_framework import serializers
#from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import Profile


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Token
        fields = ('key', 'user',)


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ('user', 'username', 'image',)