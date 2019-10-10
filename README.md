# cs4241-FinalProject

## Logistics

### Team:

Our team consists of four members: Manasi Danke, Carla Duarte, Amanda Ezeobiejesi, and Sylvia Lin.

## Deliverables:

### __Project:__ https://fp-md-cd-ae-sl.glitch.me

#### Directions to run it:
1) Make sure you run npm install if the application is not loading on glitch.
2) Sign out of all current gmail accounts.
3) Sign into our project team’s gmail account with these credentials:	
- Username: wpi.meeting.notification@gmail.com
- Password: meetingwpi1
4) Go to email settings and allow access to less secure apps: https://myaccount.google.com/lesssecureapps
5) Go to this link and click “Continue” : http://www.google.com/accounts/DisplayUnlockCaptcha
6) If there are any issues, please check our gmail to see if there are any recent emails regarding security. Please check the green "yes" in the email to indicate that this activity was due to our application.
7) You are all set! You can now log in with any of these credentials or create and register your own account:


Username: ciduarte@wpi.edu

Password: 1234

<br></br>
Username: mmdanke@wpi.edu

Password: 1234

<br></br>
Username: ylin7@wpi.edu

Password: 1234

<br></br>
Username: aezeobiejesi@wpi.edu

Password: 1234

8) If you have any additional questions, please do not hesitate to reach out to us.

### _Professor Roberts' Feedback on the Proposal:_

"This sounds really really useful! I don't have much experience using Live25 so I'm unclear how much effort it will take to
integrate your software with this system. Do you have a backup plan / alternative feature to implement if Live25 integration
proves to be too challenging? If you already know this won't be a problem, then you're good to go!" - Charlie Roberts

### How We Implemented His Feedback:

After reviewing Professor Robert's feedback, we decided to focus our project entirely on creating a room booking service (rather
than implementing user availability), since that would be quite a coding challenge in itself. To appropriately limit the scope of
our project (to be completed in 2 weeks), we focused on prototyping what an updated room booking service might look like.
Our hope for this tool would be that along with booking capabilities, our users would have a concise location to view what
reservations they have made.

## Final Project Description:

#### Intended Users:
Groups or teams who need a tool to book meeting spaces.

### General Description: 

We created a project management tool that enables users to book rooms based on their availability. We implemented these
key features in our project management dashboard:

  1)  Login functionality that allows users to log in/register in order to save relevant booking information.
  
  2)  A room availability dashboard which includes:
  
   - a form that allows users to select which days and times of the week they'd like to book a meeting for, and
   - a visual table display of rooms that are already booked for particular times
  
  3)  A tool that sends an email to recipients through our application to share booking details and provide confirmation.
  
  4)  A table that shows the user's meetings and enables them to delete meetings they have booked.
 
#### Impact:

As students who have worked on large group projects and IQP teams, we know how difficult and how confusing it can be to use 25live
to find empty meeting spaces on campus.
Our application addresses this issue and provides a solution that enable teams to find a time and place to interact and accomplish
their team goals.

## Technical Requirements Accomplished:

Our project is a complete web application:

- Our project has static web page content and design. It is accessible, easily navigable, and features significant content.
- Our project showcases dynamic behavior implemented with JavaScript.
- Our project uses Node.js, uses persistent data (lowdb) and implements authentication through login and register functionality (passport).
- Our project implements middleware and server-side computations.
- Our project implements a form that lets users add, view and delete data that is displayed in varying ways throughout the website.
- Our project lets users delete their bookings from their list of meetings.

### Technologies Used and How We Used Them:

- <b>HTML:</b> divided main pages into their own html files to help modularize the code and display certain content for certain aspects of the site

- <b>CSS:</b> A bootstrap template found on TemplateMag; we additionally altered CSS through flexbox and editing style, color, font, size,etc...

- <b>Javascript:</b>
  - <u>In general:</u> helped to modify content on the website, interact with user’s actions, and connect the front-end and back-end of the project
  - <u>Node.js:</u> used for server-side
  - <u>Nodemailer:</u> used to help us send booking confirmation emails from our account to the specified recipients
  - <u>Lowdb:</u> used for our database and make sure that our data is persistent

