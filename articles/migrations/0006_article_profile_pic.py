# Generated by Django 3.0.3 on 2020-06-18 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_auto_20200616_0703'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='profile_pic',
            field=models.CharField(default='', max_length=100),
        ),
    ]
