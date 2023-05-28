from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.views import generic
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm,UserChangeForm
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

def index(request):
    return render (request, 'index.html')
    # return HttpResponse("this is homepage")



def SignupPage(request):
    if request.method == 'POST':
        # Get the form data from request.POST
        username = request.POST['userid']
        first_name = request.POST['firstname']
        last_name = request.POST['lastname']
        email = request.POST['email']
        password = request.POST['password']

        # Create a new user
        user = User.objects.create_user(username=username, password=password)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()

        # Redirect to the login page
        return redirect('login')

    # If it's a GET request, render the signup page template
    return render(request, 'signup.html')



def LoginPage(request):
    if request.method=='POST':
        username=request.POST.get('username')
        pass1=request.POST.get('pass')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse ("Username or Password is incorrect!!!")

    return render (request,'login.html')

def LogoutPage(request):
    logout(request)
    return redirect('login') 

def MyAvailability(request):
    return render (request, 'MyAvailability.html')

    #return HttpResponse("this is MyAvailabilty page")

def CheckOthersAvailability(request):
    return render (request, 'CheckOthersAvailability.html')

    #return HttpResponse("this is CheckOthersAvailabilty page")

def CheckRoomAvailability(request):
    return render (request, 'CheckRoomAvailability.html')

    #return HttpResponse("this is CheckRoomAvailabilty page")

def BookFacility(request):
    return render (request, 'BookFacility.html')

    #return HttpResponse("this is BookFacility page")

def Account(request):
    return render (request, 'Account.html')

    #return HttpResponse("this is Account page")

def EditProfile(request):
    return render (request, 'EditProfile.html')

    #return HttpResponse("this is EditProfile page")

def BookingSuccessful(request):
    return render (request, 'BookingSuccessful.html')

    #return HttpResponse("this is BookingSuccessful page")


