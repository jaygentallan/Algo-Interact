# Generated by Django 3.0.3 on 2020-07-24 22:53

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0005_auto_20200724_2239'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='', max_length=50)),
                ('edit', models.BooleanField(default=False)),
                ('title', models.CharField(default='', max_length=50)),
                ('content', models.TextField(default='')),
                ('contributors', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default='', max_length=5), default=list, size=None)),
            ],
        ),
        migrations.RemoveField(
            model_name='topic',
            name='edit',
        ),
    ]