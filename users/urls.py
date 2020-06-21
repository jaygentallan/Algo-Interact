from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter
from rest_framework_jwt.views import obtain_jwt_token
from . import views
from .views import CreateUserView, RegistrationView, ProfileViewSet, EditProfileViewSet


router = SimpleRouter()
router.register(r'', ProfileViewSet, basename="profiles")
router.register(r'edit', EditProfileViewSet, basename="profile-detail")

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', RegistrationView.as_view()),
    path('', include(router.urls)),
    #re_path(r'(?P<user_id>\d+)$', ProfileDetailView.as_view(), name='profile_detail'),
]
