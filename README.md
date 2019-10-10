# Mapping Internet Connectivity

Team (github username):
* Evan Goldstein (evanbg-wpi)
* David Vollum (davidvollum)
* Samuel Goldman (samgoldman)


## About this project
URL: https://mapping-internet-connectivity.herokuapp.com

Our final project, which also serves as a prototype for our MQP, is designed to measure internet connectivity.
What this site does in particular is, with the user's permission, repeatedly load favicons from roughly the top 50 websites
in the country (as determined by Alexa ranking). We specifically add a randomized parameter to the favicon to ensure that it isn't cached and record the time it took to load, which is a form of RTT. This essentially gets us a "ping" from the user to the website.
The idea is that for MQP, we will distribute this across the country and get people to load the page and collect data for us.
Server side, we collect the clients IP address and use a third party database from MaxMind to geolocate the user. We also use the browser location API and if available, the NetworkInformation API to augment our data.
In an effort to entice people to do so, the site displays live data to the user in two forms:

1. On the left is a bar graph that displays a rolling average of the last 10 "pings". After each batch of pings is run, this graph updates with the new data, automatically sorting based on the average.
2. On the right is a map that displays the country wide data for a given domain. Users can select the domain by clicking on the bar chart. This map updates as soon as new data is published to the server.

Note: to collect data and see the bar chart in action, you must click "Start" and agree to collect data.

## Technologies Used
* D3.js: we used D3.js for both of the data displays on the page. Both include live updating data and the bar graph includes animations for a smoother experience.
* Socket.io: we used socket.io to transfer the data to and from the server, allowing the server to notify _any_ client connected when _one_ client posts new data. This is essential for the live updating aspect.
* Webpack: we used webpack for bundling javascript. We had to create two bundles because there is a second page built specifically for the demo that allows us to delete all data in the database, but we didn't want this capability published in the main bundle.
* Geocoding API: we used a geocoding API from Texas A&M to look up cities to aggregate by in case of MaxMind unreliability
* MongoDB: we used MongoDB to store all data
* Bootstrap: used for styling and for responsiveness on mobile

## Challenges
* Live data display with D3
* Promises, promises, promises
* Testing is inherently difficult (we're all in Worcester)

## Division of Work
* David: Front end display (D3). Styling
* Evan: Database interface and management
* Sam: Socket.io implementation and data collection
