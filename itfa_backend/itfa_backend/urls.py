
from django.urls import re_path ,path
from account import views as acount_views
from personal_details import views as personal_details_views
from dependents import views as dependents_views
from rest_framework.authtoken.views import obtain_auth_token
from real_estate import views as real_estate_views
from vehicles import views as vehicles_views
from employees import views as employees_views
from ai_recomendations import views as ai_recomendations_views
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', obtain_auth_token),
    re_path('register/', acount_views.register),
    re_path('logout/', acount_views.LogoutUserView.as_view()),
    path('dashboard/', acount_views.DashboardView.as_view()),
    re_path('personal-details/', personal_details_views.PersonalDetailsView.as_view()),
    path('dependents/', dependents_views.DependentsView.as_view()),
    path('dependents/<int:pk>/', dependents_views.DependentsView.as_view()),
    path('real-estates/', real_estate_views.RealEstateView.as_view()),
    path('real-estates/<int:pk>/', real_estate_views.RealEstateView.as_view()),
    path('vehicles/', vehicles_views.VehiclesView.as_view()),
    path('vehicles/<int:pk>/', vehicles_views.VehiclesView.as_view()),
    path('employees/', employees_views.EmployeesView.as_view()),
    path('employees/<int:pk>/', employees_views.EmployeesView.as_view()),
    path('ai-recomendations/', ai_recomendations_views.AiRecomendations.as_view()),
]
