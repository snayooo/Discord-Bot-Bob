
# Bob

Bob is a private random fun Discord bot.

## Setup

How to setup the bot.

### Invititation

Invite the bot using the following link: 

### Clone the GitHub repository

Using `git clone https://github.com/snayooo/Discord-Bot-Bob.git` you can clone the github repostitory. You need to remember to make it public!

### Install dependencies

Run `npm install` in the directory the code is in to install the dependencies for the bot to run.

### Build and start the bot

The bot is built using robojs.dev so it needs to build and then you can start the bot. 

Open a new screen session, then run `npm run build`. Wait until the build is finished. Then you can run `npm run start` to start the bot.

## Usage

Here is a list of all the commands and things the bot can do.

### Commands

- **/help:** Sends a list with all the commands availible.
- **/register:** Register yourself to the database if it didn't work automatically.
- **/daily:** Collect your daily coins. I will add support for purchases etc. maybe later. 
- **/link minecraft [username: {minecraft_username}]:** With this command you can link your Discord and Minecraft accounts.

The rest of the commands don't work because of restrictions etc. and are still in development. 

### Events

The bot listents to 3 events: ready, guildMemberAdd and voiceStateUpdates

#### voiceStateUpdates

The bot listents to this event to create a new Voice Channel if someone joins the therefore created Voice Channel

#### guildMemberAdd

To register the user to the database.

#### ready

To set the activity and check the Minecraft servers every minute.
