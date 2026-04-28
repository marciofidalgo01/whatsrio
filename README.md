Para rodar o BACKEND do projeto:

cd BACKEND

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver



Para rodar o FRONTEND do projeto:

cd FRONTEND

npm install

npm run dev
