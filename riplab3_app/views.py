# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from datetime import datetime
from django.db.models import Count, Case, When, IntegerField
from riplab3_app.serializers import QuestSerializer
from riplab3_app.serializers import GenreSerializer
from riplab3_app.serializers import BookingSerializer
# from riplab3_app.serializers import BookingOnDateSerializer
from riplab3_app.serializers import CountBookingsSerializer
from riplab3_app.models import Quest
from riplab3_app.models import Genre
from riplab3_app.models import Booking


class QuestViewSet(viewsets.ModelViewSet):
    # queryset для сортировки квестов по имени
    queryset = Quest.objects.all().order_by('quest_name')
    serializer_class = QuestSerializer  # Сериализатор для модели


class GenreViewSet(viewsets.ModelViewSet):
    # queryset для сортировки жанров по имени
    queryset = Genre.objects.all().order_by('genre_name')
    serializer_class = GenreSerializer  # Сериализатор для модели


class BookingViewSet(viewsets.ModelViewSet):
    # queryset для сортировки брони по дате
    queryset = Booking.objects.all().order_by('booking_date')
    serializer_class = BookingSerializer  # Сериализатор для модели


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






# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.annotate(
#             total_trucks=Count('trucks'),
#             total_capacity=Sum('trucks__capacity'))
#     serializer_class = BookingOnDateSerializer
#
# class IceCreamCompanyViewSet(viewsets.ModelViewSet):
#     queryset = IceCreamCompany.objects.all()
#     serializer_class = IceCreamCompanySerializer
#
#     def get_queryset(self):
#         return IceCreamCompany.objects.annotate(
#             total_trucks=Count('trucks'),
#             total_capacity=Sum('trucks__capacity')
#         )


# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(booking_date='2022-8-12')
#     serializer_class = BookingOnDateSerializer
#
#     def get_queryset(self):
#         return Booking.objects.annotate(
#             bookings__count=Count(booking_date='2022-8-12', expression=True)
#         )

# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.all()
#     serializer_class = BookingOnDateSerializer
#
#     def get_queryset(self):
#         return Booking.objects.annotate(
#             total_bookings=Count(booking_date='2022-8-12', expression=True)
#         )




# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(booking_date='2022-8-12')
#     serializer_class = BookingOnDateSerializer
#
#     def get_queryset(self):
#         return Booking.objects.aggregate(
#             bookings__count=Count(Case(
#                 When(booking_date='2022-11-12', then=1),
#                 output_field=IntegerField()
#             ))
#         )




# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(booking_date='2022-11-12')
#     serializer_class = BookingOnDateSerializer
#
#     def get_queryset(self):
#         return Booking.objects.aggregate(
#             Count(Case(
#                 When(booking_date='2022-11-12', then=1),
#                 output_field = IntegerField()
#             ))
#         )


# class AgrBookViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.filter(booking_date='2022-11-12')
#     total_bookings = queryset.count()
#     serializer_class = BookingOnDateSerializer
#
#     # def get_queryset(self):
#     #     total_bookings = self.queryset.count()
#     #     return total_bookings
