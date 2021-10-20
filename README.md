# PrivacyWeek Streaming Site
A page for watching the PrivacyWeek live streams.

## Installation
You can either generate the site for a regular installation or use our docker file to run it with docker.
### Regular installation
Clone this repository. Then install dependencies with

```bash
$ npm install
```
Generate the static site with 

```bash
$ npm run generate
```
The generated site will be in `/dist`. Use any webserver to serve the content of that directory.

### Installation with docker

Build the docker image with

```bash
$ docker build -t privacyweek-streaming-site:latest .
```

Then start the image with

```bash
$ docker run --publish 80:80 privacyweek-streaming-site:latest
```

## Local development
Clone this repository. Then install dependencies with

```bash
$ npm install
```
Run the page in development mode with

```bash
$ npm run dev
```
The site should be available at `localhost:3000` and should automatically reload when you make changes to the code.

## Environment variables
You can create a file named `.env` to set specific environment variables for the environment you are currently running the page from. You can use this to e.g. change the URL where the page looks for the schedule file from pretalx or to activate date and time mocking.

Environment variables are available via `process.env`. We use these in `nuxt.config.js` to set certain parts of `publicRuntimeConfig`. All variables defined in `publicRuntimeConfig` are available in the code via `$config`.

For a list of variables that can be set in `.env` check the `publicRuntimeConfig` in `nuxt.config.js`.

### Sample .env file
```
SCHEDULE_LOCATION=https://fahrplan.privacyweek.at/pw21/schedule/export/schedule.json
IS_DATE_TIME_MOCKED=true
```

## Technologies used

This project uses [Nuxt.js](https://nuxtjs.org), a framework for building [Vue.js](https://vuejs.org/) applications. We configured Nuxt to generate the application as static site.

We use [Video.js](https://videojs.com/) for the video player.

We use [Bulma](https://bulma.io/) as our CSS framework. Additional CSS is written in [Sass](https://sass-lang.com/)(SCSS).

We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for formatting the code.


## Contributing
Feel free to contribute to this project. You can
- open issues for bugs or suggestions
- work on issues and submit pull requests

### Tips
- if you are working on code, please fork the project
- if you are working on something, please assign the issue to yourself
- if you have questions, comment in the issue or open a new issue

### Linting and code formatting
If you are working on code, we recommend you set up [ESLint](https://eslint.org/)  and [Prettier](https://prettier.io/) for linting and formatting. The configuration files are already included in the project and the ESLint and Prettier packages should already be installed when you run `npm install`. But you might need additional extensions for your IDE so that it will use prettier to format the code and ESLint to highlight potential errors.

---
## Loading the schedule
Warning: this part of the readme might be out of date.

### Local development
Download schedule.json from `https://cfp.privacyweek.at/pw21/schedule/export/schedule.json` and place it in `static`
### Server deployment
When deploying a generated build, make sure the server regularly fetches the `schedule.json` and places it in the top-most level next to `index.html`.
