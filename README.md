# When3Meet

## The Team

Max Westwater - @Max5254
Cat Sherman - @catsherman
Ben Hetherington - @bwhetherington

## Outline

Our group created our When3Meet web app to improve upon the existing When2Meet. We provide a way to schedule events similar to When2Meet, where a user can specify their availability using a table of hours across different days, and dragging to select which hours they are available for. Another table then displays the availability of everyone attending the event. The key improvements we made to When2Meet are in our account system and responsive UI.

The project itself can be found [here](http://www.when3meet.com).

## Usage

Users are required to have an account. Click the login button in the navigation bar or on the home page in order to login or create an account. From there you can create a new event by selecting the title, time range, and days of the week. This will then redirect to the page where you can fill in the availability, and also serve as the link to send for others to fill out this When3Meet.

## Technologies

The key technologies we used in this project are React for the client and MongoDB (via Mongoose) for the database, as well as Express for the server itself. Parcel was used to compile and bundle the project. We also implemented a custom domain for our site.

### React

We opted to use React along with server-side rendering for this project. We chose React due to its flexibility in usage, as well as the large selection of components already made for it that we could base our app off of. Partly as an experiment, and also to improve the rendering speed of the website, we chose to render the pages on the server, and then transfer the rendered page to the user when they request a page. The client then "hydrates" the page. This stage essentially just attaches necessary event listeners to the HTML rendered by the server to maintain the expected functionality.

### MongoDB and Mongoose

For our database, we used MongoDB Atlas, along with Mongoose as the driver on the server. MongoDB makes it easy to store data in JSON, a very Javascript-friendly data format. Mongoose provides us with the ability to specify schemas for the database, a feature MongoDB does not provide on its own. This greatly simplifies much of the code for interacting with the database, as well as ensures that we have consistent data going into and out of the database. The database itself was hosted using MongoDB Atlas. By hosting the database in the cloud, we can host our server anywhere we wish. This is particularly useful for us as we opted to host our server on Heroku. Unlike Glitch, Heroku does not provide any form of persistent file system. If the project sleeps due to inactivity and then restarts, all of the files on the server that were created while it ran are deleted. Extracing out our persistent data to another service solves this problem.

### Parcel

Parcel provided an easy way to use modern Javascript features in our project, such as React's JSX syntax, ES6 modules, as well as `async`/`await` syntax. In addition, it provides a "watch" mode to allow us to automatically recompile the project whenever a file was changed. In addition, it allows for "hot reloading", where, if the code for the website is recompiled, whatever page the developer has open can be automatically reloaded. Along with nodemon to automatically reload the server when it is changed, this allows for rapid iteration on the website and on the server and website.

## Challenges

The projects front end involved a lot of complex user interactions and dynamic rendering. React enabled this but came with a strong learning curve as there were some advanced component interactions. The translation from event parameters, to availability grid, to populating with users availability required a lot of complex interactions. This took significantly longer than initially budged for.

## Group

### Benjamin Hetherington

Ben implemented much of the behavior for the server, as well as set up the tooling for the project itself, such as compilation, and the implementation of server-side rendering.

### Cat Sherman

Cat implemented much of the tooling for the database, as well as created the database itself, and designed the various schema for the database.

### Max Westwater

Max designed and implemented the front-facing website, including creating the interface to select availability using React, and all of the other pages on the website. This includes the form validation for creating accounts and new events, as well as most of the communication with the database from the front end and associated debugging.
