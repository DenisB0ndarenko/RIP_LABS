from django.contrib import admin
from .models import Genre
from .models import Status
from .models import Organizer
from .models import Quest
from .models import Booking
# Register your models here.

admin.site.register(Genre)
admin.site.register(Status)
admin.site.register(Organizer)
admin.site.register(Quest)
admin.site.register(Booking)
