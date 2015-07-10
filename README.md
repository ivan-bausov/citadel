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
  

