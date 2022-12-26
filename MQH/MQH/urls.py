from django.contrib import admin
from MQH_app import views as quest_hub_views
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'quests', quest_hub_views.QuestViewSet, basename='quests')
router.register(r'genres', quest_hub_views.GenreViewSet)
router.register(r'bookings', quest_hub_views.BookingViewSet, basename='bookings')
# router.register(r'bookingsondate', quest_hub_views.AgrBookViewSet)
# router.register(r'bookingsondate', quest_hub_views.CountBookingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('add_user', quest_hub_views.getJson, name='getJson'),
    path('api/user', quest_hub_views.user, name='user'),
    path(r'questPricing/', quest_hub_views.get_quest_pricing),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('admin/', admin.site.urls),
]
