# Tours & Travelling Platform - Copilot Instructions

## Project Overview
A Django-based travel booking platform supporting tours, flights, hotels, cars, and cruises. Currently a view-driven template renderer with 40+ pages but minimal backend logic (models.py and admin.py are empty stubs).

**Django Version:** 6.0  
**Database:** SQLite (db.sqlite3)  
**App Structure:** Single monolithic `app` Django app

## Architecture Patterns

### View Layer (Anti-Pattern: Template-Only)
- **Location:** [app/views.py](app/views.py)
- **Pattern:** All 75+ views are simple `render()` calls with no business logic
- **Issue:** No models defined to support data persistence
- **When expanding:** Create proper Django models in [app/models.py](app/models.py), register in [app/admin.py](app/admin.py), and convert view functions to handle POST requests and database operations

### Template Structure
- **Location:** [app/template/](app/template/)
- **Naming Convention:** Kebab-case filenames (e.g., `hotel.html`, `flight-detail.html`)
- **Coverage Areas:**
  - Tours: `detail.html`, `tour-detail.html`, `dashboard-addtour.html`
  - Flights: `flight.html`, `flight-grid-view.html`, `flight-list-view.html`, `flight-detail.html`, `flight-booking.html`
  - Hotels: `hotel.html`
  - Cars: `car-list-view.html`, `car-detail.html`, `car-booking.html`
  - Cruises: `cruise-list-view.html`, `cruise-detail.html`, `cruise-booking.html`
  - User Dashboard: `dashboard.html`, `dashboard-my-profile.html`, `dashboard-booking.html`, `dashboard-history.html`
  - Transactions: `checkout.html`, `payment.html`, `booking-confirmation.html`

### Static Assets
- **Location:** [app/static/](app/static/)
- **Structure:**
  - CSS: [app/static/css/](app/static/css/) - Bootstrap + custom stylesheets per feature (flight.css, hotel.css, cruise.css, etc.)
  - JS: [app/static/js/](app/static/js/) - jQuery, Bootstrap, custom scripts (dashboard-custom.js, custom-swiper2.js)
  - Images: Organized by feature (cars/, cruise/, flight/, hotel/, slider/)
  - Icons: Font Awesome + Simple Line Icons

## URL Routing Convention
**Location:** [pro/urls.py](pro/urls.py)

All URLs map directly to view functions. Pattern: `path('url-slug/', views.view_function_name)`
- Hyphens in URLs become underscores in function names: `/flight-detail/` → `flight_detail()`
- Root `/` and `/index-6/` both route to `index()` view
- 40+ explicit path definitions with no URL namespacing

## Configuration
**Location:** [pro/settings.py](pro/settings.py)

- Template directory: `'app/template'` (single directory, not nested)
- Static files served via Django's static file handler (for development only)
- Standard Django middleware stack (no custom middleware)
- Default SQLite database

## Critical Setup & Commands

### Development Server
```bash
python manage.py runserver
```
Access at `http://localhost:8000/`

### Database Migrations (When Models Added)
```bash
python manage.py makemigrations
python manage.py migrate
```

### Django Admin
- Access: `http://localhost:8000/admin/`
- Register models in [app/admin.py](app/admin.py) using `@admin.register(Model)` or `admin.site.register()`

## Developer Workflow

1. **Adding a new page:** Create `.html` in `app/template/`, add view function in `app/views.py`, add URL path in `pro/urls.py`
2. **Adding backend logic:** Define models in `app/models.py`, register in admin, modify views to query/persist data, add POST handler to views
3. **Styling:** Use existing CSS in `app/static/css/` or create feature-specific stylesheet matching naming convention
4. **Asset organization:** Images go in `app/static/images/{feature}/`, JS/CSS/fonts in respective directories

## Key Implementation Notes

- **No API Layer:** All views return rendered HTML, no REST endpoints currently
- **No Authentication Backend:** Login/forgot-password templates exist but views are template-only stubs
- **Model-Free Design:** Despite having `auth` and `contenttypes` installed, business models are not defined
- **Static Assets:** Configure `STATIC_ROOT` if deploying to production
- **SECURITY WARNING:** Secret key and DEBUG=True in settings.py — fix before production deployment

## Files to Review First
1. [app/views.py](app/views.py) — Understand view naming/routing convention
2. [pro/urls.py](pro/urls.py) — See URL-to-view mapping
3. [pro/settings.py](pro/settings.py) — Configuration and installed apps
4. [app/template/base.html](app/template/base.html) — Template inheritance structure (if exists)
