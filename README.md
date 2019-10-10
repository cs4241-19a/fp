
## Admin DB Editor Wesbite

**By Peter Christakos, Andrew Morrison, Julian Pinzer, Katherine Thompson** 

For our project, we created a web application that connects to a MySQL server and 
provides an easy way for inexperienced database users to add, modify, and delete items 
from a database. Upon loading the website, you will be taken to the home screen which 
shows a graph constructed from data in a MySQL database. Click on the login tab to 
login and then you will be able to access the dashboard, which shows you the same 
graph along with a table below so you can view how your data will look in the graph as you
add and remove data. We are hoping that these admin tools can be used for any type of data
or any type of user, with the graph itself being easy enough to change and modify to view
the data in other ways.

Link: <https://fp-admin-page.glitch.me/>

**Login Info:**

User: `root`
Pass: `root`

We used many technologies/features in the making of this project:
    1. React Framework
       1. React-router
       2. React-Redux
    2. Express server
       1. MySQL integration
       2. Login Functionality
       3. Add/Edit/Delete MySQL Data
    3. MySQL Server
    4. Bulma Design Pattern
    5. Tabulator interactive table
    6. Chartist.js for react and legend plugins for the var graph
    7. Chartist CSS for our graph color scheme legend
    8. Animating inputs and buttons based off of entries
    9. Clean design and layout

Technical Achievements:

- Since the majority of our group used React for the first time in the making of this project, the biggest challenge we faced was properly integrating all of our javascript code into the React framework. 

- Encorporating everything we've learned in the past 7 weeks, including stylying, persistant databases, an express server, etc.

Design Achievements:

- Styling for the application, the table, as well as the graph

- User tested, we will be making a similar application for SGA so we took into account a lot of their design preferences

- Application made with a user who is not familiar with databases in mind, we tried to make it as easy as we could for anyone to be able to use

## Member Responsibilities

Peter Christakos - tabulator table design/integration and add/modify/delete front end

Andrew Morrison - login page front end and header design

Julian Pinzer - MySQL Server / React server setup and communication with data

Katherine Thompson - Chartist graph design/integration and styling
