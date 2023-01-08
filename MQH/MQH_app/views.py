# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
# from datetime import datetime
# from django.db.models import Count, Case, When, IntegerField
from MQH_app.serializers import UserSerializer
from MQH_app.serializers import QuestSerializer
from MQH_app.serializers import NewQuestSerializer
from MQH_app.serializers import ExtQuestSerializer
from MQH_app.serializers import GenreSerializer
from MQH_app.serializers import OrganizerSerializer
# from MQH_app.serializers import BookingSerializer
from MQH_app.serializers import StatusSerializer
from MQH_app.serializers import ExtBookingSerializer
from MQH_app.serializers import RealExtBookingSerializer
from MQH_app.serializers import CountBookingsSerializer
from MQH_app.models import Quest
from MQH_app.models import Genre
from MQH_app.models import Organizer
from MQH_app.models import Booking
from MQH_app.models import Status
from django.db.models import Max, Min, Avg
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsManagerOrReadOnly, IsManager
from rest_framework.response import Response
from rest_framework.request import Request


@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
class QuestViewSet(viewsets.ModelViewSet):
    # queryset для фильтрации квестов по имени и цене
    # queryset = Quest.objects.all().order_by('quest_name')
    serializer_class = QuestSerializer  # Сериализатор для модели

    def get_serializer_class(self):
        params = self.request.query_params.dict()
        if (self.request.method == 'GET' and not ('manager' in params)):
            return QuestSerializer
        else:
            return NewQuestSerializer

    def get_queryset(self):
        queryset = Quest.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(quest_name__icontains=params['name'])
            except:
                pass
            try:
                queryset = queryset.filter(price__lte=params['max_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(price__gte=params['min_cost'])
            except:
                pass
        return queryset.order_by("quest_name")


@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
class QuestmaViewSet(viewsets.ModelViewSet):
    # queryset для фильтрации квестов по имени и цене
    # queryset = Quest.objects.all().order_by('quest_name')
    serializer_class = ExtQuestSerializer  # Сериализатор для модели

    # def get_serializer_class(self):
    #     params = self.request.query_params.dict()
    #     if (self.request.method == 'GET' and not ('manager' in params)):
    #         return QuestSerializer
    #     else:
    #         return NewQuestSerializer

    def get_queryset(self):
        queryset = Quest.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(quest_name__icontains=params['name'])
            except:
                pass
            try:
                queryset = queryset.filter(price__lte=params['max_cost'])
            except:
                pass
            try:
                queryset = queryset.filter(price__gte=params['min_cost'])
            except:
                pass
        return queryset.order_by("quest_name")

# информация о стоимости квестов
@api_view(['GET'])
@permission_classes([AllowAny])
def get_quest_pricing(request):
    return Response(Quest.objects.aggregate(max_price=Max('price'), min_price=Min('price'), average_cost=Avg('price')))


class GenreViewSet(viewsets.ModelViewSet):
    # queryset для сортировки жанров по имени
    queryset = Genre.objects.all().order_by('genre_name')
    serializer_class = GenreSerializer  # Сериализатор для модели


class OrganizerViewSet(viewsets.ModelViewSet):
    # queryset для сортировки организаторов по имени
    queryset = Organizer.objects.all().order_by('organizer_name')
    serializer_class = OrganizerSerializer  # Сериализатор для модели


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class BookingViewSet(viewsets.ModelViewSet):
    # serializer_class = BookingSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RealExtBookingSerializer
        else:
            return ExtBookingSerializer

    def get_queryset(self):
        params = self.request.query_params.dict()
        if 'user' in params:
            queryset = Booking.objects.filter(user_id=params['user'], status_id__in=[1, 2]).order_by("status_id")
            print('bookings')
            print(queryset)
        else:
            queryset = Booking.objects.all().order_by("status_id")
        return queryset


@permission_classes([IsManager])
@authentication_classes([JWTAuthentication])
class AllBookingViewSet(viewsets.ModelViewSet):
    # serializer_class = BookingSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RealExtBookingSerializer
        else:
            return ExtBookingSerializer

    def get_queryset(self):
        params = self.request.query_params.dict()
        if 'status' in params and 'start' in params and 'end' in params:
            queryset = Booking.objects.filter(status_id=params['status'], booking_date__gte=params['start'],
                                              booking_date__lte=params['end']).order_by("booking_date")
            print('bookings')
            print(queryset)
        elif 'start' in params and 'end' in params:
            queryset = Booking.objects.filter(booking_date__gte=params['start'],
                                              booking_date__lte=params['end']).order_by("status_id")
            print('bookings')
            print(queryset)
        elif 'status' in params:
            queryset = Booking.objects.filter(status_id=params['status']).order_by("booking_date")
            print('bookings')
            print(queryset)
        else:
            queryset = Booking.objects.all().order_by("status_id")
            print('bookings')
            print(queryset)
        return queryset


@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
class StatusViewSet(viewsets.ModelViewSet):
    # queryset для статусов
    queryset = Status.objects.all().order_by('id_status')
    serializer_class = StatusSerializer  # Сериализатор для модели



class CountBookingsViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.filter(id_booking=1)
    # def get_queryset(self):
    #     queryset = Booking.objects.filter(id_booking=1)
    #     print(self.kwargs)
    #     return queryset

    def get_serializer(self, *args, **kwargs):
        serializer_class = CountBookingsSerializer
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'booking_date': "2022-11-12"
            # 'booking_date': datetime.strftime(self.kwargs['pk'], "%Y-%m-%d")
        }


@api_view(['GET', 'POST'])
def getJson(request):
    if request.method == 'POST':
        print(request.data)
        user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
        user.save()
        print('NEW USER DATA:')
        print(request.data['username'], request.data['email'], request.data['password'])
        return HttpResponse("{'status': 'ok'}")
    else:
        return HttpResponse("{'status': 'not ok'}")


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(UserSerializer(request.user).data)
    userInfo = dict(UserSerializer(request.user).data)
    return Response({
        'data': UserSerializer(request.user).data,
        'groups': User.objects.get(id=userInfo['id']).groups.values_list('name', flat=True)
    })
