# cs4241-FinalProject
https://a6-final-project.glitch.me

## Perlenspiel Garageband
### Description
It is a simple music recording website that allows users to record 5 second clips, and play them back. The current version allows for 4 seperate tracks for each instrument for a total of 8 tracks.
Users that login/signup are able to save their songs for others to playback or remix.
### Instructions
The website is fully functional without having to log in, but if you want to save songs please log in (username, password) or signup.
### Technology
 - This page is heavily based the Perlenspiel game engine written by Professor Brian Moriarity [https://perlenspiel.net/] and uses the engine for its main functionalities.
 - The database used for this assignment was Google Firebase
 - The user authentication uses passport to validate credentials. The strategy used was a local strategy to avoid needing to query external credentials.
### Challenges
 - The Perlenspiel engine can cause regular html elements (for example select boxes) to stop responding, and that caused some major problems when trying to figure out how to let the user naviagte through the saved songs.
 - We initally planned to use MongoDB, but for some reason the database was not loading properly so we switched to Firebase.
### Authorship
Server: Anagha
Passport: Anagha
Perlenspiel: Natalie
Database: Anagha & Natalie
