from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    first_name = models.CharField(
        max_length=255,
    )
    last_name = models.CharField(
        max_length=255,
    )
    age = models.IntegerField()
    cp = models.IntegerField()
    user = models.ForeignKey(User, related_name="user_id")

    def __str__(self):

        return ' '.join([
            self.first_name,
            self.last_name,
            self.age,
            self.user,
        ])
        
