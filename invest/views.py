from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.urls import reverse

from .models import Profile, Deposit
from .forms import NewUserForm, EditUserForm, EditProfileForm, DepositForm, SupportForm

# Create your views here.


def get_total_invest(deposits):
    total_invest = 0
    for deposit in deposits:
        deposit_amount = deposit['deposit']
        total_invest += deposit_amount

    return total_invest


def get_total_profit(deposits):
    total_profits = 0
    for deposit in deposits:
        profit_amount = deposit.get_profit()
        total_profits += profit_amount

    return total_profits



@login_required(login_url='/login')
def dashboard(request):

    user = request.user
    deposits = Deposit.objects.filter(user=user)
    total_deposits = get_total_invest(list(deposits.values()))
    successful_deposits = Deposit.objects.filter(user=user, status='successful')
    total_successful_deposits = get_total_invest(list(successful_deposits.values()))

    total_profits = get_total_profit(list(successful_deposits))

    return render(request, 'dashboard/index.html', {'user': user,
                                                    'total_deposits': total_deposits,
                                                    'total_profits': total_profits,
                                                    'total_successful_deposits': total_successful_deposits})

@login_required(login_url='/login/')
def profile(request):
    user = request.user
    
    try:
        profileInstance = Profile.objects.get(user=user)

    except Profile.DoesNotExist:
        profileInstance = Profile.objects.create(user=user)
    
    if request.method == "POST":
        form = EditUserForm(request.POST, instance=user)
        form1 = EditProfileForm(request.POST, instance=profileInstance)

        if form.is_valid() and form1.is_valid():
            form.save()
            form1.save()
            return redirect('profile')

        else:
            messages.error(request, "please fill in input properly")
            

    form = EditUserForm(instance=user)
    form1 = EditProfileForm(instance=profileInstance)
    return render(request, 'dashboard/profile.html', {'user': user,
                                                      'profile': profileInstance,
                                                      'form': form,
                                                      'form1': form1,
                                                      })


@login_required(login_url='/login')
def password_change(request):

    user = request.user
    
    if request.method == 'POST':
        form = PasswordChangeForm(user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('change_password')
        else:
            messages.error(request, 'Please correct the error below.')
    
    form = PasswordChangeForm(user=user)
    return render(request, 'dashboard/password.html', {'user': user,
                                                       'form': form,
                                                       })


@login_required(login_url='/login')
def deposit_init(request):
    user = request.user

    if request.method == "POST":
        form = DepositForm(data=request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            
            print(user)
            form.user = user
            form.save()
            print(form.id)
            return redirect(reverse('deposit', kwargs={'deposit_id': form.id}))

        else:
            print("is Invalid")
            messages.error(request, "Invalid inputs")
    form = DepositForm()
    return render(request, 'dashboard/deposit_init.html', {'form': form,
                                            'user': user,
                                            })



def deposit_page(request, deposit_id):

    user = request.user
    deposits = Deposit.objects.filter(user=user)
    deposit = get_object_or_404(Deposit, id=deposit_id)
    return render(request, 'dashboard/deposit.html', {
        'deposit': deposit,
        })


def withdraw_page(request):

    user = request.user
    
    deposits = Deposit.objects.filter(user=user)
    total_deposits = get_total_invest(list(deposits.values()))
    successful_deposits = Deposit.objects.filter(user=user, status='successful')
    total_successful_deposits = get_total_invest(list(successful_deposits.values()))
    total_profits = get_total_profit(list(successful_deposits))
    total_deposits = get_total_invest(list(deposits.values()))
    return render(request, 'dashboard/withdraw.html', {'deposits': deposits,
                                                          'total_deposits': total_deposits,
                                                          'user': user,
                                                          'total_profits': total_profits,
                                                            'total_successful_deposits': total_successful_deposits,
                                                          })


def transactions_history(request):

    user = request.user
    
    deposits = Deposit.objects.filter(user=user)
    total_deposits = get_total_invest(list(deposits.values()))
    successful_deposits = Deposit.objects.filter(user=user, status='successful')
    total_successful_deposits = get_total_invest(list(successful_deposits.values()))
    total_profits = get_total_profit(list(successful_deposits))
    total_deposits = get_total_invest(list(deposits.values()))
    return render(request, 'dashboard/transactions.html', {'deposits': deposits,
                                                          'total_deposits': total_deposits,
                                                          'user': user,
                                                          'total_profits': total_profits,
                                                            'total_successful_deposits': total_successful_deposits,
                                                          })

def dashboard_page(request):

    return render(request, "dashboard/index.html")

def index_page(request):

    return render(request, 'index.html')


def about_page(request):

    return render(request, "about.html")


def contact_page(request):

    return render(request, "contact.html")


def faq_page(request):

    return render(request, "faq.html")


def privacy_page(request):

    return render(request, "privacy.html")


def login_page(request):
    if request.method == "POST": 
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "Login Successful")
                return redirect('dashboard')
            else:
                messages.error(request, "invalid username or password")

        else:
            messages.error(request, "invalid username or password")

    form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required(login_url='/login')
def logout_request(request):
    logout(request)
    return redirect('login_page')


def register_page(request):

    if request.method == "POST":
        form = NewUserForm(request.POST)
        print(form)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration Successful")
            return redirect('dashboard')
        
        else:
            messages.error(request, "Please fill in the right credentials")

    form = NewUserForm()
    return render(request, 'register.html', {'form': form})