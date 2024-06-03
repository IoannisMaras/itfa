
from django.urls import re_path ,path
from account import views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', obtain_auth_token),
    re_path('register/', views.register),
    re_path('logout/', views.LogoutUserView.as_view())
]
