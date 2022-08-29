# convergence test app

## About app

This app is a single-page application that has four major screens `(Landing page, Registration page, Login page, and Home page)`. This app demonstrates how the react app works and the standard code structure that should be followed while building a react app.

* Landing page- This Page has two buttons `New user` and `Existing User`. The `New user` button will lead the user to the `Registration Page` and `Existing User` button will lead the user to the `Login Page`.
* Registration Page- This page will be used to register a user. when the user will register him/herself then he will get redirected to the `Login Page`.
* Login Page- After the registration user can be logged in to the app from this page.
* Home Page- This Page has some static data and a `Log out` button.

## Technology Overview

This app built with react 18.2.0.

The app lives in `./src`.

* Pages (Big Components) - `./src/containers`
* Smaller, Reusable Components - `./src/components`
* Unit tests - `./src/contatiner/<component>/<__tests__>/<component>.test.js`
* Assets, images,files - `./src/assets`
* Actions - `./src/actions`

New components should live within the `./src/containers/<component>/<component>.jsx`. New reusable components should live within the `./src/component/<component>/<component>.jsx`. If the component category is complex enough, subfolders can be used to further separate them `./src/containers/<component>/<sub-folder>/<component>.jsx`.

## Environment

There is a file called ` .env.example` please change it `.env`. and you can put your app secret in that file, Make sure you follow this syntax to create an environment variable `REACT_APP_<secret>`. and then you can access those secrets anywhere in the app from the process object.

Example: `process.env.REACT_APP_BASE_URL`

## Development setup

* Install `NodeJS` [https://nodejs.org/en/](https://nodejs.org/en/). Node version should be` >= 14`
* Install `yarn`  [https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
* Run `yarn` to install all the dependency 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
