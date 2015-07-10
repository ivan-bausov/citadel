# citadel
Citadel is a very simple front-end boilerplate. It contains a set of scripts and templates to perfom operations like:
* prepare initial project folder and file structure
  * prepare initial HTML and SASS templates
  * prepare initial JavaScript based on RequireJs modules
* prepare Grunt builder task
* init Git repository init

CD to your project folder and simply run command *citadel*. It copies template files, download node modules for Grunt build task and init Git repository inside the current folder. 

Citadel boilerplate has the following folder structure:
* **dev** - contains the developer version of your project:
  * **sass** - contains main SASS-template file and predefined mixins;
    * **main.scss** - main SASS-template file for Citadel project;
    * **_base.scss** - contains initial SCSS rules to import;
    * **_mixin.scss** - contains pre-defined SCSS mixins to import.
  * **css** - folder for your CSS-files, main SASS-template file will be compiled inside this folder;
  * **images** - folder for your image files;
  * **fonts** - folder with fonts;
  * **js** - folder for your JavaScript:
    * **app.js** - the main JavaScript file for Citadel project;
    * **require.config.js** - requirejs config for Citadel project;
    * **vendor** - folder for JavaScript libraries like jQuery and RequireJS.
* **prod** - folder for the production version for Citadel project.
* **index.html** - main HTML file for Citadel project.
* **.gitignore** - list of files for GIT to ignore by default.
* **package.json** - config with dependencies Citadel project use by default.
* **Gruntfile.js** - default Grunt builder config.
* **run.sh** - launcher for developer SASS watcher.
  
##Gruntfile.js
Running *grunt* command inside the Citadel project directory will execute the Grunt builder task. Builder will execute the following operations:
* compile RequireJS dependencies and minify your app.js into app.min.js;
* compile scss/main.scss into css/main.css;
* clean production directory;
* copy project files to production directory, by default the following tasks will be done:
    * copy images and fonts folders as is into prod directory;
    * copy css/main.css into prod directory;
    * copy index.html file into prod directory, during this copy process the require.config.js will be removed from the html code. All additional html files must be configured to copy manually in Gruntfile.js.
    * copy js/app.min.js into prod directory as app.js;
    * copy require.js into prod directory;
