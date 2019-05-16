# Hilton Backend
Back end assessment for John Bonnot with Hilton


Hello to any and all viewing my code; I will try to be brief yet still explain how I approached this task and the decisions I made. The original text from the assessment is at the bottom of this markdown file.

Also at the bottom will be a compendium, as best as I can maintain it, of everywhere I took inspiration, training, or code from, in the interests of not plagiarizing. And, who knows, they may be new resources for those viewing this.

## Tech Used

To fullfill the first two requirements for the stack, Reactjs and Webpack, I am using NextJS. Obviously another route to go would be create-react-app; I chose NextJS because it was more familiar after a course I took (Wes Bos Advanced React and GraphQL).

GraphQL-Yoga will be used on the backend and Apollo in the client. I went back and forth on if I wanted to do a GraphQL-Yoga and Prisma matchup or a more basic approach. In the end I decided not to use Prisma in order to show how I would set up the necessary queries and mutations, though I still think Prisma is Really, Really Interesting (capitalization for effect).

The base image I will build off of will be a Node 8.x one (latest of the line) which should satisfy the Node and Docker requirements.

For AWS I am simply building everything in containers in such a way to be easily transferred to online hosting, be it AWS or anywhere (but I really like AWS). I have used Rancher on top of AWS infrastructure to host and manage containers, but there are a large number of ways to go about the whole thing start to finish. In the interest of time I did not do an actual AWS deployment and implementation.

## Productionize-ing Concerns

The last imperative after the Bonus was to "Please Productionize". Here are the factors I considered in getting what I have here ready for production, along with the steps I would take in an actual production environment.

1) ENV Variables: Most obvious would be to not store environment settings inside the repository. I will try to set up sensible development and production defaults for the code to follow. There is a sample `.env` file in the api directory.

2) GraphiQL: leaving it on for development but off for production.

3) Production vs Development Builds: setting up a development and a production build for docker-compose to follow when building the images.

4) Hosting Environment settings: This is the category I would not implement start to finish, but would like to discus. In a production environment, depending on scale, it would be typical to create load balancers, multiple front and/or backend containers, and the necessary database replication/high availability steps to fully ruggedize the application. For the sake of this assessment I left out such steps.

5) Https all the things: Normally anything I would build new these days would just default to all https, what with the availability of things like Let's Encrypt. This would be a stretch goal for this project though.

6) App and Api containers: While it is completely possible to run everything in one container I felt more comfortable making two separate ones so that there was separation of concerns between the back and and front end packages.

7) Authentication: I would normally set up authentication/authorization on the API to ensure no unwanted access, typically with JWTs unless there was a compelling reason not to use them. Did not implement due to time constraints.

## Weird Stuff

I am used to working with Docker on Macs, so trying to set up Node to run in Docker, on Windows, with reloading, was an adventure I did not know I was going to be on. Turned out even with refreshing the drives in Docker settings it still really, really wanted me to have my repository under my user directory and not on a different drive. I am not experienced enough in Docker on Windows to know how usual this is or not. I had to create a next.config.js file to force webpack to rebuild periodically as well which I have not seen as necessary on Mac either.

On the backend I have not been able to successfully have nodemon recreate the server. The last hunch I was tracking was due to github issues about nodemon and docker, and it needing to have the directory hosting the code be in the Documents directory for the current user (Windows 10 Professional), but I haven't been able to delve into it enough to figure it out past that point. 

## Assessment as given in the email

This is a challenge related to graph with a Hospitality spin.

Please build a React based UI. 

Our preferred Tech Stack is:

Reactjs\
Webpack\
GraphQL – Apollo\
Nodejs\
AWS\
Docker

-----------

Create a nodejs app that simulates a basic reservations system. Use node 8.x.

 

A reservation should have the following fields:

name\
id\
hotelName\
arrivalDate\
departureDate

It should support the following methods and paths:

GET /reservation/ID – Returns a single reservation with ID

POST /reservation – Creates a new reservation, assigns an ID to it, and returns that ID

GET /reservations – Returns all reservations

 

Reservations should be persisted into a NoSQL store.

 

BONUS:

GET /reservations?hotelName=X&arrivalDate=Y&departureDate=Z – Returns all reservations that match the search criteria

 

Please productionize

## Resource List

[NextJS](https://nextjs.org)

Self explanatory.

[Wes Bos Advanced React course](https://advancedreact.com/)

The Wes Bos course uses Prisma to speed up almost all of the backend concerns; as I've made most of my way through the course I would refer to that repository as needed just for syntax help, along with the basic setup of the frontend client.

[HackerNoon/Patrick Lee Scott, A Better Way to Develop Node.js with Docker](https://hackernoon.com/a-better-way-to-develop-node-js-with-docker-cd29d3a0093)

A good portion of my Docker wrangling has been with standing up PHP/Nginx/Postgres environments, so I used the above as a primer to get going quickly with Node after running into a few surprises doing everything on a Windows box (as everything before for work was done on Macs but all my machines at home are PCs).

[Next JS with Apollo](https://github.com/zeit/next.js/tree/canary/examples/with-apollo)

I was looking through the documentation for the best practices for connecting a NextJS app to a GraphQL server and found this example which seemed to be what I needed.

## Docker Commands

```docker-compose up --build --force-recreate --renew-anon-volumes```

Found this gem while having no end of issues with getting the Mongo database to connect correctly and persist (I could get one or the other but not both). Finally tracked it down to previous connection information having been corrupted (not sure how, more Windows 10/Docker fun?), and when I ran `--renew-anon-volumes` it finally worked. For some reason even shutting it all down and doing a `docker system prune` along with deleting everything I could find still wouldn't clear out something in a cache somewhere.