# BlueOwl frontend

This project was bootstrapped with Create React App. It utilizes a React front-end and integrates with external services through environment variables.

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js (preferably the latest LTS version)

npm (comes installed with Node.js)


## Cloning the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/abhms/blueowl-frontend.git
cd blueowl-frontend
```

### Configuration
Create a .env file in the root directory of your project. This file will store sensitive configuration settings and API keys:

```
REACT_APP_STRIPE_KEY=your_stripe_api_key
REACT_APP_BACKEND_API=your_backend_api_url
```

## Installing Dependencies
Install the required packages by running the following command in the project directory:

```
npm install
```

## Running the Application
Once the installation is complete, you can start the app by running:
```
npm start
```