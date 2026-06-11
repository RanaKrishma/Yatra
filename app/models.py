from django.db import models
from django.db import models

from django.db import models
from django.contrib.auth.models import User

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    price_per_night = models.IntegerField(null=True, blank=True, default=0)
    description = models.TextField(blank=True, default='')
    def __str__(self):
        return self.name

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_type = models.CharField(max_length=100)
    price = models.IntegerField()  
    def __str__(self):
        return self.room_type    
# Create your models here.
class Contact(models.Model):
    Name = models.CharField(max_length=100)
    Email = models.EmailField()
    PhoneNumber = models.IntegerField()
    Message = models.CharField(max_length=200)
    def __str__(self):
        return self.Name

class Country(models.Model):
    country_name = models.CharField(max_length=50)
    country_img = models.ImageField(upload_to='country')


    def __str__(self):
        return self.country_name    
    
class Tours(models.Model):
    country_name = models.ForeignKey(Country, related_name='countries', on_delete=models.CASCADE)
    tours_name = models.CharField(max_length=50)
    tours_img = models.ImageField(upload_to='tours/')
    duration = models.IntegerField()
    include = models.TextField()
    rate = models.IntegerField()
    rating = models.PositiveSmallIntegerField(default=1)
    is_published = models.BooleanField(default=False)


    def __str__(self):
        return self.tours_name
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tours, on_delete=models.CASCADE)
    # new foreign keys are optional until the booking form is updated
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE,
                              null=True, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE,
                             null=True, blank=True)

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    order_id = models.CharField(max_length=200, null=True, blank=True)
    payment_id = models.CharField(max_length=200, null=True, blank=True)
    paid = models.BooleanField(default=False)
    persons = models.PositiveIntegerField()
    message = models.TextField(blank=True)
    total_amount = models.IntegerField(null=True, blank=True)
    razorpay_order_id = models.CharField(max_length=200, blank=True, null=True)
    razorpay_payment_id = models.CharField(max_length=200, blank=True, null=True)
    razorpay_signature = models.CharField(max_length=200, blank=True, null=True)
    paid = models.BooleanField(default=False)
    # dates are also optional for now to avoid requiring defaults during migration
    check_in = models.DateField(null=True, blank=True)
    check_out = models.DateField(null=True, blank=True)

    booked_at = models.DateTimeField(auto_now_add=True)
    invoice_number = models.CharField(max_length=50, blank=True, null=True)
    invoice_created_at = models.DateTimeField(null=True, blank=True)
    
    # Cancellation fields
    is_cancelled = models.BooleanField(default=False)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    cancellation_reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} - {self.tour.tours_name}"


class Traveler(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='travelers')
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    traveler_number = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.name} (Age: {self.age}, Traveler {self.traveler_number})"

    class Meta:
        ordering = ['traveler_number']


class Invoice(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="invoice")
    invoice_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    base_price = models.FloatField()
    room_price = models.FloatField(default=0)
    subtotal = models.FloatField()
    discount_percent = models.PositiveSmallIntegerField(default=0)
    discount_amount = models.FloatField(default=0)
    gst_amount = models.FloatField(default=0)
    amount_paid = models.FloatField()

    order_id = models.CharField(max_length=200, blank=True, null=True)
    payment_id = models.CharField(max_length=200, blank=True, null=True)
    payment_signature = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.invoice_number} ({self.booking})"


class Payment(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="payments")
    order_id = models.CharField(max_length=200, blank=True, null=True)
    payment_id = models.CharField(max_length=200, blank=True, null=True)
    signature = models.CharField(max_length=200, blank=True, null=True)
    amount = models.FloatField()
    currency = models.CharField(max_length=10, default="INR")
    status = models.CharField(max_length=20, default="success")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.payment_id or 'payment'} ({self.booking})"


class BlogComment(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    website = models.URLField(blank=True, default='')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.created_at:%Y-%m-%d})"


class Feedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name    


class Registration(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"

    class Meta:
        ordering = ['-created_at']


class LoginAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='login_attempts')
    username = models.CharField(max_length=150)
    success = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "Success" if self.success else "Failed"
        return f"{self.username} - {status} ({self.login_time})"

    class Meta:
        ordering = ['-login_time']
        verbose_name = "Login Attempt"
        verbose_name_plural = "Login Attempts"

