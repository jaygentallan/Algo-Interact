from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(default='', max_length=50)
    last_name = models.CharField(default='', max_length=50)
    title = models.CharField(default='', max_length=50)
    subtitle = models.TextField(default='', max_length=100)
    content = models.TextField(default='')
    cover = models.ImageField(default='media/article_pics/default.jpg', upload_to='media/article_pics')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class Draft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(default='', max_length=50)
    subtitle = models.TextField(default='', max_length=100)
    content = models.TextField(default='')
    cover = models.ImageField(default='media/draft_pics/default.jpg', upload_to='media/draft_pics')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title