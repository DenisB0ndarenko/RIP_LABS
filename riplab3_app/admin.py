from django.contrib import admin

# Register your models here.
from .models import Genre
from .models import User
from .models import Status
from .models import Organizer
from .models import Client
from .models import Quest
from .models import Booking

admin.site.register(Genre)
admin.site.register(User)
admin.site.register(Status)
admin.site.register(Organizer)
admin.site.register(Client)
admin.site.register(Quest)
admin.site.register(Booking)
