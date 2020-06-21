from rest_framework import serializers
from .models import Article


class AllArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'user', 'first_name', 'last_name', 'title', 'subtitle', 'cover',)

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'user', 'first_name', 'last_name', 'title', 'subtitle', 'content', 'cover', 'created_at',)