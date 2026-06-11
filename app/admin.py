from django.contrib import admin
from .models import Booking, Invoice, Payment, Registration, LoginAttempt
from .models import *

# Register your models here.
@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('full_name', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    fields = ('full_name', 'email', 'phone', 'password', 'created_at', 'updated_at')

@admin.register(LoginAttempt)
class LoginAttemptAdmin(admin.ModelAdmin):
    list_display = ('username', 'success', 'login_time', 'ip_address')
    list_filter = ('success', 'login_time')
    search_fields = ('username', 'user__email')
    readonly_fields = ('login_time', 'username', 'success', 'ip_address', 'user')
    fields = ('user', 'username', 'success', 'ip_address', 'login_time')

admin.site.register(Contact)
admin.site.register(Country)
admin.site.register(Tours)
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "first_name",
        "last_name",
        "tour",
        "persons",
        "paid",
        "total_amount",
        "is_cancelled",
        "booked_at",
    )
    list_filter = ("paid", "is_cancelled", "booked_at", "tour")
    search_fields = ("first_name", "last_name", "email", "razorpay_order_id", "razorpay_payment_id")
    
    readonly_fields = ('booked_at', 'cancelled_at', 'razorpay_order_id', 'razorpay_payment_id')
    
    fieldsets = (
        ("Booking Information", {
            'fields': ('user', 'tour', 'persons', 'booked_at')
        }),
        ("Guest Details", {
            'fields': ('first_name', 'last_name', 'email', 'phone_number')
        }),
        ("Hotel & Dates", {
            'fields': ('hotel', 'room', 'check_in', 'check_out', 'message')
        }),
        ("Payment Information", {
            'fields': ('paid', 'total_amount', 'razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature')
        }),
        ("Invoice", {
            'fields': ('invoice_number', 'invoice_created_at')
        }),
        ("Cancellation", {
            'fields': ('is_cancelled', 'cancelled_at', 'cancellation_reason'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Traveler)
class TravelerAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'booking', 'traveler_number')
    list_filter = ('booking__tour', 'traveler_number', 'age')
    search_fields = ('name', 'booking__first_name', 'booking__last_name')
    readonly_fields = ('booking', 'traveler_number')
    fields = ('booking', 'name', 'age', 'traveler_number')

admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(Feedback)
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = (
        "invoice_number",
        "booking",
        "amount_paid",
        "payment_id",
        "created_at",
    )
    list_filter = ("created_at",)
    search_fields = ("invoice_number", "payment_id", "booking__email")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("payment_id", "order_id", "booking", "amount", "currency", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("payment_id", "order_id", "booking__email")
