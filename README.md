# **Care Compare**
## Contributors
Jack Gerulskis, Ken Desrosiers, Ben Emrick, Sean Dandeneau

## Note to the grader

Link to Care Compare: https://dlqey5pzf7.execute-api.us-east-1.amazonaws.com/production/

This application was started by Jack Gerulskis and Ken Desrosiers last May. We received permission to continue this project as long as we clearly outlined the work that is going to be done. Sean Dandeneau and Ben Emrick are also going to be helping with this project.

We included code to our two other backend's that both utilize node js. They can be found within the AWS-Lambda folder at the top level of this project. They are APIs but don't run on the actual CareCompare lambda, they have their own servers. The APIs are integrated on the contact us page, medical history form, and the hospital compare page.

## Previous Project State 

#### Account UIs

The account components including log in, sign up, changing account info, password recovery, and confirm email are all fully integrated with AWS Cognito (User Authetification). However, little time was put into the UIs leaving the site looking unfinished. We are going to do a complete UI overhaul on the 5 previously mentioned components.

![Account UI](https://github.com/jgerulskis/CareCompare/blob/Sprint12/QA/src/readme/accountUI.png?raw=true)

#### Account UI Overlay Bug

This is a bug that occurs when using the account UI pages. A weird translucent overlay appears and is only dismissed when the user clicks somewhere on the page.

![Overlay Bug](https://github.com/jgerulskis/CareCompare/blob/Sprint12/QA/src/readme/overlayBug.png?raw=true)

#### Contact Us Page Full Stack

The Contact Us page was started at one point and eventually nuked. We want to add a contact us page with working API to send us emails

![Contact Us](https://github.com/jgerulskis/CareCompare/blob/Sprint12/QA/src/readme/contactus.png?raw=true)

#### Home Page UI Refactor

The home page currently consists of a background video and some simple text over it. We want to create a more professional home page that has more explanation for the user. 

![Home Page](https://github.com/jgerulskis/CareCompare/blob/Sprint12/QA/src/readme/homepage.png?raw=true)

#### Navbar Bug

After scrolling more than the view height, our nav bar becomes 'unsticky'. We want the navbar to always stick. The page in the picture below will also get a brand new feature which will talk about in depth later. Some style changes were applied to this page

![Navbar Bug](https://github.com/jgerulskis/CareCompare/blob/Sprint12/QA/src/readme/navbarBug.png?raw=true)

## Target Users

- The website is aimed at anyone seeking medical care, but more specifically, those with Medicare.
- Additionally, an older audience is expected, so many UI choices are made with this in mind.

## CS 4241 Final Project Accomplishments

- AWS Lambdas were used to host our backends. The Lambdas are 'serverless' servers, so they are only running when someone is requesting a resource. We made three
    - One for Care Compare
    - One for a Medical History From
    - One for an Emailing Service
- API Gateways were used to allow the lambdas to have endpoints so they could access each other via post and get requests.
- Simple Email Service (AWS SES) was used for emailing completed forms on the contact us page to our email.
- Google Analytics integration to track basic data about users visiting our site such as when, where, and for how long they visit.
- Bug Fixes
    - Translucent overlay
    - Navbar not remaining sticky
    - Footer blocking content
    - Malformed API Requests
- UI Refactors
    - Account
    - Log in 
    - Sign up 
    - Password Recovery 
    - Confirm Email 
    - Home Page 
    - Contact Us
    - Some small changes on hospital comparison page
- Added slider to hospital comparison page to display user data.
- Pagination to the procedure compare page
- Design consideration regarding elderly users. Material design, and easy to use components were a priority.

Furthermore, we incorporated a persistent SQL database on the back-end to store data for an optional medical history survey. When a user is logged in, a form will display on the account profile page. The form notifies the user that are anonomously sharing valueable information about a recent medical procedure. No identifying information is collected by Care Compare. The form allows input for the procedure's associated DRG code, location (preferrably hospital), their insurance provider, and how much they had to pay out of pocket. This information allows us to collect information about medical practices in society and compare actual experiences with the data provided by Care Compare. The UI form contains client-side validation using built in Angular properties. 

To implement this feature we created a Postgres instance in AWS RDS. This step was particularlly difficult as we struggled with configuring the proper VPC security groups and IAM roles in order to access the Postgres instance in AWS. We used pgAdmin 4, an SQL client, to manage the database locally and create the relational schema. Then, we included a Node.js server inside of an AWS Lambda, which uses the `pg` node module (https://node-postgres.com/) to connect and interface with the Postgres database. Here we are able to query the database for records that match a desired DRG and insert new data into the table. We then implement an AWS API Gateway to connect the client-side of the web application to the server-side logic. This introduced numerous issues related to managing CORS headers on all of the endpoints. This components allows us to manage request/response to and from the API in order to process data and then present it to the UI. 

Utimately, this feature manifests into a collection of user data on the Price Compare page. Initially, this page shows search results for the selected DRG with information pertaining to hospitals and their associated metrics. Now, there is a toggle in top right of the UI to load an alternate view, which displays all of the submitted form data pertaining to the selected DRG. Users can now view anecdotal information about specific procedures, which in turn drives more informed decision making abilities. 

To view this feature, search in the procedure selection component for drg code 001. We added in plenty of sample data there to demonstrate the idea.

Throughout the course of the project configuring AWS settings and integrating multiple cloud services proved to be the most troublesome development experience. 

## Division of Work
- Ben Emrick was responsible for building the UI for the Medical History Form on the Account Profile page and providing the client-side validation. He also configured the Postgres instance in AWS RDS and managed the database in pgAdmin. He contributed a significant amount to building and debugging the AWS Lambda and API Gateway involved in the workflow for this feature. Ben also helped with several bug fixes and was active in designing new features, providing improvement suggestions and testing the functionality of the user data display on the Price Compare page.

- Ken Desrosiers was responsible for fixing the footer covering content, the dissapearing nav bar, the translucent overlay, and the working contact email form. He got the contact page to work using AWS API Gateway, Lambda, and SES. He also contributed a significant amount to the building and debugging of the Lambda and API Gateway involved in Ben's feature mentioned above. Also, Ken worked on the deployment of the site.

- Jack Gerulskis was responsible for building the Home Page UI, and refactoring the login, signup, account, email confirmation and password recovery UIs. He also did work on the care comparison page. He added the toggle between medicare API and user data as well as add some styling changes to the cards that hold the hospital info. He made some miscelaneous bug fixes. He also spent a large portion of time building and debugging the AWS Lambda and API Gateway for the Medical History Form with Ken and Ben. Jack worked with Ken on the deployment.

- Sean Dandeneau was responsible for multiple smaller scale front-end changes. Additionlly, he made multiple bug fixes including removing the double scroll bar from the hospital compare page. Lastly, he was responsible for quality assurance testing as well as review and correction of formatting and other errors on the front-end. He also covered a large portion of the documentation. 

## The Problem 

The Healthcare Economy is due to increase by 5.5% until 2026 where it will reach a $5.7 trillion evaulation ([source](https://www.modernhealthcare.com/article/20190204/NEWS/190209984/hospital-price-growth-driving-healthcare-spending)). That raises some reason for concern becuase this inflation is not from an increase in need for healthcare. The majority of the ongoing inflation is from hospitals taking more money from insuarances which then take more money from the consumers. Most times, the consumer doesn't know how much they really have to pay for a procedure until after it is performed, because what other choices do they have?

## Overview

This application uses Medicare APIs (*found [here](https://dev.socrata.com/foundry/data.cms.gov/fm2n-hjj6)*) to compare hospitals for patients seeking treatment for specific [DRG Codes](https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/MedicareFeeforSvcPartsAB/downloads/DRGdesc08.pdf) by rating, cost, and distance. DRG Codes are a system created by the Center for Medicare Services to group together hospital procedures under a single category. The DRG system allows Medicare to get specific pricing information about a procedure. CMS writes, "We’ve also improved the accessibility of hospital standard charge information by updating our guidelines to require hospitals to make available a list of their current standard charges in a **machine readable format**" [source](https://www.cms.gov/blog/you-have-right-know-price). Care Compare makes things easier for the consumer by creating a simple and responsive visualation of the medicare data that was provided in "machine readable format". Health care is not just about price. Hospital ratings are even more important, so our web app integrates those as well. Lastly, Care Compare allows consumers to filter results by what hospitals are closest to them.

Health Care is a complicated system which is overdue for reform. Although the standard charge data is a start for hospital pricing transperancy,the out of pocket costs for any given consumer are extremely hard to estimate, mainly because your insurance negotiates the price of a procedure with the hospital. It's also important to note that Medicare users are given government subsidized health care. That's the main point of Medicare - It is a step towards 'free' healthcare. That means this information is not particularly important to that audience. It is more for non-medicare users to see what the government negotiated procedure prices are. In many cases, this also reflects what your insurance is paying.

**Does this information save the non Medicare user money? That's what we need to find out.**

At the end of the day, a doctor's opinion is a very important part of this decision process. Before tools like Care Compare, a doctor's recomendation would be the only guidance you had. This tool brings consumer decisions to an area that has never had it before. It is our belief,that you have the right to know and weigh all your options before making a heath care decision.

# **For Contributors**

## Tech Stack

1. Angular Typescript (TS, HTML, CSS/SCSS)
2. AWS Lambda (*Serverless* hosting)
3. AWS Cognito (Authetication)
4. AWS S3 Bucket (File Storage)
5. JavaScript
6. Center for Medicare Services API (https://dev.socrata.com/foundry/data.cms.gov/fm2n-hjj6)
7. Google Geocoding API

## Setting Up Development Envirorment

1. Clone and navigate into the repository
3. Run `npm i -g angular/cli`
2. Run `npm i`
4. Start development server with `ng serve`, it defaults to port 4200, view at (`http://localhost:4200/`)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Version Control Policy

Release branches are stable working versions of the code. QA branches are suppose to remain stable but allow for integration testing and additional bug testing. Feature branches are highly encouraged to be created then merged in to QA with a pull request. For pull requests into QA please try and get one additional reviewer.

## Build

Run `ng build` add an optional production flag to enable production mode.

## Serverless Deployment

1. ng add @ng-toolkit --provider aws
2. npm run build:serverless:deploy
3. This can become difficult at times, trust me.

## Live Development Deployment

> https://dlqey5pzf7.execute-api.us-east-1.amazonaws.com/production/

# **Recap of Final Project Work**

UI Refactors:
* Redesigned the hospital cards on the compare page
* Home Page Changes:
  - Parallax implementation
  - Quotes from experts in the health care field to enhance the professional feel of the page
  - CareCompare description with logo, giving users an idea for what CareCompare provides immediately upon visiting the page
* Confirm Email
* Account Sign Up
* Account Management
* Log In
* Reset Password

Backend:
* Amazon Web Services (AWS)
  - Virtual Private Cloud to host the Postgres instance
  - Lambda ("serverless server") for contact form submission (Simple Email Service (SES))
  - Lambda to connect CareCompare backend with the Postgres instance
  - Lambda for CareCompare
* SQL Persistent Storage - Postgres (User Medical History Form - Front end described below)

Frontend:
* Bug Fixes:
  - Navigation Bar did not stick after a certain point on the procedure compare page
  - Footer was blocking the body's content
  - Translucent overlay on Account UI
  - DRG table had 2 scroll bars
  - Account page had white space at the bottom at 150% resolution
* Design changes to cater to an elderly userbase:
  - Price slider on the compare page changed to simple ascending/descending sorting buttons
  - Added Pagination
  - Updated Material Design
* Medical History Survey
  - Located on the profile page
  - Allows users to complete an anonymous survey that collects previous medical procedure history
  - User enters the procedure they had, where it was performed, their insurance provider, and their estimated out of pocket cost for the procedure
  - This information is stored in Postgres database
  - Users are able to view data that has been entered into this database using an easy to understand table
* Other Changes:
  - Remove user account validation before searching/comparing

Other:
* Google Analytics Integration using Google Firebase to track basic data regarding users visiting our site such as when, where, and for how long they visit.
