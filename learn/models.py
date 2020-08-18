from django.db import models
from django.contrib.postgres.fields import ArrayField


class Topic(models.Model):
    type = models.CharField(default='', max_length=50)
    title = models.CharField(default='', max_length=50)
    title_id = models.CharField(default='', max_length=50)
    content = models.TextField(default='')
    contributors = ArrayField(models.CharField(default='', max_length=5), default=list)
    
    def __str__(self):
        return self.title


class Review(models.Model):
    type = models.CharField(default='', max_length=50)
    edit = models.BooleanField(default=False)
    title = models.CharField(default='', max_length=50)
    title_id = models.CharField(default='', max_length=50)
    content = models.TextField(default='')
    contributors = ArrayField(models.CharField(default='', max_length=5), default=list)
    
    def __str__(self):
        return self.title
# Create your models here.
