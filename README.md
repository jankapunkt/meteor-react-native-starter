# Meteor React Native Workshop

The code repo for our workshop "Meteor and React Native" @ Meteor Impact 2022.
It's part of the workshop preparation, so please install it prior to the workshop.

Please note, that I can't cover all operating systems out there.

## Installation

You need to have Meteor installed on your system. Follow the Meteor installation instructions on https://meteor.com

### Clone the repo and checkout the workshop branch

```bash
$ git clone git@github.com:jankapunkt/meteor-react-native-workshop.git
# If you have no ssh access to GitHub, please use
# https://github.com/jankapunkt/meteor-react-native-workshop.git
$ cd meteor-react-native-workshop
```

**Note: you can play around etc. prior to the workshop, but you should either reset your changes or work on a separate 
branch. Please make sure you have no changes in your code when the workshop starts.**

### Install and run the Meteor backend

```bash
$ cd backend
$ meteor npm install
$ meteor npm run start
```

The backend will install and start. If everything went fine, you should see the following message:

```bash
=> App running at: http://localhost:8000/
```

## Install and run the mobile app

Open a **new terminal** in order to install and run the app.
Starting from the project root, do the following:

```bash
$ cd app
$ meteor npm install
$ meteor npm run start
```

The console may prompt you to install expo-cli. If so, agree and continue.
If it does not ask you to install expo and the app fails to build, please manually install expo-cli via:

```bash
$ meteor npm install -g expo-cli
```

### Connect your mobile app to the backend

Connecting your app to the backend a bit more difficult, since you need to get your **local network ip**
in order to make the RN app connect. The Meteor-typical `localhost` will not work here.

First, get your local ip via

| os      | command        |
|---------|----------------|
| Linux   | `ip addr show` |
| MaxOs   | `ifconfig`     |
| Windows | `ipconfig`     |

Then replace the pattern `xxx.xxx.xxx.xxx` with the local ip from your network in `app/config.json`.

Finally, run your app via

```bash
$ cd app && meteor npm run start
```

After running, check the `app/.expo/settings.json` file and make sure it looks like the following:

```json
{
  "hostType": "lan",
  "lanType": "ip",
  "dev": true,
  "minify": false,
  "urlRandomness": "mc-y7b",
  "https": false,
  "scheme": null,
  "devClient": false
}
```

Now you should be good to go for the workshop!

## Questions

If you have questions or problems with the installation, please leave an issue.
