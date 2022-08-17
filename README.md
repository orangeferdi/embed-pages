## ➝ Whats that
» A handler to create embedded pages with buttons for pagination. 

## ➝ Requirements
» ["Handler"] `pages.js` 
» [Example command] `embed.js`


## ➝ Usage
» Copy the `pages.js` file into the `Handlers` folder
» Create a command, an interaction or anything you want. 
» Paste `const { embedPages } = require('../../Handlers/pages.js');` at the top of the created file *(Or wherever your file is located)*
» Create an array with embeds you want for the displayed pages

```
const embeds = [ 
new EmbedBuilder()
.setTitle('Page 1')
.setDescription('This is page 1')
.setColor('Blue'), 

new EmbedBuilder()
.setTitle('Page 2')
.setDescription('This is page 2')
.setColor('Blue')
];
```

» After this -> paste  `await embedPages(interaction, embeds);` to let the bot create the pages and thats it!
