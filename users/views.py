from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import UserSerializer, TokenSerializer, ProfileSerializer

"""
@api_view(['GET'])
def current_user(request):
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
"""

class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request):
        user = request.data.get('user')
        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})
        serializer = UserSerializerWithToken(data = user)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})
        return Response({"response" : "success", "message" : "user created succesfully"})


class ProfileView(APIView):

    def get(self, request, *args, **kwargs):
        users = Profile.objects.all()
        serializer = ProfileSerializer(users, many=True)
        return Response(serializer.data)
