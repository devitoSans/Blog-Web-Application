# **About Project**
A blog web application made using Express.js, EJS, and TypeScript.

# **Features**
1. Create a new blog
2. View all the created blogs
3. Update the created blogs
4. Delete the created blog

# **How to build the project**
Make sure to install [NodeJS](https://nodejs.org/en/download). The version, which is used in this project, is v22.6.0.

First, clone this repository (type ```git clone https://github.com/devitoSans/Blog-Web-Application.git``` in your terminal). Then, go to the directory where ```package.json``` is being located.

### For clients
If you just want to run the finished product (without developing or using it in another project), then run ```npm i``` to install the necessary modules and ```npm run prod``` to start the server. After that, you can go to your browser and go to ```localhost:3000```.

### For Developers
Otherwise, to use it in the development, run ```npm i -D``` to install modules for the app and the tools used for development. 

Here are some commands which are installed in this project:
1. ```npm run dev``` - to run the server using TypeScript files instead of JavaScript.
2. ```npm run dev:watch``` - to add a watcher which will restart the server if any changes made in TypeScript files.
3. ```npm run dev:build``` - to create/update the JavaScript files based on TypeScript files.
4. ```npm run prod``` - to run the server using JavaScript files.

# **Side Note**
This project does not use any databases such as [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), etc. As a result, if the server gets restarted, all data will be lost.
