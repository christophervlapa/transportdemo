# Transport Demo

I've used the TransportNSW opendata API to pull in journeys, there was a LOT of data to look at and understand in a very short time, so please forgive any misunderstandings of data properties.

I wanted to open an executable on my Macbook from the browser window but could not. My searches gradually left web development and became security research on OWASP etc as this is malware behaviour and _strongly_ discouraged.

Because of limitations of the transportNSW opendata API and stackblitz, you need to run this on local.To run this on localhost, clone the repo and then run from chrome with the flags:

MAC
open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials

PC
chromium-browser --disable-web-security --user-data-dir="[some directory here]"

Then ron `ng serve` as normal.

# Transportdemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
