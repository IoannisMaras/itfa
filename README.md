# Intelligent Tax Filling App

ITFA is a simple web app where the user inputs his/her tax information and can get reccomandations on how to proceed with it 

## Getting Started

The main purpose of the app is to showcase my proficiency in developing a full-stack application. It begins with the frontend, where users can input their tax information and receive recommendations on how to proceed. Moving on, I add a backend that includes CRUD APIs to handle data manipulation. Additionally, I integrate the app with the OPEN AI API to enhance its functionality. Finally, I containerize the entire application and utilize GitHub Actions to automate the process of pushing it to Docker Hub. This comprehensive project demonstrates my skills in frontend development, backend implementation, API integration, containerization, and continuous deployment.

### Dependencies

* docker demon (for Windows)
* any IDE

### Executing for Development

For frontend
* cd ./itfa-frontend
* npm install
```
ng serve
```

For backend
* cd ./itfa_backend
* python -m venv venv
* source venv/bin/activate
* pip install -r requirements.txt
```
python manage.py runserver
```

### Executing for Production (with Docker)

* make a .env file in root
* in the env add SECRET_KEY={{your open ai api key}} 
```
docker compose up --build
```

## Authors

Contributors names and contact info
[@IoannisMaras](https://github.com/IoannisMaras)

## Version History

* 0.1
    * Initial Release
