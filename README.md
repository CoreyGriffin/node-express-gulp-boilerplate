# node-express-gulp-boilerplate

## npm install


## Styling with SASS
# The SASS file structure in this boilerplate follows the 7–1 pattern from Hugo Giraudel (https://www.sitepoint.com/architecture-sass-project/)

  - The base folder holds boilerplate content. It holds the styles every page of your site should receive.
    ex. _reset.sass or _normalize.sass , _typography.sass

  - The components folder holds all your micro layout files. Your styles for buttons and navigation and similar page components.
      ex. _media.sass, _navigation.sass., _thumbnails.sass, _buttons.sass

  - The layouts folder holds Styles for major sections of the layout like a header or footer and styles for a grid system.
    ex. _grid.scss, _header.scss, _footer.scss, _sidebar.scss, _forms.scss

  - The utils folder holds Sass tools, helper files, variables, and config files. These files won’t be compiled.
    ex. _variables.scss, _mixins.scss

  - The vendors folder holds 3rd party code
    ex. bootstrap.scss

  - Import all used files into main.scss, gulp will compile this file into main.css
    ex. @import "base/base";
