from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter
from .views import CreateUserView
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', views.ProfileView.as_view(), name='profile'),
]
