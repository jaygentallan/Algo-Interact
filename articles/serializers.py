from rest_framework import serializers
from .models import Article, Draft


class AllArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'user', 'first_name', 'last_name', 'title', 'subtitle', 'cover',)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'user', 'first_name', 'last_name', 'title', 'subtitle', 'content', 'cover', 'created_at',)


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ('id', 'user', 'title', 'subtitle', 'content', 'cover', 'created_at',)