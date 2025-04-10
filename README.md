# Your startup name here

[My Notes](notes.md)

This app is a stock voting app that allows users to vote on the stocks they like the most, and see the stocks that all users have voted for the most.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever wanted to be able to share with your friends stocks that you think are going to perform well and that you think are worthing buying? This app will allow you to monitor the change in stock prices and vote with your friends on which stocks you think are the best, so that they will appear for everyone to see. As users indicate which stocks they like, information showing the popularity of those stocks will appear, and the stocks will change order to show the most popular at top.

### Design

![Design image](img/design.png)


### Key features

- 3rd Party API to display current stock information
- Ability to login securely using https
- Ability to vote on stocks
- Persistenly store how many votes each stock has and what each user has voted for
- Ability for user to change their votes

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Use good HTML structure with a login page and a voting page.
- **CSS** - Make the site look good and work on various screen sizes. Good color and not overly distracting.
- **React** - Makes it so that a user sees a login and then once they are logged in they can see all of the stocks and their rankings. Make it so that users can click and vote on the frontend and have that go to the backend.
- **Service** - Endpoints that retrieve all the stocks, use a 3rd party api to get current stock information, register and login, communicate with the database, and send votes that the user makes.
- **DB/Login** - Store stocks, their votes and rankings, user's credentials, and user's votes.
- **WebSocket** - Allow users to see other user's votes and update the ranking of the stocks.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Created three html pages for each part of the application. Home page to login/create account, vote page to select the stocks you want to vote for, and scoreboard to see which stocks have the most votes.
- [x] **Proper HTML element usage** - I use proper HTML tags, attributes, etc.
- [x] **Links** - Links between the application pages. Link to my github repo in the footer.
- [ ] **Text** - I did not complete this part of the deliverable.
- [x] **3rd party API placeholder** - Scoreboard has images as placeholders. Later will show the live stock price.
- [ ] **Images** - I did not complete this part of the deliverable.
- [x] **Login placeholder** - Index.html has a placeholder for the login functionality.
- [x] **DB data placeholder** - Login and register will utilize the database, also number of votes and who voted for each stock.
- [x] **WebSocket placeholder** - Scoreboard has placeholder values for the number of votes per stock. Later will update live.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

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
