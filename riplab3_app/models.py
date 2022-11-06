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


# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group'


# class AuthGroupPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)


# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)


# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.BooleanField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     email = models.CharField(max_length=254)
#     is_staff = models.BooleanField()
#     is_active = models.BooleanField()
#     date_joined = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user'


# class AuthUserGroups(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)


# class AuthUserUserPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user', 'permission'),)


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


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.SmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'


# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)


# class DjangoMigrations(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_migrations'


# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_session'


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
