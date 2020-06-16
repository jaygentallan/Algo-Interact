from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'user_id', 'first_name', 'last_name', 'title', 'subtitle', 'content', 'cover', 'created_at',)