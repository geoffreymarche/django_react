from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import requires_csrf_token,ensure_csrf_cookie
from django.http import HttpResponse
from django.template import loader

def requestMethod(request):
    method = request.method
    if method == 'GET':
        return False
    else:
        return True

@ensure_csrf_cookie
def login(request):
    #check request method
    req = requestMethod(request)
    if req:
        post = request.POST
        return JsonResponse(post)
    else:
        t = loader.get_template('index.html')
        return HttpResponse(t.render())

@ensure_csrf_cookie
def register(request):
    #check request method
    req = requestMethod(request)
    if req:
        post = request.POST
        username = post.username
        email = post.email
        password = post.password
        check_email = True
        check_username = True
        q = {}
        try:
            User.objects.get(username=username)
            q['username'] = True
        except:
            check_username = False
            q['username'] = False
        try:
            User.objects.get(email=email)
            q['email'] = True
        except:
            check_email = False
            q['email'] = False
        if check_username and check_email:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            q['status'] = True
        return JsonResponse(q)
    else:
        t = loader.get_template('index.html')
        return HttpResponse(t.render())
