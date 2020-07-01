# dataland-web

> Web frontend for the DataLand project

## About

This is the web frontend for the DataLand project. The backend is provided by 
[dataland-backend](https://github.com/learning-with-data/dataland-backend).

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/dataland-web
    npm install
    ```
3. Start your backend server
4. Set the required configuration variables to indicate the backend host, etc. We use 
   [dotenv](https://www.npmjs.com/package/dotenv) to set these variables. A sample
   `.env.sample` is provided with values that should work for local development. 
5. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all the tests in the `test/` directory will be run. The integration tests
rely on the devserver running, so ensure that by running `npm start &` before running `npm test`.