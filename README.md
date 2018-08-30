# MuuCMS

## Setup Instructions

### Requirements

* MySQL/MariaDB (https://www.mysql.com/downloads/)
* Node.js 10.0+ (https://nodejs.org)
* Bower

### Installation

* Clone the repository:

```
 git clone git@github.com:MilkZoft/MuuCMS.git
```

* Install the NPM dependencies:

```
npm install
```

* Install the Bower dependencies:

```
npm install -g bower
bower install
```

* Import the database to your MySQL ([http://localhost/phpmyadmin](http://localhost/phpmyadmin))

* Configure your MySQL Database connection parameters on `src/config/local.json`

* Install Redis

In Mac:

```
brew install redis
```

In Ubuntu:

```
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

* Start the application server

```
npm start
```

* Run the application at [http://localhost:3000](http://localhost:3000)

### Tasks

- `npm start` Start server in local mode
- `npm run start:development` Start server in development mode
- `npm run start:qa` Start server in QA mode
- `npm run start:stage` Start server in stage mode
- `npm run start:production` Start server in production mode
- `npm run lint` Eslint validator
- `npm run lint:fix` Eslint validator with --fix flag
- `npm test` Run unit tests

### Libraries Used

- [babeljs](https://babeljs.io/)
- [eslint](http://eslint.org/)
- [express-js](http://expressjs.com/)
- [handlebars](handlebarsjs.com)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [jest](https://github.com/facebook/jest)
- [mocha](https://mochajs.org)
- [mysql](http://mysql.com)
- [react-helmet](https://github.com/nfl/react-helmet)
- [react-router](https://github.com/rackt/react-router)
- [react](http://facebook.github.io/react/)
- [redux](http://rackt.github.io/redux/)
- [stylus](http://stylus-lang.com)
- [webpack](http://webpack.github.io/)

### Troubleshooting

- If you get a Redis error like this:

`Creating Server TCP listening socket *:6379: bind: Address already in use`

You will need to run the follow command
```
redis-cli
```

And then execute this command to shutdown the server:

```
shutdown
```
