from django.shortcuts import render
# Create your views here.
from django.conf import settings
import os 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from .utils import extract_text
from .nlp import extract_skills
from .matcher import calculate_score
from django.http import HttpResponse
from .experience import extract_experience, extract_education

def home(request):
    return HttpResponse("ATS Resume Analyzer Backend Running 🚀")
@csrf_exempt
@api_view(['POST'])
def analyze_resume(request):
    try:
        file_name = request.data.get('file_name')
        job_desc = request.data.get('job_description')

        if not file_name:
            return Response({"error": "No file name provided"}, status=400)

        file_path = os.path.join(settings.MEDIA_ROOT, file_name)

        if not os.path.exists(file_path):
            return Response({"error": "File not found"}, status=404)

        # ✅ ALWAYS initialize
        resume_text = ""

        with open(file_path, 'rb') as f:
            resume_text = extract_text(f)

        if not resume_text:
            return Response({"error": "Could not extract text"}, status=500)

        # ✅ NLP processing
        resume_skills = extract_skills(resume_text)
        jd_skills = extract_skills(job_desc)

        experience = extract_experience(resume_text)
        education = extract_education(resume_text)

        result = calculate_score(resume_skills, jd_skills)

        return Response({
            "score": result["score"],
            "matched_skills": result["matched"],
            "missing_skills": result["missing"],
            "suggestions": result.get("suggestions", []),
            "experience": experience,
            "education": education
        })

    except Exception as e:
        print("ERROR:", str(e))
        return Response({"error": str(e)}, status=500)
    
    
@csrf_exempt
@api_view(['POST'])
def upload_resume(request):
    try:
        file = request.FILES.get('resume')

        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        file_path = os.path.join(settings.MEDIA_ROOT, file.name)

        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        return Response({
            "message": "File uploaded successfully",
            "file_name": file.name
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)