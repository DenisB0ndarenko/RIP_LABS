# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User


class Status(models.Model):
    id_status = models.AutoField(primary_key=True)
    status_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'Status'


class Booking(models.Model):
    id_booking = models.AutoField(primary_key=True)
    quest = models.ForeignKey('Quest', models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)
    status = models.ForeignKey(Status, models.DO_NOTHING)
    booking_date = models.DateField()

    class Meta:
        unique_together = (('quest', 'booking_date'),)
        managed = False
        db_table = 'booking'



class Genre(models.Model):
    id_genre = models.AutoField(primary_key=True)
    genre_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'genre'


class Organizer(models.Model):
    id_organizer = models.AutoField(primary_key=True)
    organizer_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'organizer'


class Quest(models.Model):
    id_quest = models.AutoField(primary_key=True)
    quest_name = models.CharField(unique=True, max_length=50)
    organizer = models.ForeignKey(Organizer, models.DO_NOTHING)
    address = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, models.DO_NOTHING)
    capacity = models.IntegerField()
    description = models.CharField(max_length=200, blank=True, null=True)
    preview_pic = models.CharField(max_length=500)
    price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'quest'
