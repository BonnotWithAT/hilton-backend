# Hilton Backend
Back end assessment for John Bonnot with Hilton


Hello to any and all viewing my code; I will try to explain how I approached this task and the decisions I made as briefly as possible. The original text from the assessment is at the bottom of this markdown file.

Also at the bottom will be a compendium, as best as I can maintain it, of everywhere I took inspiration, training, or code from, in the interests of not plagiarizing. And, who knows, they may be new resources for those viewing this.

## Standing up

1) Clone the repository, and do a `yarn install` in both the api and app directories.

2) Copy the `.env.example` file to `.env`. Ensure the usernames and passwords match if you change them; if not you may have to do a new build on the database container with the `--renew-anon-volumes` flag.

3) Go back to the root repository and run `docker-compose up` or `docker-compose up -d`.

## Tech Used

To fullfill the first two requirements for the stack, Reactjs and Webpack, I am using NextJS. Obviously another route to go would be create-react-app; I chose NextJS because it was more familiar after a course I took (Wes Bos Advanced React and GraphQL).

For the GraphQL-Apollo requirement I am using ApolloClient on the front end and Apollo Server on the back end (extended with apollo-server-express to be able to create endpoints easier, the documentation for "ejecting" from the base Apollo-Server seemed lacking).

The base image I will build off of will be a Node 8.x one (latest of the line) which should satisfy the Node and Docker requirements.

For AWS I am simply building everything in containers in such a way to be easily transferred to online hosting, be it AWS or anywhere (but I really like AWS). I have used Rancher on top of AWS infrastructure to host and manage containers, but there are a large number of ways to go about the whole thing start to finish. In the interest of time I did not do an actual AWS deployment and implementation.

## Productionize-ing Concerns

The last imperative after the Bonus was to "Please Productionize". Here are the factors I considered in getting what I have here ready for production, along with the steps I would take in an actual production environment.

1) ENV Variables: Most obvious would be to not store environment settings inside the repository. I will try to set up sensible development and production defaults for the code to follow. There is a sample `.env` file in the api directory that also contains defaults for the `mongodb` container in the `docker-compose.yml` file in the base directory.

2) GraphiQL: leaving it on for development but off for production.

3) Production vs Development Builds: setting up a development and a production build for docker-compose to follow when building the images, along with steps to do staged builds to create the smallest final container possible, would be preferred. In the interest of time I opted for keeping to the `alpine` version of node.

4) Hosting Environment settings: This is the category I would not implement start to finish, but would like to discuss. In a production environment, depending on scale, it would be typical to create load balancers, multiple front and/or backend containers, and the necessary database replication/high availability steps to fully ruggedize the application. For the sake of this assessment I left out such steps.

5) Https all the things: Normally anything I would build new these days would just default to all https, what with the availability of things like Let's Encrypt. I did not do this in this project due to time constraints.

6) App and Api containers: While it is completely possible to run everything in one container I felt more comfortable making two separate ones so that there was separation of concerns between the back and and front end packages.

7) Authentication: I would normally set up authentication/authorization on the API to ensure no unwanted access, typically with JWTs unless there was a compelling reason not to use them. Did not implement due to time constraints.

## Weird Stuff

I am used to working with Docker on Macs, so trying to set up Node to run in Docker, on Windows, with nodemon to manage the back end reloading, was an adventure I did not know I was going to be on. Turned out even with refreshing the drives in Docker settings it still really, really wanted me to have my repository under my user directory and not on a different drive. I am not experienced enough in Docker on Windows to know how usual this is or not. I had to create a next.config.js file to force webpack to rebuild periodically as well which I have not seen as necessary on Mac either. I feel as if I have spent more time troubleshooting odd behaviors developing on a Windows machine than I have writing the bulk of the code itself.

On the backend I have not been able to successfully have nodemon recreate the server. The last hunch I was tracking was due to github issues about nodemon and docker, and it needing to have the directory hosting the code be in the Documents directory for the current user (Windows 10 Professional), but I haven't been able to delve into it enough to figure it out past that point. 

## Development Flow

Once the basics of the three containers was figured out, I concentrated on getting the graphql on the back end working correctly. After I was able to start up the container, launch the playground, and create and retrieve reservations I moved on to the front end. A simple happy path of being able to start up the service to get a list of all reservations was the first main goal.

I had originally started the back end using `graphql-yoga` as it was the last graphql server I had used, though I have used the first version of `apollo-server` and the spec version from Facebook in the past. It was only after I tried to "eject" from it to add in the three base endpoints in the requirements that I began to get frustrated, along with seeing a lot of yarn alerts when installing packages. I eventually discovered it has been mostly abandoned after the work the Apollo team did on `apollo-server` version 2, and so created a branch to refactor to use it instead.

Due to the back end automatic reload not working correctly I needed to do a docker-compose down and up on the api container when changes were made, while NextJS was maddeningly efficient and well-behaved. I would need to do a build when new packages were added though.

## Areas which Need Improvement

I did not manage to get as much done on this as I thought I would, and some parts of the code suffered. I could not get test runners to run properly on the back end, which is the most egregious of the faults. There are also some logging errors I need to clean up with the SSR of NextJS that I did not have time to really dig into. Last, the UI could use a lot of love in the looks department; I felt ignoring most of the look would not be too wrong.

I also endeavored to comment code when used whole cloth from other sources, as it is never my intention to pass off others' code as my own, and I feel doing so is often a good way of both documenting what was used when coming back to the code months later and hopefully showing others new coders to follow and digest.

The folder structure on the back end has a large number of improvements. Most notably, the information for the reservations could be pulled to its own folder to keep its "domain" in one location, with the typeDefs, resolvers, and model in one umbrella. This would be necessary on a larger application where you would have several different types and many queries and mutations. I chose to keep everything fairly centralized both for time constraints and to limit the necessary file surfing when reading this assessment.

## Code Formatting

I currently enjoy using Visual Studio Code more than I ever thought I would. To aid in formatting I use the `Prettier - Code Formatter by Esben Petersen` with default settings. I personally still use semicolons when typing Javascript, even when not "required", so if there are missing semicolons in files it is because I did not run Prettier on them and missed them while typing it myself. I did strive to keep a uniform style but the code could definitely use more love in the formatting.

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

I was looking through the documentation for the best practices for connecting a NextJS app to a GraphQL server and found this example which seemed to be what I needed. I ended up going back to how I had learned to do it in the Wes Bos tutorials but some code remains.

[Apollo Server Documentation and Examples](https://www.apollographql.com/docs/apollo-server/)

What I should have used from the start #lessonslearned

## Docker Commands

```docker-compose up --build --force-recreate --renew-anon-volumes```

Found this gem while having no end of issues with getting the Mongo database to connect correctly and persist (I could get one or the other but not both). Finally tracked it down to previous connection information having been corrupted (not sure how, more Windows 10/Docker fun?), and when I ran `--renew-anon-volumes` it finally worked. For some reason even shutting it all down and doing a `docker system prune` along with deleting everything I could find still wouldn't clear out something in a cache somewhere.