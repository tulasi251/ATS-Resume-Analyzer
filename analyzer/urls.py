from django.urls import path
from .views import analyze_resume,home,upload_resume

urlpatterns = [
    path('analyze/', analyze_resume),
    path('',home),
    path('analyze/', analyze_resume),
    path('upload/', upload_resume),
]