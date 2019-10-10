Assignment 5
=================

**This Project was completed by Andrew Hand, WPI 2020**

The following link goes to my Magic the Gatherig Deckbuilder App that was designed to allow users a simple and effective way to create and edit
custom desklists. To aid in the design I also implemented a dynamic vizual to help the user accurately determine the 'Mana Curve' and 'Color Identity'
of the deck.

https://fp-andrewhand.glitch.me/

The site requires you to log in before use.

One of the biggest challenges I faced during this assignment was **Callback  Hell**, and boi was it. Almost 100% of my Full-Stack experience was developed
using Flask (The superior back-end; You can tell me anything and I will remain ignorant) which does not have to worry about synchronistic functionalities.
Not knowing how to properly use asynchronous functions in JS (and not to keen on figuring it out) made implementing a few of my feature quite troublesome.
There were multiple attempts to get the Gather API call to behave as expected and even still it gets behind of the /read request, making it neccessary to
refresh the page to see any /add(ed) elements to the decklist.


To Use:
------------
The site requires you to log in before use.

- Click `Add` to add the information from the `Quantity` `Card Name` and `Set Name` Fields. (The page my need to be refreashed to see these changes)
- Click `Update` to change the information in the `Quantity` field for a given `Card Name` and `Set Name`. <br />
  **NOTE:** The `Card Name` and `Set Name` fields may not change for this.
- Click `Update` then `Delete` to delete the a entry entirely.
- Click `Login` in the nav bar to log into your account.

Currently the only user is: <br />
**Username:** *Andrew* <br />
**Password:** *Password*

To create a new user: <br />
- Click the `Sign Up` button. <br />
- Enter a new `(username, password)`. <br />
- Then click `Sign In` and you should be directed to the Login page.

To log out of your account:
- Click `Sign Out`


Achievements
-------------------
- Use of D3 to create a dyamically loaded vizual.
- Use of the Gather (MtG) Api to obtain the all addtion card information based on the card (Name, Set)
- Use of a enviromental variables to create a secure session secret.
- Implementation of SQLite to store persistent data to be displayed in the deck list table. 
- Use of automatic redirects for the sign in/out pages that vary for success and failure cases.
- Users decklist will only appear for that user, and no other user.
- Use of Bootstrap in place of traditonal CSS styling to simplify the design of the website.

