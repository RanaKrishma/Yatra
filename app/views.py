# Django imports
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone
from django.conf import settings
from urllib.parse import quote_plus

# Third-party imports
from urllib import request
from xmlrpc import client

# Local imports
from app.models import Contact, Tours, Booking, Feedback, Invoice, Payment, Traveler
from .models import *
from pro import settings


# Create your views here.
def _generate_invoice_number(booking_id):
    date_part = timezone.now().strftime("%Y%m%d")
    return f"INV-{date_part}-{booking_id}"

def index(request):
    c = Country.objects.all()
    india_tours = Tours.objects.filter(country_name__country_name__iexact="India")
    reviews = Feedback.objects.all().order_by('-created_at')[:6]

    for tour in india_tours:
        tour.full_stars = range(tour.rating)
        tour.empty_stars = range(5 - tour.rating)

    return render(request, 'index.html', {
        'c': c,
        'india_tours': india_tours,
        'reviews': reviews,
    })
def travelsearch(request):
    return render(request,'travelsearch.html')
def base(request):
    return render(request,'base.html')
# def base1(request):
#     return render(request,'base1.html')
# def login(request):
#     return render(request,'login.html')
# def login(request):
#     return render(request,'login.html')
def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def delogin(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            
            if not username or not password:
                messages.error(request, "Please enter both username and password")
                return redirect('/login/')
            
            # Get client IP address
            ip_address = get_client_ip(request)
     
            user = authenticate(request, username=username, password=password)
     
            if user is not None:
                # Save successful login attempt
                try:
                    LoginAttempt.objects.create(
                        user=user,
                        username=username,
                        success=True,
                        ip_address=ip_address
                    )
                except Exception as e:
                    print(f"Error saving login attempt: {str(e)}")
                
                login(request, user)
                messages.success(request, f"Welcome back, {user.first_name}!")
                return redirect('/')
            else:
                # Save failed login attempt
                try:
                    LoginAttempt.objects.create(
                        user=None,
                        username=username,
                        success=False,
                        ip_address=ip_address
                    )
                except Exception as e:
                    print(f"Error saving failed login attempt: {str(e)}")
                
                messages.error(request, "Bad Credentials - Please check your username/email and password")
                return redirect('/login/')
        
        except Exception as e:
            messages.error(request, f"An error occurred during login: {str(e)}")
            print(f"Login error: {str(e)}")
            return redirect('/login/')
    
    return render(request,'login.html')

def register(request):
    if request.method == "POST":
        full_name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        password = request.POST.get('password', '')

        # Validate that email is not already registered
        if Registration.objects.filter(email=email).exists():
            messages.error(request, "This email is already registered")
            return redirect('/register/')

        try:
            # Create Registration record
            registration = Registration.objects.create(
                full_name=full_name,
                email=email,
                phone=phone,
                password=password  # In production, consider hashing this
            )

            # Create User account with full_name as username
            user = User.objects.create_user(
                username=full_name,  # using full_name as username
                email=email,
                first_name=full_name,
                password=password
            )

            # Send email to admin
            send_registration_email(full_name, email, phone)

            messages.success(request, f"Registration successful! Username: {full_name}. You can now login.")
            return redirect('/login/')

        except Exception as e:
            messages.error(request, f"Registration failed: {str(e)}")
            return redirect('/register/')

    return render(request, "register.html")


def send_registration_email(full_name, email, phone):
    """Send registration notification to admin email"""
    try:
        admin_email = 'ranakrishma03@gmail.com'
        subject = f"New User Registration - {full_name}"
        
        html_message = f"""
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New User Registration</h2>
                    <p style="color: #666; font-size: 14px;">A new user has registered on your Tours & Travels platform.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
                        <p><strong>Full Name:</strong> {full_name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Phone:</strong> {phone}</p>
                        <p><strong>Registration Time:</strong> {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        You can manage this user from the <a href="http://localhost:8000/admin/" style="color: #007bff;">Admin Panel</a>.
                    </p>
                    
                    <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                        This is an automated email. Please do not reply.
                    </p>
                </div>
            </body>
        </html>
        """
        
        plain_message = f"""
        New User Registration
        
        Full Name: {full_name}
        Email: {email}
        Phone: {phone}
        Registration Time: {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        You can manage this user from the Admin Panel: http://localhost:8000/admin/
        """
        
        from_email = settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER or 'no-reply@yourdomain.com'
        recipient_list = [admin_email]
        if email:
            recipient_list.append(email)

        email_msg = EmailMultiAlternatives(
            subject,
            plain_message,
            from_email,
            recipient_list
        )
        email_msg.attach_alternative(html_message, "text/html")
        email_msg.send()
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")

# def register(request):
#     return render(request,'register.html')        
def logout(request):
    return render(request,'logout.html')

def logout_user(request):
    if request.method == "POST":
        auth_logout(request)
    return redirect('/')
def aboutus(request):
    return render(request,'aboutus.html')
# def feedback(request):
#     return render(request,'feedback.html')

def forgot_password(request):
    return render(request,'forgot-password.html')

@login_required
def payment(request, booking_id):

    booking = Booking.objects.filter(id=booking_id, user=request.user).first()
    if not booking:
        messages.error(request, "Booking not found.")
        return redirect('my_bookings')

    if booking.paid:
        messages.info(request, "This booking has already been paid. Redirecting to invoice.")
        return redirect('invoice', booking_id=booking.id)

    t2 = booking.tour
    # base tour cost
    base_price = t2.rate * booking.persons
    # include room cost if chosen
    room_price = booking.room.price if booking.room else 0

    # apply 20% discount on subtotal (tour + room)
    subtotal = base_price + room_price
    discount_percent = 0.20
    discount_amount = round(subtotal * discount_percent, 2)

    # GST @10% on discounted subtotal
    gst_amount = round((subtotal - discount_amount) * 0.10, 2)

    total_price = subtotal - discount_amount + gst_amount

    upi_id = getattr(settings, "UPI_PAYMENT_ID", "yatratravel@upi")
    payment_note = f"Tour payment for booking {booking.id}"
    upi_string = (
        f"upi://pay?pa={upi_id}"
        f"&pn={quote_plus('Yatra Travel Agency')}"
        f"&am={total_price:.2f}"
        f"&cu=INR"
        f"&tn={quote_plus(payment_note)}"
    )

    context = {
        "booking": booking,
        "t2": t2,
        "base_price": base_price,
        "room_price": room_price,
        "discount": discount_amount,
        "discount_percent": int(discount_percent * 100),
        "gst": gst_amount,
        "total_price": total_price,
        "upi_id": upi_id,
        "upi_string": upi_string,
        "payment_note": payment_note,
    }

    # store computed total amount on booking if not already set
    if booking.total_amount != total_price:
        booking.total_amount = total_price
        booking.save(update_fields=["total_amount"])

    return render(request, 'payment.html', context)

def destination(request):
    c = Country.objects.all()
    t = Tours.objects.all()
    for rating in t:
        rating.full_stars = range(rating.rating)  # Full stars

        rating.empty_stars = range(5 - rating.rating)  # Empty stars

    return render(request,'destination.html',{'c':c})


def detail_tabs(request):
    return render(request,'detail-tabs.html')


@login_required
def booking(request, id):
    t2 = get_object_or_404(Tours, id=id)

    # fetch hotels and rooms for display; template can filter further if needed
    hotels = Hotel.objects.all()
    rooms = Room.objects.all()

    if request.method == "POST":
        persons = int(request.POST.get("persons") or 0)
        
        # Calculate total with discount for children under 5
        base_price = t2.rate
        total = 0
        children_under_5 = 0
        
        for i in range(1, persons + 1):
            age = int(request.POST.get(f"traveler_age_{i}") or 0)
            if age < 5:
                children_under_5 += 1
                total += base_price * 0.5  # 50% discount
            else:
                total += base_price

        hotel_id = request.POST.get("hotel")
        room_id = request.POST.get("room")
        check_in = request.POST.get("check_in") or None
        check_out = request.POST.get("check_out") or None

        booking = Booking.objects.create(
            user=request.user,
            tour=t2,
            hotel_id=hotel_id if hotel_id else None,
            room_id=room_id if room_id else None,
            first_name=request.POST.get("first_name"),
            last_name=request.POST.get("last_name"),
            phone_number=request.POST.get("phone_number"),
            email=request.POST.get("email"),
            persons=persons,
            message=request.POST.get("message"),
            total_amount=int(total),
            check_in=check_in,
            check_out=check_out,
        )

        # Save traveler names and ages
        for i in range(1, persons + 1):
            traveler_name = request.POST.get(f"traveler_name_{i}")
            traveler_age = int(request.POST.get(f"traveler_age_{i}") or 0)
            if traveler_name:
                Traveler.objects.create(
                    booking=booking,
                    name=traveler_name,
                    age=traveler_age,
                    traveler_number=i
                )

        return redirect('payment', booking_id=booking.id)

    return render(request, 'booking.html', {
        't2': t2,
        'hotels': hotels,
        'rooms': rooms,
    })
def home(request):

    reviews = Feedback.objects.all().order_by('-created_at')[:6]

    return render(request, "index.html", {
        "reviews": reviews
    })
def feedback(request):

    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        rating = request.POST.get('rating')
        message = request.POST.get('message')

        Feedback.objects.create(
            name=name,
            email=email,
            rating=rating,
            message=message
        )

        return redirect('home')

    return render(request,'feedback.html')
# @login_required
# def booking(request, id):
#     t2 = get_object_or_404(Tours, id=id)

#     if request.method == "POST":
#         persons = request.POST.get("persons")
#         total = int(persons) * t2.rate

#         booking = Booking.objects.create(
#             user=request.user,
#             tour=t2,
#             first_name=request.POST.get("first_name"),
#             last_name=request.POST.get("last_name"),
#             phone_number=request.POST.get("phone_number"),
#             email=request.POST.get("email"),
#             persons=persons,
#             message=request.POST.get("message"),
#             total_amount=total
#         )

#         return redirect('payment', booking_id=booking.id)
     
#     return render(request, 'booking.html', {'t2': t2})


 
def booking_confirmation(request):
    return render(request,'booking-confirmation.html') 
def contactus(request):
     if request.method == "POST":
        Name=request.POST['Name']
        Email =request.POST['Email']
        PhoneNumber=request.POST['PhoneNumber']
        Message=request.POST['Message']
        
        c=Contact.objects.create(Name=Name,PhoneNumber=PhoneNumber,Email=Email,Message=Message)
        return HttpResponse('<h1> Data Submitted </h1>')
     return render(request,'contactus.html')

def blog_details(request):
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        website = request.POST.get("website", "").strip()
        comment_text = request.POST.get("comment", "").strip()

        if name and email and comment_text:
            BlogComment.objects.create(
                name=name,
                email=email,
                website=website,
                comment=comment_text,
            )
            return redirect("blog_details")

    comments = BlogComment.objects.all().order_by("-created_at")
    return render(request, 'blog-details.html', {"comments": comments})
def cruise_booking(request):    
    return render(request,'cruise-booking.html')
def index_banner(request):
    return render(request,'index-banner.html')  
def index_video(request):
    return render(request,'index-video.html')

def tour(request,id):
 t1 = Tours.objects.filter(country_name=id)
 context = {
    't1' : t1,
 }
 return render(request,'tour.html' ,context)


def tourdetail(request,id):
    t2 = Tours.objects.get(id=id)
    context = {   
        't2': t2
    }
    return render(request,'tourdetail.html',context)
@login_required
def payment_success(request, booking_id):

    booking = get_object_or_404(Booking, id=booking_id, user=request.user)

    if request.method == "POST":
        booking.paid = True
        booking.razorpay_payment_id = booking.razorpay_payment_id or f"manual-{booking.id}"
        booking.razorpay_order_id = booking.razorpay_order_id or f"manual-{booking.id}"
        booking.razorpay_signature = booking.razorpay_signature or "manual"
        if not booking.invoice_number:
            booking.invoice_number = _generate_invoice_number(booking.id)
            booking.invoice_created_at = timezone.now()
        booking.save()

        try:
            base_price = booking.tour.rate * booking.persons
            room_price = booking.room.price if booking.room else 0
            subtotal = base_price + room_price
            discount_percent = 20
            discount_amount = round(subtotal * (discount_percent / 100), 2)
            gst_amount = round((subtotal - discount_amount) * 0.10, 2)

            invoice, created = Invoice.objects.get_or_create(
                booking=booking,
                defaults={
                    "invoice_number": booking.invoice_number,
                    "base_price": base_price,
                    "room_price": room_price,
                    "subtotal": subtotal,
                    "discount_percent": discount_percent,
                    "discount_amount": discount_amount,
                    "gst_amount": gst_amount,
                    "amount_paid": booking.total_amount,
                    "order_id": booking.razorpay_order_id,
                    "payment_id": booking.razorpay_payment_id,
                    "payment_signature": booking.razorpay_signature,
                },
            )
            Payment.objects.get_or_create(
                booking=booking,
                payment_id=booking.razorpay_payment_id,
                defaults={
                    "order_id": booking.razorpay_order_id,
                    "signature": booking.razorpay_signature,
                    "amount": booking.total_amount,
                    "currency": "INR",
                    "status": "manual",
                },
            )

            if created and not booking.invoice_number:
                booking.invoice_number = invoice.invoice_number
                booking.invoice_created_at = invoice.created_at
                booking.save(update_fields=["invoice_number", "invoice_created_at"])

            subject = "Payment Successful - Tour Booking Details"
            invoice_url = request.build_absolute_uri(f"/invoice/{booking.id}/")
            context = {
                "booking": booking,
                "tour": booking.tour,
                "amount": booking.total_amount,
                "order_id": booking.razorpay_order_id,
                "payment_id": booking.razorpay_payment_id,
                "invoice_number": booking.invoice_number,
                "invoice_created_at": booking.invoice_created_at,
                "invoice_url": invoice_url,
                "base_price": base_price,
                "room_price": room_price,
                "subtotal": subtotal,
                "discount_percent": discount_percent,
                "discount_amount": discount_amount,
                "gst_amount": gst_amount,
            }
            html_body = render_to_string("emails/payment_success.html", context)
            text_body = strip_tags(html_body)
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[booking.email],
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        except Exception:
            pass

        return render(request, "payment_success.html", {
            "booking": booking,
            "order_id": booking.razorpay_order_id,
            "payment_id": booking.razorpay_payment_id,
            "amount": booking.total_amount,
            "invoice_number": booking.invoice_number,
            "invoice_created_at": booking.invoice_created_at,
            "invoice_url": request.build_absolute_uri(f"/invoice/{booking.id}/"),
        })

    return render(request, "payment_success.html", {
        "booking": booking,
        "order_id": booking.razorpay_order_id,
        "payment_id": booking.razorpay_payment_id,
        "amount": booking.total_amount,
        "invoice_number": booking.invoice_number,
        "invoice_created_at": booking.invoice_created_at,
        "invoice_url": request.build_absolute_uri(f"/invoice/{booking.id}/"),
    })

@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-booked_at')
    return render(request, "my_bookings.html", {"bookings": bookings})


@login_required
def cancel_booking(request, booking_id):
    """Cancel a booking"""
    try:
        booking = Booking.objects.get(id=booking_id, user=request.user)
    except Booking.DoesNotExist:
        messages.error(request, "Booking not found or you don't have permission to cancel it.")
        return redirect('my_bookings')
    
    # Check if already cancelled
    if booking.is_cancelled:
        messages.warning(request, "This booking is already cancelled")
        return redirect('my_bookings')
    
    if request.method == "POST":
        cancellation_reason = request.POST.get('reason', '')
        
        try:
            booking.is_cancelled = True
            booking.cancelled_at = timezone.now()
            booking.cancellation_reason = cancellation_reason
            booking.save()
            
            messages.success(request, f"Booking for {booking.tour.tours_name} has been cancelled successfully")
            
            # Send cancellation email to user
            send_cancellation_email(booking)
            
        except Exception as e:
            messages.error(request, f"Error cancelling booking: {str(e)}")
        
        return redirect('my_bookings')
    
    return render(request, 'cancel_booking.html', {'booking': booking})


def send_cancellation_email(booking):
    """Send cancellation confirmation email"""
    try:
        subject = f"Booking Cancellation Confirmation - {booking.tour.tours_name}"
        
        html_message = f"""
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #d32f2f;">Booking Cancelled</h2>
                    <p style="color: #666;">Your tour booking has been successfully cancelled.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d32f2f; margin: 20px 0;">
                        <p><strong>Tour:</strong> {booking.tour.tours_name}</p>
                        <p><strong>Booking ID:</strong> {booking.id}</p>
                        <p><strong>Original Amount:</strong> ₹{booking.total_amount}</p>
                        <p><strong>Cancelled On:</strong> {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        If you have any questions about this cancellation, please contact our support team.
                    </p>
                    
                    <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                        This is an automated email. Please do not reply.
                    </p>
                </div>
            </body>
        </html>
        """
        
        plain_message = f"""
        Booking Cancelled
        
        Tour: {booking.tour.tours_name}
        Booking ID: {booking.id}
        Original Amount: ₹{booking.total_amount}
        Cancelled On: {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        If you have any questions, please contact our support team.
        """
        
        email_msg = EmailMultiAlternatives(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.email]
        )
        email_msg.attach_alternative(html_message, "text/html")
        email_msg.send()
        
    except Exception as e:
        print(f"Error sending cancellation email: {str(e)}")

@login_required
def invoice(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user, paid=True)
    invoice = Invoice.objects.filter(booking=booking).first()
    base_price = booking.tour.rate * booking.persons
    room_price = booking.room.price if booking.room else 0
    subtotal = base_price + room_price
    discount_percent = 20
    discount_amount = round(subtotal * (discount_percent / 100), 2)
    gst_amount = round((subtotal - discount_amount) * 0.10, 2)

    return render(request, "invoice.html", {
        "booking": booking,
        "invoice": invoice,
        "tour": booking.tour,
        "amount": booking.total_amount,
        "order_id": booking.razorpay_order_id,
        "payment_id": booking.razorpay_payment_id,
        "invoice_number": (invoice.invoice_number if invoice else booking.invoice_number),
        "invoice_created_at": (invoice.created_at if invoice else booking.invoice_created_at),
        "base_price": base_price,
        "room_price": room_price,
        "subtotal": subtotal,
        "discount_percent": discount_percent,
        "discount_amount": discount_amount,
        "gst_amount": gst_amount,
    })

