from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import permissions, status, viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_auth.registration.views import RegisterView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from .models import Profile
from .serializers import RegisterSerializer, TokenSerializer, ProfileSerializer, EditProfileSerializer


class RegistrationView(RegisterView):
  serializer_class = RegisterSerializer


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


class ProfileViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def retrieve(self, request, pk=None):
        queryset = Profile.objects.filter(user=pk)
        profile = get_object_or_404(queryset, user=pk)
        return Response(ProfileSerializer(profile).data, status=status.HTTP_200_OK)


class EditProfileViewSet(viewsets.ViewSet):
    queryset = Profile.objects.all()
    serializer_class = EditProfileSerializer

    def retrieve(self, request, pk=None):
        queryset = Profile.objects.filter(user=pk)
        profile = get_object_or_404(queryset, user=pk)
        return Response(EditProfileSerializer(profile).data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        queryset = Profile.objects.filter(user=pk)
        profile = get_object_or_404(queryset, user=pk)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(ProfileSerializer(profile).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ViewProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    def retrieve(self, request, username=None):
        queryset = Profile.objects.filter(username=username)
        profile = get_object_or_404(queryset, username=username)
        return Response(ProfileSerializer(profile).data, status=status.HTTP_200_OK)