
from django.urls import re_path ,path
from account import views as acount_views
from personal_details import views as personal_details_views
from dependents import views as dependents_views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', obtain_auth_token),
    re_path('register/', acount_views.register),
    re_path('logout/', acount_views.LogoutUserView.as_view()),
    re_path('personal-details/', personal_details_views.PersonalDetailsView.as_view()),
    path('dependents/', dependents_views.DependentsView.as_view()),
    path('dependents/<int:pk>/', dependents_views.DependentsView.as_view()),
 
]
