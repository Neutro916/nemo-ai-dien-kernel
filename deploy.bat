@echo off
echo Deploying AI_DIEN Kernel to GCP...
cd /d "C:\Users\natra\nemo-ai-dien-kernel"
gcloud config set project wide-maxim-487506-u1
gcloud app deploy --quiet
echo Deployed!
pause