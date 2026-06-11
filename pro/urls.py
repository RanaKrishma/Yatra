"""
URL configuration for pro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from app import views
from django.conf import settings
from django.conf.urls.static import static
from app.views import tour
from app.views import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

admin.site.site_header = "Tours&travelling"
admin.site.site_title = "Tours&travelling"
admin.site.index_title = "Tours&travelling"

urlpatterns = [
    # redirect any legacy/default login URL to our custom login page
    # this handles cases where code (e.g. login_required) still points to
    # /accounts/login/ or someone types it manually.
    # path('accounts/login/', RedirectView.as_view(pattern_name='login', permanent=False)),

    path('admin/', admin.site.urls),
    path('',views.index),
    path('', views.home, name='home'),

    path('index/',views.index),
    path('travelsearch/',views.travelsearch),
    # path('login/',views.login),
    path('login/',views.delogin, name='login'),
    # if you ever need the built-in auth views (password reset, etc.)
    # you can re-enable the following line. The login_required decorator
    # will respect LOGIN_URL set in settings, so its not strictly needed
    # to include this for the redirect fix.
    # path('accounts/', include('django.contrib.auth.urls')),
    path('register/',views.register),
    path('logout/', views.logout_user, name='logout'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('base/',views.base),
    path('aboutus/',views.aboutus),
    path('forgot-password/',views.forgot_password),
    path('payment/<int:booking_id>/',views.payment, name='payment'),
    path("payment-success/<int:booking_id>/", views.payment_success, name="payment_success"),
    path("invoice/<int:booking_id>/", views.invoice, name="invoice"),
    path('destination/',views.destination),
    path('detail-tabs/',views.detail_tabs),
    path('booking/<int:id>/',views.booking,name="booking"),
    path('booking-confirmation/',views.booking_confirmation),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
    path('cancel-booking/<int:booking_id>/', views.cancel_booking, name='cancel_booking'),
    path('contactus/',views.contactus),
    path('feedback/', views.feedback, name="feedback"),
    path('blog-details/',views.blog_details, name='blog_details'),
    path('cruise-booking/',views.cruise_booking),
    path('index-banner/',views.index_banner),
    path('index-video/',views.index_video),
    path('tour/<int:id>/',views.tour),
    path('tourdetail/<int:id>/',views.tourdetail),
 

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
