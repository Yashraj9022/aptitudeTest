from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import  AptitudeQuestionAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubmitAnswersAPIView
from .views import *
router = DefaultRouter()
router.register(r'register', UserRegistrationViewSet, basename='user-register')
router.register(r'profile', UserProfileViewSet, basename='user-profiler')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('submit-answers/', SubmitAnswersAPIView.as_view(), name='submit-answers'),
    path('api/upload-profile-pic/', UploadProfilePicAPIView.as_view(), name='upload-profile-pic'),
    path('aptitude-questions/', AptitudeQuestionAPIView.as_view(), name='aptitude-questions'),
]
