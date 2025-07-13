from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
import json

from django.contrib.auth.models import AbstractUser
from django.db import models

def user_profile_upload_path(instance, filename):
    # Upload path: MEDIA_ROOT/profile/user_<id>/<filename>
    return f'profile/user_{instance.id}/{filename}'

class CustomUser(AbstractUser):
    profile_image = models.ImageField(upload_to=user_profile_upload_path, null=True, blank=True)

    def __str__(self):
        return self.username


class AptitudeQuestion(models.Model):
    question_text = models.TextField()
    options = models.TextField()  # Store JSON string
    correct_answer = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_options(self):
        return json.loads(self.options)

    def __str__(self):
        return self.question_text[:50]

class UserQuestionMap(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(AptitudeQuestion, on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"User: {self.user.username} | Question: {self.question.id}"
