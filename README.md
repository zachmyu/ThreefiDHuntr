# 3 fiD Huntr

###By [Zach Yu](https://github.com/zachmyu).

What is your next ThreefiD?

[Live site](https://ThreefiDHuntr.herokuapp.com/)

**Table of Contents**

- [3 fiD Huntr at a Glance](https://github.com/zachmyu/ThreefiD#ThreefiD-at-a-Glance)
- [Key Features](https://github.com/zachmyu/ThreefiD#Key-Features)
- [Technologies Used](https://github.com/zachmyu/ThreefiD#Technologies-Used)
- [Application Architecture](https://github.com/zachmyu/ThreefiD#Application-Architecture)
- [Frontend Overview](https://github.com/zachmyu/ThreefiD#Frontend-Overview)
- [Backend Overview](https://github.com/zachmyu/ThreefiD#Backend-Overview)
- [Conclusion](https://github.com/zachmyu/ThreefiD#Conclusion)

## 3 fiD Huntr at a Glance

3 fiD Huntr is a full stack application designed for to find the best 3D printer for you, where you can read reviews, opinions, watch videos, filter by functionality, and sort by price.

The application is made with a React frontend. The backend is an Express server with a sequelize database.

**Key Features**

- Read various reviews contributed by users
- Create new users and have user login with authorization
- Tag printer types that you're interested in.
- Boost and comment on the various printers.

![3 fiD Huntr mini-demo](/readme-assets/mini-demo.gif)

## Technologies Used

- Frontend
  - React
  - Javascript
  - CSS
- Backend
  - Express
  - Javascript
  - sequelize
  - Heroku deployment

## Application Architecture

The frontend is created using Javascript, Pug, and CSS. The backend is created with Javascript and Express with a sequelize databas. The complete project is deployed to its own Heroku server.

![application architecture](/readme-assets/pixel8-architecture.png)

##### Overview of application architecture

![Database schema](/readme-assets/pixel8-schema.jpeg)

##### 3 fiD Huntr Sequelize database schema

## Frontend Overview

The frontend is built based off inspiration from Product Hunt.

Styling was handled using CSS in JavaScript.

Here's an example of the user feeds home page.

![Home Page Example](readme-assets/home-page.png)

## Backend Overview

The Express backend is a collection of RESTful routes serving data to the frontend and an interface with the sequelize database.

Seed data was hand seeded to make sure all stories and reviews are relevant.

## Conclusion

This is my very first solo project!
