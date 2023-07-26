# 💲BANDIT ACS PORTAL💲

# Description

This repository contains the code related to the ACS Backend, which is meant to be duplicated as much times as there are banks.
It is a simple React Application that has a direct and strong dependency over the ACSAPI.

# Run the application

## Prerequisites 
You don't need much in order to run the application:
* [NodeJS 18.15 LTS](https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi)
* NPM (which you should install alongside the previously mentioned NodeJS

In the project's root directory, you then need to run the following command
```shell
npm i
```

## Run the code
### Debug
To debug the code, you can simply run
```shell
npm run start
```

The code should transpile and be run without any extra step: though the webpage should be opened automatically in your default browser, the default URL is [http://localhost:3000](http://localhost:3000).

You may want to open an editor to go further, both JetBrains WebStorm or Visual Studio Code are good options but anything will do the job.

Since you probably want to run this application along with the bandit-acs, you will need to provide the backend's URL. You can do this two ways :
* Edit the public/env-config.js file to provide the URL
* Edit the .env file and run the env-variables.sh script, which should regenerate the env-config.js

### Production
The application's intent is to be run as a docker container. To build the container, it is quite easy:
Run the docker-build.ps1 script, which will prompt you for a new version. The image will be built and pushed over to [Space](https://space.tristesse.lol), which will make you able to pull or deploy it in an easier way without you having to worry about anything at all.

#### Build steps

  1. Once you are satisfied with your code, you can generate a new version of the application by running the :blue_book: **docker-builder.ps1**  :blue_book: script which is located at the rooot of the project. 

      ![image](https://user-images.githubusercontent.com/91737697/226140243-05645bda-194b-4d1a-a3c1-acba9173bbef.png)

  2. The script will automatically fecth the last container version and will suggest you a new appended version number : 

      ![image](https://user-images.githubusercontent.com/91737697/226140141-df828538-998b-43ae-a4d2-da9f68ddbfe0.png)

  3. Simply choose a new version number (or press enter for default), and watch closely, :zap: magic :zap: happens once again !
  
      ![image](https://user-images.githubusercontent.com/91737697/226140292-826a4d15-bb36-474b-9794-c269c3088ead.png)
      
  4. Then, to update the server version used on our VPS, you just need to edit the bandit stack configuration : 

      ![image](https://user-images.githubusercontent.com/91737697/226140416-f22fa081-4295-4441-acce-215dcd3ec20b.png)

Tadaaaam well done !

## Check available versions

To see the available versions for a package, simply go to this url : 
```
https://space.tristesse.lol/p/masi-integratedproject/packages/container/containers/bandit-merchand-ui
```
  > :warning: The first time you want to access Space, you need to register. For that simply use the following link : https://space.tristesse.lol/oauth/auth/invite/f9a1279cf3b0ffda64cfbd23a7aacf99
