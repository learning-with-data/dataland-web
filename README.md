# dataland-web

> Web frontend for the DataLand project

## About

This is the web frontend for the DataLand project. The backend is provided by 
[dataland-backend](https://github.com/learning-with-data/dataland-backend).

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
3. Install your dependencies

    ```
    cd path/to/dataland-web
    npm install
    ```
3. Start your app

    ```
    npm start
    ```
    
    _Note: you will also need to have the backend server running in order for anything to work_

## Testing

Simply run `npm test` and all the tests in the `test/` directory will be run. The integration tests
rely on the devserver, so ensure that by running `npm start &` before running `npm test`.