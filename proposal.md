# cs4241-FinalProject Proposal

## Team Members and Github Usernames
Vandana Anand (vanand23)

Ching Wing Cheng (WinnyCheng)

Janette Fong (jlfong)

Shine Lin Thant (heartkiIIer)

Joseph Yuen (jhyuen)


## Knock Knock

#### Purpose
To develop a web application that allows for landlords and tenants to communicate, view upcoming events, and process payments. 

#### Users
Landlords - communicate to tenants and manage services/event/payments
Tenants - request for stuff that’s broken to be fixed with a priority tag 

#### Features

##### General

- Light/Dark mode
- Login 
- Registration - unique keys per apartment
- Profile Information - name, phone number and email
- Activity Calendar (shared calendar for tenants/landlord) - payments, handy-man appointments, house tour for the new tenants
- Notifications - user is updated when a new service/event/payment is scheduled

We will be making separate views for the Landlord and Tenants:

##### Landlord
- Schedule Service/Event/Payment -  landlords can add details for service/event/payment and set notification reminders

##### Tenants
- Request Service - tenants can select a preloaded or custom request to the landlord
- Payment - tenants can process payments requested by the landlord

#### Technologies
- Passport authentication
- Node.js
- Express server
- lowdb or MongoDB
- React