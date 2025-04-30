# fp-frontend-exercise #

Welcome to my soltion for the FP-Frontend Exercise.

Please bear in mind, this is my first time writing any Vue! I am unfamiliar with the framework but figured i would like to try it and what better opportunity than this.

Any questions, comments or other feedback is welcome via email: `joelgeorge9195@gmail.com`

## Design Considerations 

When styling the page, compatability for mobile as well as desktop was at the forefront of my mind. To hit this requirement, i used the following code to change the bahviour of the page when below a certain resolution. (768px) 

` @media (min-width: 769px)  {...`

This enables me to switch from a horizontally stacking flexbox style on the browser to a vertical stack on mobile devices.

Another design consideration is the choice to use the input text field with the `disabled` attribute in order to achieve an identical appearacnce to the USD input above.
This saves me styling a text element to look the same and prevents the user from typing anything in the estimte "input".

## Improvements 

In terms of improvements, I would personally like to see the estimate update in real time although i do note that that is defined as "out-of-scope" within the specification.
Additional improvements to the site would be something like an extrnal file containing the text for the website. This site is small but on a large page, editing the text values in-line would make for a large and messy App.vue.

The ability to select a currency to donate in would also be a welcome addition along with preset amounts (10, 25, 50, 100 etc) allowing the user to select an amount without needing the keyboard / keypad.


## Running the app

1. Fork and clone this repository
2. Make sure that you have Node.js v14.16.1 installed
3. Run `npm install`
4. Run `npm run serve` to start the local development

## Running test

There are 20 tests across a single suite of tests.
Tests can be run with the following command:
`npm run test`