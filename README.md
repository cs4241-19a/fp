### AXP House Point System Tracker

http://fp-samtalpey.glitch.me

# Team Members
Sam Talpey (SamTalpey), Jimmy Tran (Jeemie)
Neither group member was assigned specific tasks, as we focused on using pair programming (A skill one of us utilized during a recent internship) to better increase our productivity and understanding of the code that is written

## Description

This project aims to rebuild the current system AXP uses to track points regarding house jobs and other duties for brothers. Recently, the system was digitalized by one of our recent grads using a python slackbot that read/updated data in a google spreadsheet. The system itself was rather jerry-rigged, and had multiple issues or areas that could be improved (as well as the fact that a required license was expiring shortly). Due to this, we decided to create a new system allowing for more visual interaction between the users and the application, as well as further functionality for various other features and quality-of-life. During development, we also made sure to constantly recieve input from brothers (Sam (House manager), various Assistant HM's, and multiple other brothers). While the project may be in a state ready to be demonstrated (and meeting our proposal) we have more features planned for later implementation before it is fully ready to replace the old system on our house server. Due to this, there are many TODOs in the code that should be dismissed as features to be implemented at a later date.

## Testing Instructions

- Credentials {username, password}
  - non-admin {ryfy, pass}
  - adming {sjt, pass}
- On the admin page, there are various buttons under the form that have different uses, some simply for testing
  - Submit Mod: Submit the job that is currently entered into the form
  - Submit Mods: Submit all changes made on the table by directly typing in names
  - Register New Account: Brings up a form to create a new account
  - Force Update: Forces the server to update the list of jobs and process all previous jobs, assigning new ones afterwards
  - Fill All: A Testing Button for filling all blocks with 'Jimmy Tran' (must press submit mods to apply)
  - Reset User Jobs: Resets the job history of all users (setting their points to zero as well)
- On the home page, standards can be displayed by clicking on the name of a job
- Linting/validation
  - HTML/CSS: W3C Validation Service
  - JS: JSHint

## Features

- Home Page
  - Site navbar allowing for travel to and from all pages as well as the externally hosted chapter website (on all pages except login)
  - Dynamically displays all currently assigned jobs, with the user each is assigned to
  - Standards for completion of each job are available on-click for each job

- Login Page
  - Users log in using passport local auth, and are redirected to their user profile page on success

- Profile/User Page
  - A message is displayed informing the user of their specific house job as well as the day it is assigned and the status of the job
  - Users can also see their current number of points
  - Excuses may be sent via a message box which sends the message directly to the admin for viewing
  - A table is generated showing the full stored history of the users jobs (jobs are automatically wiped based on date)

- Admin Page
  - Dynamically displays all currently assigned jobs, allowing for each job to be signed off (marked complete) via button
  - Jobs can be manually changed via the form (allowing for control of all aspects of the job) or by simply changing the name in the table
  - New accounts may be created
  - The admin may force an update of jobs, causing the server to run it's automatic update outside of schedule
  - All messages sent to the admin are displayed in a table below the form, listed in chronological order (most recent first)

- Server Functionality
  - Server stores all data using MongoDB
  - All scheduled jobs are done using node-scheduler to run them at specific times on specific days
  - Jobs are automatically processed, with points being calculated and jobs being pushed into user job history
  - Jobs are automatically marked late if they are not completed on time
  - All automated functions of the server (regarding jobs) may be done manually for special cases

## Challenges
  - Due to exclusively using MongoDB for data storage, we had issues with promise resolutions when attempting to read data from collections, which required quite a bit of debugging and tinkering
  - Developing functionality with data was difficult in the beginning, as we had to create all of the data from scratch without knowing for sure the schema that would be used
    - To begin some parts, we had to manually create up to 36 documents in a single collection, storing 10 fields of different types in each
    - Even passport users are stored in the cloud, requiring us to implement systems without having all the data yet
  - Ensuring all jobs were processed correctly, giving the correct number of points and being applied to the correct users, was a tedious process

## Further Development
Future implementations include:
  - Point ranking and completion rate for users
  - Depreciation function to decay points as time goes on (for better balancing between brothers)
  - A new system for assigning jobs to users, allowing for a more fair way to distribute jobs (the current system we've had for a while has some key flaws)
    - Would include processing a preferred list of jobs, giving the highest priority possible based on user points
  - An additional admin level, below the current admin level, allowing for jobs to be signed off and basic info (House Manager vs. Assistant House Manager vs. Standard)
  - Automatic bonus points based on positions
  - Message tools allowing the admin to accept or deny excuses, changing the status/value of the job
  - Admin display of all user's history and points
