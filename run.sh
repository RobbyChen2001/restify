#!/bin/bash
# run this in /backend

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver