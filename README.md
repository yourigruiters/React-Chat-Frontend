# Ubiquiti coding challenge

Full-stack chat application created for Ubiquiti as code task.

## Description

The task was to create a client and server chat application. I decided to use a custom react setup (not using create-react-app) including TypeScript and Sass that I created in April of this year but never used. This backfired a little bit when needing to deploy to Heroku.

The requirements from my Salt coach were using React, Redux, TypeScript, unit tests and e2e tests. I was free to implement any UI/UX to my preference and had a bullet list of tasks that needed to be implemented into the system from Ubiquiti.

**Personal difficult parts...**

- ...create socket.io chat application without any server crashes on live production;
- ...using TypeScript for the first time in a project, both client and server side;
- ...using Redux for the first time in a project;
- ...researching and implementing SIGINT and SIGTERM signals;
- ...implementing unit and e2e tests, not my most confident area of expertise;
- ...deploying the complete application to Heroku.

### Technical implementations

Frontend

- React
- React-router-dom
- Redux
- Socket.io-client
- TypeScript
- Axios
- Lodash
- Sass
- Classnames
- Custom webpack config

Backend

- Express
- Socket.io
- Typescript
- Cors

Styling

Mobile first responsive design using Sass with flexbox and BEM.

##### Landing page

![Homepage](/readme_screenshots/homepage.png)

###### Menu Room (Pick a Chat)

![Menuroom](/readme_screenshots/menuroom.png)

###### Chat Room

![Chatroom](/readme_screenshots/chatroom.png)
(Left and right side is 2 different browsers, simulating 2 users)

###### Video Room

![Videoroom](/readme_screenshots/videoroom.png)
