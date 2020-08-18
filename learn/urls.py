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

from .views import (
    TopicViewSet,
    TopicDetailView,
    TopicCreateView,
    TopicDeleteView,
    TopicEditViewSet,
    TopicTabsView,
    ReviewViewSet,
    ReviewDetailView,
    ReviewCreateView,
    ReviewDeleteView,
)
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register(r'topics/edit', TopicEditViewSet, basename='topic-edit')
router.register(r'topics', TopicViewSet, basename='topics')
router.register(r'reviews', ReviewViewSet, basename='reviews')

urlpatterns = [
    path('topics/create/', TopicCreateView.as_view(), name='topic-create'),
    path('topics/view/<str:title_id>/', TopicDetailView.as_view(), name='topic-detail'),
    path('topics/delete/<int:pk>/', TopicDeleteView.as_view(), name='topic-delete'),
    path('topics/tabs/<str:type>/', TopicTabsView.as_view(), name='topic-tabs'),

    path('reviews/create/', ReviewCreateView.as_view(), name='review-create'),
    path('reviews/<str:title_id>/', ReviewDetailView.as_view(), name='review-detail'),
    path('reviews/delete/<int:pk>/', ReviewDeleteView.as_view(), name='review-delete'),
    path('', include(router.urls)),
]
urlpatterns += re_path('.*', include(router.urls)),
