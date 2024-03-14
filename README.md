# Yawin

A powerful command-line tool designed to streamline your workflow and simplify common development tasks. With Yawin, you can easily deploy npm packages, initialize new projects, and automate repetitive tasks with ease. More feature is on the way.

## Features

Yawin supports several features with related task command.

- `yawin deploy`: Deploy npm packages to Github Packages.
- `yawin init`: Quickly initialize the project by selecting the configuration

## Installation

```
git clone git@github.com:JJunYang/yawin.git
npm i
npm run dev
```

## Deploy Feature

### Set Environment config

You need an access token to publish packages.For more information, see [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

add env config into **.env** file on your root directory.

```
TOKEN=<YOUR_GITHUB_TOKEN>
SCOPE_NAME=<YOUR_SCOPE_NAME>
```

### Edit your package.json file

- Verify the package name field: The **name** field must contain the scope and the name of the package. For example: `@SCOPE_NAME/PACKAGE_NAME`.
- Verify the repository field: The **repository** field must match the URL for your github repository. For example: `https://github.com/SCOPE_NAME/PACKAGE_NAME.git`

### Run deploy command

Run `yawin deploy` to publish your package to your Github Package.

## Initialize Project

After `npm run dev` in yawin project, run `yawin init` to select configuration to quickly initialize project.
