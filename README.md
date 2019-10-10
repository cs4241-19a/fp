# cs4241-FinalProject: qMe by Terry Hearst, Demi Karavoussianis, Kyle Reese, and Tom White
Welcome to qMe! qMe is a priority queue application to assist in personal scheduling and time management. Any user can create an account with qMe. With an account created, users can enter tasks that they need to complete, along with the deadline. Depending on when the task is due, and what priority the task is ranked, qMe display the tasks in order of when the user should complete the task. Additional customization of tasks is offered, like the ability to say you need more time, or to push a task off until later, all with one click. Once a task is completed, it can be checked off as the user continues to their next task.

## Additional Instructions
- Log in or create an account, our data is persistant!
- Click to create a new task, fill in all the necessary blanks and submit
- try to mark an item as done, or delete it from your queue.
- click the "Do Later" button on an existing task to move it further back in your stack
- Click the "More Time" Button to move a task higher on the priority list.

## Technologies Used
- For our front end, we used React, Bootstrap, and React-Bootstrap. These were all used in conjuction to create the cards and thier behaviors. 
- Using react, we were able to create the layered stacking card effect that you can see by creating more than one task. This effect deploys transitions (click "done" on a task when there is more than one queued, it's beautiful), as well as z-indexing for the stacking. It also uses variable vertical height to give the illusion of the splayed cards
- We used of react-bootstrap to create the ability for the user to create a new card. This option let us explore various react-bootstrap props, like cards themselves, but also Forms, radio buttions, and text. Formatting the form within the card was tricky.
- We went beyond the standard bootstrap css, and overrided it with custom scss. The colors were carefully selected looking at pastel palattes from https://visme.co/blog/pastel-colors/
- In addition, we worked heavily with the interaction between props at different components of our code. This involved working with the different binding methods beyond just default binding.
- To store our data persistantly, we used SQLite. The database stores the users, as well as the the tasks and associated data.
- Our passwords are salted and Hashed to ensure security. 
- Our code is overall consistant with HTML standards, in the respect that we deployed correct error codes on all GET and POST responses.
- The front end and back end are in different modules, so they have different packages, builds, and dependencies, which allowed the front end and back end developers to work seperately, but easily merge code when necessary.


## Challenges Faced
All group members decided to challenge themselves, and work on a portion of the project with which they had little to no experience, while helping other teammates in areas they were more familiar. Besides that, one of our biggest challenges was coordinating code structure and architecture and trying to remain consistant to avoid messy Git merging.
  - Terry, who worked on the back end implemented salting and hashing for the login. 
  - Demi worked with React, Bootstrap, and React-Bootstrap, specifically in designing the cards and the card-input menu. The biggest challenge was finding solid documentation, specifically with React-Bootstrap. Usually there was only the offical React-Bootstrap documentation and not too many third parties sites discussing React-Bootstrap.  In addition, getting the SCSS to work successfully took some time and debugging, which was difficult because the code in question was not Javascript, but CSS.
  - Kyle worked with an ORM for databases. He had not used an SQL based language before, so learning that quickly, and implementing a database was a challenge.
  - Tom worked with React and React-Bootstrap. He had challenges creating the proper z-indexing and queue structure to create the splayed card effect. In addition, he worked on getting the necessary information to each code layer through the use of props, which required more research (and some frustration) with bindings. Tom also set up the seperate front-end and back-end development structure to allow us to work independently as a team.

## Group Contributions
### Terry Hearst
- Set Up back-end server
- Developed all endpoints
- Created salted and hashed passcodes for logging in
- Wrote algorithm to prioritize cards
### Demi Karavoussianis
- Created Task cards using React, Bootstrap, and React-Bootstrap. This included both the card to create an new task, as well as the cards in the splayed view.
- Created log-in screen with validation to ensure the appropriate fields were filled out before submitting
- Created custom Bootstrap SCSS using a pastel pallete (cited above)
### Kyle Reese
- Created databases holding information about users and their associated tasks
- Created functions for retrieving data from databases
### Tom White
- Worked with React, Bootstrap, and React-Bootstrap to create the interaction between cards. He created the layering effect, and the translations when a card is moved
- Handled edge case of no cards in deck
- Translated API calls to retrieve information from card class to application layer

