from django.contrib import admin
from .models import Deposit, Profile, Support

# Register your models here.

@admin.register(Deposit)
class DepositModel(admin.ModelAdmin):
    list_display = ('user', 'deposit', 'plan', 'status')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'country', 'state', 'city', 'address', 'zip_code')


@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'message')
    list_filter = ('user', 'email')
    search_fields = ('email',)