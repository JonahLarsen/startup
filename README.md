# Tic Tac Toe

[My Notes](notes.md)

This app allows people to play Tic Tac Toe together over the internet. It updates with people's moves in real time and allows you to create an account that will track how many wins and losses you have. This way you can become better at Tic Tac Toe and see how you compare to others. 


## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever wanted a simple online service that would allow you to play Tic Tac Toe with your friends online whenever you want? This website will allow you to play online Tic Tac Toe games. It will also allow you to create an account that will track your wins and losses. This makes it so that you can compare your Tic Tac Toe ability with others and see who is better. 

### Design

![Design image](/img/MockUp.png)

### Key features

- Players can play online Tic Tac Toe games against others.
- People can create accounts and can track their wins and losses in Tic Tac Toe games.
- Each player's moves will be updated in real time so that they can see the moves of the other person as they happen.
- Third party API: OpenAI. Ask chatGPT what the best next move would be.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Create the pages and the structure of the website including the important links, buttons, etc.
- **CSS** - Make the page colorful and attractive and make the area of the actual Tic Tac Toe game look nice and enjoyable.
- **React** - Recreate the page when the users selects login, register, etc. and more easily develop the look and structure of the site.
- **Service** - Backend endpoints for getting numbers of wins and losses, user's login/register, creating and removing games.
- **DB/Login** - Store user login info, game info, wins/losses, etc.
- **WebSocket** - Update moves in real time so that both players can see the status of their game and the other player's moves.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://jonahlarsen.click). 

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Main page where you play the game, login page, and page where you can see all games and record
- [x] **Proper HTML element usage** - I used proper elements to structure and organize the page.
- [x] **Links** - links to each of the other pages.
- [x] **Text** - there is text throughout the page for all of the usernames, game info, instructions, etc.
- [x] **3rd party API placeholder** - Fake button to send request to OpenAI api.
- [x] **Images** - Image for placeholder for tic tac toe and for W/L Ratio.
- [x] **Login placeholder** - Login page with username and password fields. Display username above game.
- [x] **DB data placeholder** - Data about games and user's wins/losses.
- [x] **WebSocket placeholder** - Automatically updated when each user takes their turn by updating game and updating whose turn it is.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Css for colors and text etc.
- [x] **Navigation elements** - Navigation is properly styled.
- [x] **Responsive to window resizing** - Page shifts using flex and navbar becomes vertical when small.
- [x] **Application elements** - Centered and attractive, username and password input is fancy. Buttons are fancy.
- [x] **Application text content** - Nicer font, color, etc.
- [x] **Application images** - image is resized using css.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Used Vite to bundle React version of app.
- [x] **Components** - Built components for each part of the app.
- [x] **Router** - App routes to different components/

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - You can login, check games, play tictactoe against a fake person through setInterval, when you win or lose it updates your record, logout, etc. A lot of it is using localStorage for now that will be the database in the future. And setinterval is powering the main part which is playing tic tac toe.
- [x] **Hooks** - Used useEffect all over, useState all over, and setInterval

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
