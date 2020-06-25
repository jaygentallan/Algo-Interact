from django.shortcuts import render, get_object_or_404
from django.views.generic.edit import DeleteView
from django.http import JsonResponse
from .models import Article, Draft
from .serializers import AllArticlesSerializer, ArticleSerializer, DraftSerializer
from rest_framework.decorators import action
from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)


# Viewset for retrieving all Articles
class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = AllArticlesSerializer


# API View for retrieving an article
class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]


# API View for creating articles
class ArticleCreateView(generics.CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permissions = [AllowAny]


# API View for deleting a article
class ArticleDeleteView(views.APIView):
    model = Article
    serializer_class = ArticleSerializer
    permissions = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        draft = self.get_object(pk)
        serializer = ArticleSerializer(draft)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        queryset = Article.objects.all().filter(id=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleEditViewSet(viewsets.ViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def retrieve(self, request, pk=None):
        queryset = Article.objects.filter(id=pk)
        article = get_object_or_404(queryset, id=pk)
        return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        queryset = Article.objects.filter(id=pk)
        article = get_object_or_404(queryset, id=pk)
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# Viewset of all the Drafts of all users
class DraftViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer
    permissions = [IsAuthenticated]


# API View for Listing Drafts of a specificer user
class DraftDetailView(generics.ListAPIView):
    model = Draft
    serializer_class = DraftSerializer
    permissions = (IsAuthenticated, )

    def get_queryset(self):
        queryset = Draft.objects.all().filter(user=self.kwargs['user'])
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        result = []
        if (len(serializer.data) >= 1):
            keys = [x for x in [y.keys() for y in serializer.data][0]]

            for i in range(len(serializer.data)):
                draft = {}
                for j in range(len(serializer.data[i])):
                    draft[keys[j]] = serializer.data[i][keys[j]]
                result.append(draft)
        return Response(result)


# API View for deleting a draft
class DraftDeleteView(views.APIView):
    model = Draft
    serializer_class = DraftSerializer
    permissions = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Draft.objects.get(pk=pk)
        except Draft.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        draft = self.get_object(pk)
        serializer = DraftSerializer(draft)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        queryset = Draft.objects.all().filter(id=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)