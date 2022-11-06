from riplab3_app.models import Quest
from riplab3_app.models import Genre
from riplab3_app.models import Booking
from rest_framework import serializers


class QuestSerializer(serializers.ModelSerializer):
    # organizer_name = serializers.CharField(source='organizer.organizer_name')
    # genre_name = serializers.CharField(source='genre.genre_name')

    class Meta:
        # Модель, которую мы сериализуем
        model = Quest
        # Поля, которые мы сериализуем
        # fields = ["id_quest", "quest_name", "organizer_name", "address", "genre_name", "capacity", "description",
        #           "preview_pic", "price"]
        fields = ["id_quest", "quest_name", "organizer", "address", "genre", "capacity", "description",
                  "preview_pic", "price"]
        # fields = "__all__"


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        # Модель, которую мы сериализуем
        model = Genre
        # Поля, которые мы сериализуем
        fields = ["id_genre", "genre_name"]


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        # Модель, которую мы сериализуем
        model = Booking
        # Поля, которые мы сериализуем
        fields = ["id_booking", "quest", "client", "status", "booking_date", "manager"]


# class BookingOnDateSerializer(serializers.ModelSerializer):
#     bookings__count = serializers.IntegerField()
#
#     class Meta:
#         model = Booking
#         fields = ['bookings__count']


class CountBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = 'all'

    def to_representation(self, instance):

        print(self.context)

        representation = {
            'count': self.get_count(instance, self.context['booking_date']),
        }
        return representation

    def get_count(self, obj, booking_date):
        # print(booking_date)
        # date=datetime.datetime.strptime(ID,'%Y-%m-%d')
        count = Booking.objects.filter(booking_date=booking_date).count()
        return count


# class BookingOnDateSerializer(serializers.ModelSerializer):
#     total_bookings = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Booking
#         fields = ['total_bookings']
