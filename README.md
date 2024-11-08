Hi! Here are the instructions on how to run this app locally on your machine.

prereqs
- Git will be needed to clone the project to your machine: you can download and install it from git-scm.com 
- Node will be needed to install dependencies, you can download it from nodejs.org 

1.  open terminal/command prompt 
2.  clone the repo by running this command 
    
    git clone https://github.com/gojoego/finch_employee_directory

3.  once that's done, go into that folder using this command: 

    cd finch_employee_directory

4.  now it's time to install dependencies needed for this project to run, 
    you can use this command for that:

    npm install 

5.  a few more dependencies are needed, for this we need to go into the source folder:

    cd src

6.  run this to install them:

    npm install react@latest react-dom@latest

7.  we'll have to move back into the root folder to run the program:

    cd ..

8.  all the dependencies should be install and the app should run by
    entering this command: 

    npm start

9.  http://localhost:3000 should open up automatically in your default browser 
    but you can copy and paste this address into your browser of choice 
    (unless if you already have something else running at that port, could be 3001, 3002, 300X...)