# [Farmart](https://farmart-three.vercel.app/login)

It is a file upload and short link generation platform.
## Table of Contents

- [Farmart](#project-name)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Usage](#usage)

## Introduction

The platform allows users to upload a file to the server, and generate a short link that can be
shared with others. When the short link is accessed, the uploaded file should be available for
download.


## Features

List the main features of the project.

- Login and Signup Page for users.
- Uses JWT for authentication and authorization of users to provide security.
- Allow user to upload Files in Image or PDF Format with size and format restriction.
- Used Firebase Storage for saving the uploaded files to the cloud.
- The server also uses a backend script that runs each week and automatically delete files from the database and firebase.
- Allows user to access history and delete the uploaded files from the cloud.
- Provide a short Link which can be copied to clipboard.
- Allow user to download the file.
- You can paste the short url in a new tab and will be able to access the file.
- The users are stored persistently for a period of time to provide a smoother experience.

## Getting Started

* Clone both frontend and backend repositories from github with the link provided.
* Run `cd backend` to enter the backend directory.
* Run `npm install` for both the directories.
* Run `node index.js` to start the server.
* Now you can access the server at `localhost:8000`

* Open a new terminal and run `cd frontend` to enter the frontend directory
* After running `npm install` , run `npm start` to start the local client at `port 3000`
* You may need to update the Base url inside `frontend\src\api.js` to `localhost:8000`

### Prerequisites

* Using the steps mentioned above , all the dependencies will be download.
#### Note:- Please make sure you have Node and NPM installed on your system.  
#### Note:- Please Note that even after following aforesaid instructions , you will also require Secret API keys which are not available publicly on GitHub due to security reasons.


## Usage

- On the landing page you can signup for the service.
- Then you will be redirected to the profile page where you can upload a file.
- A short link will be generated for you to copy and share with others
- You can also view all of you uploaded files and delete it if you want from the history section.
- You can paste the short url in a new tab and will be able to access the file.

