from django.shortcuts import render
from .models import Article
from .serializers import ArticleSerializer
from rest_framework import viewsets, generics, views
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()


class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]