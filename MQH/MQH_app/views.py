# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
# from datetime import datetime
# from django.db.models import Count, Case, When, IntegerField
from MQH_app.serializers import UserSerializer
from MQH_app.serializers import LoginRequestSerializer
from MQH_app.serializers import QuestSerializer
from MQH_app.serializers import GenreSerializer
# from MQH_app.serializers import BookingSerializer
from MQH_app.serializers import ExtBookingSerializer
from MQH_app.serializers import RealExtBookingSerializer
from MQH_app.serializers import CountBookingsSerializer
from MQH_app.models import Quest
from MQH_app.models import Genre
from MQH_app.models import Booking
from django.db.models import Max, Min, Avg
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView


@permission_classes([IsAuthenticatedOrReadOnly])
@authentication_classes([JWTAuthentication])
class QuestViewSet(viewsets.ModelViewSet):
    # queryset для фильтрации квестов по имени и цене
    # queryset = Quest.objects.all().order_by('quest_name')
    serializer_class = QuestSerializer  # Сериализатор для модели

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

# информации о стоимости квестов
@api_view(['GET'])
@permission_classes([AllowAny])
def get_quest_pricing(request):
    return Response(Quest.objects.aggregate(max_price=Max('price'), min_price=Min('price'), average_cost=Avg('price')))


class GenreViewSet(viewsets.ModelViewSet):
    # queryset для сортировки жанров по имени
    queryset = Genre.objects.all().order_by('genre_name')
    serializer_class = GenreSerializer  # Сериализатор для модели


# class BookingViewSet(viewsets.ModelViewSet):
#     # queryset для сортировки брони по дате
#     queryset = Booking.objects.all().order_by('booking_date')
#     serializer_class = BookingSerializer  # Сериализатор для модели

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
            queryset = Booking.objects.filter(user_id=params['user'], status_id=1)
            print('bookings')
            print(queryset)
        else:
            queryset = Booking.objects.all()
        return queryset



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


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request: Request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return Response({'status': 'Success'})
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(UserSerializer(request.user).data)
    return Response({
        'data': UserSerializer(request.user).data
    })
