# Generated by Django 3.0.3 on 2020-07-29 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0006_auto_20200724_2253'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title_id',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='topic',
            name='title_id',
            field=models.CharField(default='', max_length=50),
        ),
    ]
