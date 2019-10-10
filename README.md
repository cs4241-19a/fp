- When beginners try playing a rhythm game like DDR, they may often fumble with the controls a bit. Though there is 
definitely some level of skill that must be developed over time, anyone should be able to easily pick up a rhythm game.
In my experience, the issues that people have with many rhythm games are *Timing* and *Coordination*. Coordination here 
refers to the player pressing the right button corresponding to the visual indicator on screen while Timing refers to 
the player pressing that button at the correct time. 

    Coordination is the bigger of the two issues. In traditional DDR, the "Step Zone" refers to the
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

- Built using an "object-oriented" state machine pattern. Pressing "Enter" will attempt to change to the next state while 
pressing "Esc" will attempt to change to the previous state.
- AntiMicro: tool used to map game pad to directional keys
- MongoDB: database tool
    - Store users
        - Username and pass
        - High score
        - Favorited songs
    - Store high scores (universally) for specific songs
        
