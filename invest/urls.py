from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_page, name='index'),
    path('about/', views.about_page, name='about'),
    path('contact/', views.contact_page, name='contact'),
    path('privacy/', views.privacy_page, name='privacy'),
    path('faq/', views.faq_page, name='faq'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register_page, name='register'),
     path('logout', views.logout_request, name='logout'),
]

urlpatterns += [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile/', views.profile, name='profile'),
    path('password.', views.password_change, name='change_password'),
    path('create-deposit/', views.deposit_init, name='create-deposit'),
    path('deposit/<int:deposit_id>/', views.deposit_page, name='deposit'),
    path('withdraw/', views.withdraw_page, name='withdraw'),
    path('history/', views.transactions_history, name='history'),
]
