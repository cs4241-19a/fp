# cs4241-FinalProject

For your final project, you'll implement a course project that exhibits your mastery of the course materials. 
Similar to A4, this project gives you an opportunity to be creative and to pursue individual research and learning.

## General description

- Static Web page content and design. You should have a project that is accessible, easily navigable, and features significant content.
- Dynamic behavior implemented with JavaScript.
- Server-side programming *using Node.js*. Typically this will take the form of some sort of persistent data, authentication, and possibly server-side computation.

Additionally, you should incorporate features that you independently research, design, and implement for your project.

## Project ideation

Excellent projects serve someone/some group; for this assignment you need to define your users and stakeholders. I encourage you to identify projects that will have impact, either artistically, politically, or in terms of productivity. Consider creating something useful for a cause or hobby you care about.

## Logistics

### Team size
Students are encouraged to work in teams of 2-5 students for the project. This will allow you to build a good project without expending an excessive amount of effort. While I would expect a team of four or five students to produce a project with more features, I expect a every team's work to exhibit all of the required facets described above.

### Deliverables

__Proposal:__ 
Provide an outline of your project direction and the names of the team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline.
This file must be named proposal.md so we can find it.
Submit a PR to turn it in by Monday, September 30th, before class

There are no other scheduled checkpoints for your project. 
You must be done in time to present before the final project demo day (October 10th). 

#### Turning in Your Outline / Project

- Uses the leap motion or something

**NOTE: code is due before the project presentation day due to the end of term / grading schedule constraints**
Submit a second PR on the final project repo to turn in your app and code.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service.
Folks on the same team do not need to post the same webpage, but must instead clearly state who is on the team in their proposal.
(Staff will use the proposal to build the grading sheet.)

## Final Presentation

Presentations will occur during the final day of class.

## FAQs

*Riding Through Space on a Cloud Woven from Hopes and Dreams*

- **Can I use XYZ framework?** You can use any web-based frameworks or tools available, but for your server programming you need to use node.js.

MARVELOUS PERFECT GREAT GOOD ALMOST MISS

##DESIGN CONSIDERATIONS
- When beginners try playing a rhythm game like DDR, they may often fumble with the controls a bit. Though there is 
definitely some level of skill that must be developed over time, anyone should be able to easily pick up a rhythm game.
In my experience, the issues that people have with many rhythm games are *Timing* and *Coordination*. Coordination here 
refers to the player pressing the right button corresponding to the visual indicator on screen while Timing refers to 
the player pressing that button at the correct time. 

    Coordination is the bigger of the two issues AEFSDAFWSDFS. In traditional DDR, the "Step Zone" refers to the
set of stationary arrows near the top which must line up with the scrolling arrows rising from the bottom of the screen.
When a scrolling arrow lines up with the stationary arrow, the player must press the corresponding arrow key on a dance
pad. An issue for new players is that these categories are laid out horizontally in the order of "Left", "Down", "Up",
and "Right"; that is, the spatial positioning in regards to the "Down" and "Up" arrows has no correlation to physical 
location of the "Down" and "Up" keys on the dance pad. The only indicator that the player receives is the direction in
which the arrow's shape points. Fig. 5.1 of "Visualization Analysis and Design" shows the visual channels (in order of 
effectiveness) which people use to distinguish between different categories. It shows that shape is the LEAST effective
categorization, whereas spatial region is the MOST effective categorization. In order to better demonstrate the link
between the physical arrow and the arrow keys, on the right side of the screen, the asteroids line up with the "Step 
Zone" in the direction the arrows are pointing: asteroids coming from the top of the screen are destroyed with the "Up"
key, asteroids coming from the right of the screen are destroyed with the "Right" key, etc. I also apply color, the 
second most potent visual categorization, by adding color to each "lane" and all arrows in said "lane".

    Timing, an issue which is mostly solved by using the timing of music, can also be bolstered with visual channels by
partitioning areas of the screen into "notes". 

    - Added color scheme to arrow keys, each lane has one color
    - Applied same color scheme to the sprite animation in circle indicator around the character in a Simon Says-esque fashion 
    


- Built using an "object-oriented" state machine pattern. Pressing "Enter" will attempt to change to the next state while 
pressing "Esc" will attempt to change to the previous state.
- AntiMicro: tool used to map game pad to directional keys
- MongoDB: database tool
    - Store users
        - Username and pass
        - High score
        - Favorited songs, maaaybe ranking songs
    - Store high scores (universally) for specific songs
    
- Game Mechanics
    - Star Power
        After getting a big enough combo, activate the "Nitro" boost, doubling score earned during that duration
        
- Transcript
    - Welcome on your journey Riding Through Space on a Cloud Woven from Hopes and Dreams. This is an early version of a
    rhythm game inspired by DDR but designed around web technologies. In the main menu, you can access the login page, 
    story mode, and free play. In game, use the arrow keys to blast the asteroids and earn points! You can also play 
    with the dance pad, the arrow keys on the pad correspond to the arrow keys on the keyboard. Press ESC or △ to go
    back a menu or pause the menu and press Enter or X to confirm.
    
    - You are mentally connected to the cloud-rider (on the right)
    - 
    
- WEAPONS
    - Basic gun (no effect)
    - Missiles (automatically destroy mines)
    - Lasers
    - Omega Cannon
    - The Blaster of Hopes and Dreams
- ENGINES
    - Basic Engine (no effect)
    - Slipstream Engine (stack up to 2 "Nitro" fuel cells)
    - Hellfire Engine (Increase the number of notes for the next few measures)
    - Warp Drive ()
- SHIELDS
    - Basic Plating (no effect)
    - Sticky Plating (automatically hold held notes)
    - Calamity Field (cannot drop hp or combo while using a "Nitro" boost)
    