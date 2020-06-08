from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter
from rest_framework_jwt.views import obtain_jwt_token
from . import views
from .views import CreateUserView, RegistrationView, ProfileViewSet


router = SimpleRouter()
router.register(r'', ProfileViewSet, basename="profiles")

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', RegistrationView.as_view()),
    path('profiles/', include(router.urls)),
]
