# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Client(models.Model):
    id_client = models.AutoField(primary_key=True)
    client_name = models.CharField(max_length=50)
    user = models.ForeignKey('User', models.DO_NOTHING)
    phone = models.CharField(unique=True, max_length=20)
    email = models.CharField(unique=True, max_length=30)

    class Meta:
        managed = False
        db_table = 'Client'


class Status(models.Model):
    id_status = models.AutoField(primary_key=True)
    status_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'Status'


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    login = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'User'


class Booking(models.Model):
    id_booking = models.AutoField(primary_key=True)
    quest = models.ForeignKey('Quest', models.DO_NOTHING)
    client = models.ForeignKey(Client, models.DO_NOTHING)
    status = models.ForeignKey(Status, models.DO_NOTHING)
    booking_date = models.DateField()
    manager = models.ForeignKey('Organizer', models.DO_NOTHING)

    class Meta:
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
    user = models.ForeignKey(User, models.DO_NOTHING)

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
