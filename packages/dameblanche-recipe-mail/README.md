# Dameblanche - Recipe mail

The code in this project is to be used as the base for a client based e-mail framework project.
The purpose of this project is that we reach a singular workflow for our e-mail templates.


## Getting started

Create a new project with:

```bash
npx dameblanche -r mail your-folder
```
More information at [dameblanche-cli](https://github.com/Prophets/dameblanche/tree/master/packages/dameblanche-cli)

## Supported tasks
Task name       |   description
---------       |   -----------
cdn             |   **upload assets to a cdn**
clean           |   **clean build directory based on file patterns**
css             |   **sass, autoprefixer,...**
eslint          |   **js linting**
images          |   **image optimization**
mails           |   **mjml-react mail templates**
mails-overview  |   **generate an html overview of mails**
rev             |   **rev assets**
sizereport      |   **overview of builded filesizes**
static          |   **handling of static files**
stylelint       |   **sass linting setup**

## Usage
Make sure Node is installed. We recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

This has been tested on Node `10.5.0` and NPM `6.7.0`, and should work on newer versions as well. [File an issue](https://github.com/Prophets/dameblanche/issues) if it doesn't!

### Install Dependencies
```bash
npm ci
```

### Run development tasks:
```bash
npm run start
```
This is where the magic happens. The perfect front-end workflow. This runs the default gulp task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

Why run this as an npm script? NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

To run any other existing task, simply add the task name after the `npm run start` command. Example:

`npm run start eslint`

### Build production files:
```bash
npm run build
```

This will compile revisioned and compressed files to `./public`.

## Configuration
Directory and top level settings are convienently exposed in `gulpfile.js/config.json`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile.js/tasks`.

### Clean configuration
By default, the entire `dest` directory is deleted before each build. By setting the `clean.patterns` option in config.js, you can specify (using globbing syntax) patterns that should be deleted instead. Use this if you have subdirectories or files within the `dest` directory that should be left alone (media uploaded through a CMS, say).


### Upload assets to CDN
```bash
npm run cdn
```

This will upload all assets (image and css files) to the destination on the cdn as defined in your env file. This way emails can be tested in your prefered email testing tool.


## Configuration
Directory and top level settings are convienently exposed in `gulpfile.js`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile.js/tasks`.


## Asset Details
A `README.md` with details about each asset type are available in their respective folders in the `src` directory:

- [Stylesheets](src/sass)
- [React](src/templates)
- [Images](src/images)

This will compile revisioned and compressed files to `./build`.

## Helpful tools