- <b>Middleware:</b>
  - <u>Express:</u> a middleware and routing web framework with minimal functionality that listens for requests and calls the appropriate functions
  - <u>bodyParser:</u> parses incoming http request bodies before handlers.
  - <u>Passport and Passport-local:</u> authenticates requests through strategies such as the Local strategy(in this example).
  - <u>serveStatic:</u> serves static files from the path where files are being drawn from by the application
  - <u>Compression:</u> improves the performance of our Node.js, since it decreases the amount of data that is downloaded and served to users

### Fun Features that we independently researched, designed, and implemented:

We had to research many components of our application and found resources on Stack Overflow, w3schools, tutorial points, and YouTube.

Additional Technical/Design Achievements:

- <b>*nodemailer:*</b> used to send emails from our specialized team gmail account that notified recipents of the day, start time, end time,
and location of their scheduled meeting.
- <b>*Responsive Layout:*</b> maintained a responsive layout throughout the entire website. This makes it more convenient for users to
book rooms on the go through their mobile devices.
- <b>*Login security*:</b> We implemented login redirect cards in order to prevent users from booking meetings if they are not logged in.

## Challenges:

Our group faced challenges in terms of the scope of the project. Initially, our intent was to recreate a more visually appealing WhenToMeet that would allow users to save their availability for future use. We also wanted to incorporate booking rooms and creating meetings, like 25Live. We quickly realized this would be too much to accomplish in two weeks, so we scaled the project down to simply booking rooms for meetings. Doing so also allowed us to focus heavily on UI design, which was our primary goal in reimagining a service like WhenToMeet or 25Live.

In addition, we encountered a few difficulties when we first began to implement nodemailer. We realized that we needed to log out of all gmail accounts, log into the team gmail account, change the gmail settings to enable less secure app access, log into our gmail to confirm that we made the change to settings, and then click the DisplayUnlockCaptcha link to ensure that our project can send emails from our gmail account.

## Individual Responsibilities:

<b>Carla:</b> Created the server file, established the database, wrote methods for client/server interaction, helped mock and create the meeting page and the room availability page, helped make the logo.

<b>Amanda:</b> Wrote some methods for client interaction (incorporating client experience), helped mock and create the meeting page from scratch, helped fix bugs in the header, made the favicon, and helped make the logo.

<b>Manasi:</b> Created registration page, helped mock and create the meeting page, helped to implement nodemailer functionality, and wrote initial versions of the proposal and final readme.

<b>Sylvia:</b> Created login page from scratch, custom styled CSS on top of the original Bootstrap template, helped create the room availability page, created the booking form from scratch.


### Future Improvements:

If we had more time, we would have implemented the following features:

<b>MM-DD-YYYY System:</b> 
Made a week-by-week scrolling system that allows the user to book rooms based on a particular week and in accordance with dates from the calendar. For example, a user could book the Friday Kahlo room  from 10:00AM - 12:00PM on Oct 15th, 2019 rather than just being limited to the current week Sunday - Monday.

<b>Different Table Layout:</b> 
Set up the room availability table in a different way (room vs. hours) so it becomes easier to check the most recent available rooms since people are more concerned with the first day they can book any room rather than the actual room
Potentially have a dropdown menu so it is easier to switch days

<b>Room Sizes:</b> 
We would implement different room sizes so that a user can choose if they want to book a room that holds 4 people, 6 people, or 8 people.

<b>Email Functionality:</b> 
We would change the sending emails functionality so that when an email is sent to the recipients, it shows that that user is the one that booked the room. We could also allow users to add a message in the booking form so all recipients will receive the message.

<b>Past Meetings:</b> 
For the Meetings page, we would have made it possible for a user to see their past meetings as if stored in their own personal calendar. Possibly a dropdown where the user could select a particular day and that day’s, meetings would show up. 




