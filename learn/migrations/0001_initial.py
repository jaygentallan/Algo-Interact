# Generated by Django 3.0.3 on 2020-07-24 08:59

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Learn',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=50)),
                ('content', models.TextField(default='')),
                ('contributers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default='', max_length=5), size=1)),
            ],
        ),
    ]
