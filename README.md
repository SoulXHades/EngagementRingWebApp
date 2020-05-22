# Introduction
DiaHunter is a website that help users to hunt for their perfect engagement easily. 
Through DiaHunter, user can find their perfect engagement by filtering rings according to what they want.

# Folders
### Client
Stores all the folders and files for the frontend of the website. They are written using ReactJS.

### Server
Stores all the folders and files for the backend of the website. There are two kinds of files.
The first kind is for NodeJS and Firebase cloud functions for API requests.
The 2nd kind is for web scrapper to scrap rings data from different websites.

# Requirements
Webscrapper:
* beautifulsoup4 (pip install beautifulsoup4)
* firebase_admin (pip install firebase_admin) (https://youtu.be/yylnC3dr_no)

Webpage Backend:
* npm install -g firebase-tools
    1. firebase login   (To login into your Firebase account)
    2. firebase init   (Install packages for Firebase)
* npm install   (will based on the dependencies in package.json and download them)