import os
from .base import *


DEBUG = True


SECURE_SSL_REDIRECT = False


CORS_REPLACE_HTTPS_REFERER      = False
HOST_SCHEME                     = "http://"
SECURE_PROXY_SSL_HEADER         = None
SECURE_SSL_REDIRECT             = False
SESSION_COOKIE_SECURE           = False
CSRF_COOKIE_SECURE              = False
SECURE_HSTS_SECONDS             = None
SECURE_HSTS_INCLUDE_SUBDOMAINS  = False
SECURE_FRAME_DENY               = False


HOST = "http://localhost:8000"


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
    #os.path.join(BASE_DIR, 'media/profile_pics'),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'