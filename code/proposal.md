# Proposal for six-pact

![logo](img/six-pact-logo-transparent black.png)


#### Team Members
- Kit Zellerbach
- Petra Kumi

#### Outline
We propose a web app called six-pact. It is an app that will facilitate goal setting within groups, as well as providing tools
to enforce accountability and incentivize members.

Users can be part of "six-pacts", which are essentially groups containing members who are striving for weight loss or 
fitness goals. The app utilizes the competitive nature of human beings to motivate one another. The app also contains a reward
system, as well as global and local leaderboards.

The app will make use of a dashboard layout using principles from material design. Planned features include dynamic graphs,
mobile compatibility, integrated machine learning, user accounts, notifications and email reminders, global and local leaderboards,
calender integration, MFP and FitBit integration, and blob storage.


### Technical details
- Front-end Framework: Angular 8 CLI (ngx-admin template)
- Database: MongoDB or Firebase (both json and blob storage)
- Server: Node.js
- Middleware: Passport or FirebaseAuth
- Other libraries: D3.js, Three.js, Babylon.js, Tensorflow.js (most likely will be more)
- Other components: Flask python server for machine learning REST API


### Feature List

- Weight & Fitness goals
- Team Leaderboard
- Global Leaderboard
    - Divisions based on goals
- Path to victory
- Item collection e.g. think avatar clothing, gym objects, club penguin, pokemon
- Trophies (reward system)
- Personal Stats
- Team Stats
- Dashboard UI
- D3.js graphs
- Machine Learning
- Responsive UI for Mobile Devices
- Integrate with MyFitnessPal and Fitbit
- Email notifications/reminders
- User avatar
- Calendar
    - Finding times to workout
    - Notification settings
    - Smart reminders
- Reminders when friends are working out
- Body measurements
- "Trello"-esque board
- Firework explosion on goal/sub-goal reaching
- Personality assessment (motivators)
- Can be part of many teams
