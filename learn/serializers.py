from rest_framework import serializers
from .models import Topic, Review


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'type', 'title', 'title_id', 'content', 'contributors', )


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'type', 'edit', 'title', 'title_id', 'content', 'contributors', )