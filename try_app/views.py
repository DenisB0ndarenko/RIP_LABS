from django.shortcuts import render
from datetime import date
from try_app.models import Quest

# Create your views here.
def home(request):
    return render(request, 'home.html', {'data': {
        'current_date': date.today(),
    }})

def quests(request):
    return render(request, 'quests.html', {'data': {
        'current_date': date.today(),
        'quests': Quest.objects.all()
    }})


def GetQuest(request, id):
    return render(request, 'quest.html', {'data': {
        'current_date': date.today(),
        'quest': Quest.objects.filter(id_quest=id)[0],
    }})
