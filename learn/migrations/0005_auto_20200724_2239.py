# Generated by Django 3.0.3 on 2020-07-24 22:39

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0004_auto_20200724_2239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='contributors',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default='', max_length=5), default=list, size=None),
        ),
    ]