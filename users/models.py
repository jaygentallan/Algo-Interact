from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(default='', max_length=30)
    image = models.ImageField(default='media/profile_pics/default.png', upload_to='media/profile_pics')

    def __str__(self):
        return f"{self.user.username}'s Profile"