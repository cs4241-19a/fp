# Term Project - Webware A19
 - Joe Bartone `jrbartone`
 - Chris Mercer `ctmercer`
 - Danny Sullivan `djsullivan` 

# <img src="https://cdn.glitch.com/8c08a500-c574-43fb-ba6b-d98966e3af01%2Flogo.png?v=1570471001030" alt="goat" height="75" width="75">
# GoatBooks 
## Our Project
## https://mersair-fp.glitch.me/
We created a way for students to find required books for their courses easily. A student
is able to create an account, add books that they own and are looking to trade or share, and search 
for books that they desire. If the book they need is a PDF, the link will be provided to 
them. However, if the book is physical, they will be able to see the user that has it and be 
able to message them in order to possibly trade for the book.

## Instructions
Just create an account, and you will have all the privileges you need to use our app! 

## Technologies
We use MongoDB to store our users, books, and messages. Node.js is used for the server, along with Express. We opted to use a clear folder structure for our Express app, so that developers can quicly edit our existing codebase, and run into fewer merge conflicts while doing it. This means front end has a clear structure, and the routes for the back end are tiered by purpose. Such that the API is in a seperate file for each purpose.

## Challenges
We encountered issues upon sending data to the server and redirecting the client. If they were out of sync, the page would hang and the user wouldn't know if the request went through. To remedy this, we instead pulled JSON data from the server and had the client redirect to the correct view. This refreshes the pages on submit and so the data is up to date.

## Individual Responsibilities
- Joe Bartone - front end, messaging JS functionality, 
- Chris Mercer - routing, front end JS, session saving
- Danny Sullivan - MongoDB and other database functionality