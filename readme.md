# Dameblanche

The code in this project is to be used as a starter framework for frontend setups.
Dameblanche provides several recipes: [mails](https://github.com/Prophets/dameblanche/tree/master/packages/dameblanche-recipe-mails), [web](https://github.com/Prophets/dameblanche/tree/master/packages/dameblanche-recipe-web), ~~react~~, ~~laravel~~
The purpose of this project is that we reach a singular workflow for our frontend projects.

## Getting started

Create a new project with:

```bash
npx dameblanche -recipe web your-folder
```
More information at [dameblanche-cli](https://github.com/Prophets/dameblanche/tree/master/packages/dameblanche-cli)

## Tasks provided

* browsersync
* cdn **upload assets to a cdn**
* clean **clean build directory based on file patterns**
* css **sass, autoprefixer,...**
* eslint **js linting**
* images **image optimization**
* mails **mjml-react mail templates**
* mails-overview **generate an html overview of mails**
* rev **rev assets**
* sizereport **overview of builded filesizes**
* static **handling of static files**
* stylelint **sass linting setup**
* svgsprite **svg sprite generator**
* templates **nunjucks templating**
* webpack **js compilation via webpack**

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
Directory and top level settings are convienently exposed in `gulpfile.js` for every dameblanche recipe. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

### Clean configuration
By default, the entire `dest` directory is deleted before each build. By setting the `clean.patterns` option in config.js, you can specify (using globbing syntax) patterns that should be deleted instead. Use this if you have subdirectories or files within the `dest` directory that should be left alone (media uploaded through a CMS, say).

## Configuration
Directory and top level settings are convienently exposed in `gulpfile.js`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile.js/tasks`.

## Helpful tools

### Sublime packages

#### Editor Config
> [EditorConfig](http://editorconfig.org) helps developers maintain consistent coding styles between different editors

[Install the sublime package](https://github.com/sindresorhus/editorconfig-sublime#install) so Sublime Text uses the settings in .editorconfig

#### Sublime Linter

To have ESLint and Stylelint warning- and error output in Sublime Text, use the awesome [Sublime Linter](http://sublimelinter.readthedocs.io/en/latest/index.html)
- [Install the SublimeLinter framework](http://sublimelinter.readthedocs.io/en/latest/installation.html#installing-via-pc)
- [Install the SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint#plugin-installation)
- [Install the SublimeLinter-stylelint](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint#plugin-installation)

#### Nunjucks syntax definitions

[Nunjucks syntax for Sublime Text](https://packagecontrol.io/packages/Nunjucks%20Syntax) will make sure you have the right syntax highlighting

**There's a small issue though**: [the package doesn't place the `.tmlanguage` in the correct folder](https://github.com/mogga/sublime-nunjucks/issues/6)
The fix is simple enough though:
- ```cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages```
- ```mkdir "Nunjucks Syntax" && cd Nunjucks\ Syntax/```
- paste [this file](https://raw.githubusercontent.com/mogga/sublime-nunjucks/master/Nunjucks.tmLanguage) there
- open a .njk file (for example: src/templates/index.njk), and choose "open all with current extension as" > "Nunjucks" from the syntax menu in the bottom right corner of Sublime Text

#### Useful Sublime Text settings

Add these to your settings, for a nicer overall Sublime Text experience. Also contains some useful defaults that are enforced when linting.

```
{
    "binary_file_patterns":
    [
        "node_modules/**",
        "vendor/**",
        "build/**",
        "*.jpg",
        "*.jpeg",
        "*.png",
        "*.gif",
        "*.ttf",
        "*.tga",
        "*.dds",
        "*.ico",
        "*.eot",
        "*.pdf",
        "*.swf",
        "*.jar",
        "*.zip"
    ],
    "file_exclude_patterns":
    [
        ".DS_Store",
        "Desktop.ini",
        "*.pyc",
        "._*",
        "Thumbs.db",
        ".Spotlight-V100",
        ".Trashes",
        "*.sublime-workspace",
        ".zfproject.xml",
        "composer.lock",
        "zend_cache--*"
    ],
    "folder_exclude_patterns":
    [
        ".sass-cache",
        ".git",
        "nbproject",
        ".svn",
        ".hg",
        "CVS",
        ".bin"
    ],
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "hot_exit": false,
    "ignored_packages":
    [
        "Vintage"
    ],
    "indent_guide_options":
    [
        "draw_normal",
        "draw_active"
    ],
    "match_brackets": true,
    "match_brackets_angle": true,
    "shift_tab_unindent": true,
    "tab_size": 4,
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "word_wrap": true,
    "ensure_newline_at_eof_on_save": true
}
```
