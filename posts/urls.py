"""algo_interact URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter
from .views import PostViewSet, UserViewSet, CurrUserViewSet


router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('curr', CurrUserViewSet, basename='curr')
router.register('', PostViewSet, basename='posts')

urlpatterns = router.urls

#urlpatterns = [
#    path('<int:pk>/', DetailPost.as_view()),
#    path('', ListPost.as_view()),
#    path('users/', UserList.as_view()),
#    path('users/<int:pk>/', UserDetail.as_view()),
#]
