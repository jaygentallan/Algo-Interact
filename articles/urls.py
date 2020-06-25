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
    ArticleViewSet,
    ArticleDetailView,
    ArticleCreateView,
    ArticleDeleteView,
    ArticleEditViewSet,
    DraftViewSet,
    DraftDetailView,
    DraftDeleteView,
)
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register(r'drafts', DraftViewSet, basename='drafts')
router.register(r'edit', ArticleEditViewSet, basename='article-edit')
router.register(r'', ArticleViewSet, basename='articles')

urlpatterns = [
    path('create/', ArticleCreateView.as_view(), name='article-create'),
    path('<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
    path('delete/<int:pk>/', ArticleDeleteView.as_view(), name='article-delete'),
    path('drafts/<int:user>/', DraftDetailView.as_view(), name='draft-detail'),
    path('drafts/delete/<int:pk>/', DraftDeleteView.as_view(), name='draft-delete'),
    path('', include(router.urls)),
]
urlpatterns += re_path('.*', include(router.urls)),
