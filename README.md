# convergence test app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Technology Overview

This app  built with react 18.2.0.

The app lives in `./src`. All the Actions and reducers live in `./src/actions`.

* Pages (Big Components) - `./src/containers`
* Smaller, Reusable Components - `./src/components`

New components should live within the `./src/containers/<category>/<component>.jsx`. If the component category is complex enough, subfolders can be used to further separate them `./src/containers/<category>/<sub-folder>/<component>.jsx`. 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
