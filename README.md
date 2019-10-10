# Carbon Footprint
### Team: Georgina Cromwell, Corrin Courville, Kaitlin McDermott
Website: https://final-project-gcc-cmc-kmd.glitch.me/

## Project Purpose:
The impact that you have on the environment is greater than you think. The purpose of our web application is for a user to understand just how great their impace is on the environment. It will raise awareness to all the little things in your daily routine that can be changed. 

## How to Use: 
- Create a username and password by pressing the sign-up button 
- login with the username and password you created
- on the home page, there are two data displays that are blank. 
- to add data, go to *submit a weekly report* and fill out the form 
- upon submit, you will be brought to the home page where the data will display
- as you add data using the *weekly report*, the data displays will populate. 
- the user can also interact with the graph: download as a png, zoom, and select different data points

## Technical Achievements: 

- user login using Passport 
- css using Bootstrap  
- css built from scratch
- data visualization using Plotly (which is built off of d3/svg)
- persistant data using Mongodb 
- server using Express
- user inputs information using a form 
- After login, there are two views: 
  - data input (weekly form)
  - user's data visualization (table and updating graph)

## Design Achievements: 
- user friendly UI 
- easy navigation between different views
- asthetically clean and pleasing visualiztion 
- font and colors that make the text easy to read
- impactful and thought provoking  

## Project Challenges
- Getting the data visualization using Plotly to work properly : we spent a lot of time researching data visualization and different tools after trying to get d3 to work (we had difficulties getting it to work)
- Researching how to calculate a carbon footprint specifically for students was difficult because most carbon footprint calculations involve electricity/water bills. Instead we individually researched daily habits and figured out their carbon footprint.
- Difficulties handling and processing the data in and out of the MongoDB
- A lot of time spent in the UI design (page layout, text, fonts, colors, etc) 

## Background Research Questions
- What is a carbon footprint ? 
- How is carbon output calculated ? 
- What are a good sample of questions to represent a well-rounded carbon footprint?
- Link to source of initial algorithm: https://www.teachengineering.org/content/cub_/lessons/cub_whatkindoffootprint/cub_footprint_lesson01_worksheet_v3_tedl_dwc.pdf
- What is plotly and how do you implement it? 
- What makes a good UI ? 

## Responsabilities 
- Georgina Cromwell : Data Display/Homepage JS and MongoDB, Signup JS and MongoDB  
- Corrin Courville : Weekly update JS and MongoDB,  signup JS
- Kaitlin McDermott : All of the CSS, HTML, and visual formatting
