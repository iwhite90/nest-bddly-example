An example project to demonstrate how to test a [Nest](https://github.com/nestjs/nest) application with the [Bddly](https://www.npmjs.com/package/bddly) test framework.

## Setup

To recreate this project, you can follow the official [Nest Tutorial](https://docs.nestjs.com/first-steps) to create a new project.

Once this is done, install Bddly by navigating to the root folder of your new project, and then run following command in your terminal:

```bash
$ npm install bddly --save-dev
```

In your tsconfig.json file, add `"resolveJsonModule": true` so that Bddly can read your project name from your package.json file.

## Running the tests

```bash
$ npm run test:e2e
```

This will run your tests using Jest, and creating the usual Jest output to the console. On top of this, Bddly will also generate HTML reports. These will be found in the top level reports folder in your project.

The report files will be generated in a folder structure following the folder structure within your test folder. This provides a convenient way of organising your reports. The index.html page is the starting point, and will enable you to navigate your reports within the browser.

## Test structure

Bddly is flexible in how you structure your tests. This project splits the test specifications and the BDD implementations into separate files (e2e-spec.ts and e2e-bdd.ts). The idea being that a pair of files would be created to test each controller. It's also possible to put the specs and implementations in a single file if preferred.

There is some boilerplate code required for Bddly to work, but the hope is that this shouldn't be too onerous when creating new test files, as it's pretty much a matter of copying and pasting from existing tests.

The service-stub was created to demonstrate injecting a stub implementation of a service for testing purposes, so that we could create some application state in a Given step. 
