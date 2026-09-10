from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import User

class IsManagerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return bool(request.user and User.objects.filter(pk=request.user.id, groups__name='Manager').exists())

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and User.objects.filter(pk=request.user.id, groups__name='Manager').exists())