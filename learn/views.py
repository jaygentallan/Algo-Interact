from django.shortcuts import render, get_object_or_404
from django.views.generic.edit import DeleteView
from .models import Topic, Review
from .serializers import TopicSerializer, ReviewSerializer
from rest_framework.decorators import action
from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)


# Viewset for retrieving all Topics
class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


# API View for retrieving a Topic
class TopicDetailView(generics.ListAPIView):
    model = Topic
    serializer_class = TopicSerializer
    permissions = (IsAuthenticated, )

    def get_queryset(self):
        title_id = self.kwargs['title_id'].lower()
        queryset = Topic.objects.all().filter(title_id=title_id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        result = serializer.data[0]
        return Response(result)


# API View for creating Topics
class TopicCreateView(generics.CreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permissions = [AllowAny]


# API View for deleting a Topic
class TopicDeleteView(views.APIView):
    model = Topic
    serializer_class = TopicSerializer
    permissions = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        queryset = Topic.objects.all().filter(id=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# API View for editing a Topic
class TopicEditViewSet(viewsets.ViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def retrieve(self, request, pk=None):
        queryset = Topic.objects.filter(id=pk)
        topic = get_object_or_404(queryset, id=pk)
        return Response(TopicSerializer(topic).data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        queryset = Topic.objects.filter(id=pk)
        topic = get_object_or_404(queryset, id=pk)
        serializer = TopicSerializer(topic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(TopicSerializer(topic).data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# API View for retrieving the Topic Tabs
class TopicTabsView(generics.ListAPIView):
    model = Topic
    serializer_class = TopicSerializer
    permissions = (IsAuthenticated, )

    def get_queryset(self):
        type = self.kwargs['type']
        queryset = Topic.objects.all().filter(type=type)
        return queryset


# Viewset for retrieving all Reviews
class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


# API View for retrieving a Review
'''
class ReviewDetailView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAdminUser]
'''


# API View for retrieving a Review
class ReviewDetailView(generics.ListAPIView):
    model = Review
    serializer_class = ReviewSerializer
    permissions = (IsAuthenticated, )

    def get_queryset(self):
        title_id = self.kwargs['title_id'].lower()
        queryset = Review.objects.all().filter(title_id=title_id)
        return queryset
    
    '''
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
    '''


# API View for creating a Review
class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permissions = [AllowAny]


# API View for deleting a Review
class ReviewDeleteView(views.APIView):
    model = Review
    serializer_class = ReviewSerializer
    permissions = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        queryset = Review.objects.all().filter(id=pk)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)