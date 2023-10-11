This is a Travel Diary application where a 

  1. user can signup/login/logout from the application
  2. user can add/update/delete travel dairy

The Applicatin has a Backend API which is built with Nodejs, Express and MongoDB
1. move to backend folder
2. run - npm run start

The Frontend is built with react, material UI, Inorder to start the APP 
1. move to frontend folder
2. run npm run start


The above application can be deployed in AWS
1. Spin up an EC2 Instance (prefferably Ubunty) is AWS
2. Connect to the EC2 instance usign Shell
3. Clone this github repo into the linux machine
Setting up Backend API:
  1. Install & Configure NodeJS & Mongo DB in EC2 instance
  2. move to backend folder 
  2. configure the ip and port where the mongo DB is runnign in the backend/app.js
  4. run npm install from the backend folder, followed by npm run build and npm run start
  5. the backend api will start in localhost:5000

Setting up Front end:
  1. move to frontend 
  2. run npm run install, npm run build and finally npm run start.
  3. the app may start in localhost:3000
  4. Inorder to access the app from outside through the publicapi of ec2, you may have to setup a reverse proxy using nginx, so that every request to the ec2 publicIP:<port> will be directed to  localhost:3000 internally
