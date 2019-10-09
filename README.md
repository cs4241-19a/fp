# cs4241-FinalProject

## Logistics

### Team:

Our team consists of four members: Manasi Danke, Carla Duarte, Amanda-Ezeobiejesi, and Sylvia Lin.

## Deliverables:

### __Project:__ https://fp-md-cd-ae-sl.glitch.me

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

### Fun Features that we independently researched, designed, and implemented:

We had to research many components of our application and found resources on Stack Overflow, w3schools, tutorial points, and YouTube.

Additional Technical/Design Achievements:

- *nodemailer:* used to send emails from our specialized team gmail account that notified recipents of the day, start time, end time,
and location of their scheduled meeting.
- *Responsive Layout:* maintained a responsive layout throughout the entire website. This makes it more convenient for users to
book rooms on the go through their mobile devices.
- *Login security*: We implemented login redirect cards in order to prevent users from booking meetings if they are not logged in.