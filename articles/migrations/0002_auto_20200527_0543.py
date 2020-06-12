# Generated by Django 3.0.3 on 2020-05-27 05:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='body',
            new_name='content',
        ),
        migrations.RenameField(
            model_name='article',
            old_name='short_description',
            new_name='subtitle',
        ),
        migrations.RemoveField(
            model_name='article',
            name='updated_at',
        ),
    ]