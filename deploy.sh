#!/bin/bash
echo "Deploying AI_DIEN Kernel to GCP..."
gcloud config set project wide-maxim-487506-u1
gcloud app deploy --quiet
echo "Deployed!"