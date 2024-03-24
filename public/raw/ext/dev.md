# Writing extensions

Here's how you can write extensions!

> These docs are subject to change
> The api for the packages is still heavily in development,
> So there will be many changes to the way you write extensions.
> This document will be updated as soon as we can to make sure you have the latest docs ready for the latest version.
>  
> This version of the documentation is written for version `0.0.0-alpha`.

## How to make an extension

Every extension consists of a json object with the following required properties:

- `name` - the name of the extension
- `mountsOn` - the element in the editor the extension will mount on. If the element isnt on the current page, your extension will not be loaded. If you don't want your extension to mount anywhere you can mount it to the element `nothing`. (please note, this is not yet implemented as of `0.0.0-alpha`)
- `template` - a html template for your extension, can be empty but must be defined.
- `methods` - a list of methods, They must be added as a string. This can be empty but must be defined.
- `main` - The main function that gets called when your extension is loaded.

You must also always register your extension with the api using the `registerExtension(extension)` method. Which can be required from `process.cwd() + "/api/extensionAPI.js"` You can also use the typescript api, however this is still experimental.

## methods (and main)

Methods must be in the form of a string, this includes the main function. It's very simple to achieve this in javascript because you can simply use the `.toString()` method like such:

```javascript
function greet(name) {
    return `Hello, ${name}`;
}

const methods = [greet.toString()];
```

The same goes for `main`, It can simply use the `.toString()` method.

## Example

This is a simple example extension:

```javascript
const { registerExtension } = require(process.cwd() + "/api/extensionAPI.js");

function greet(name) {
  console.log(`Hello, ${name}!`);
}

const extension = {
  name: "helloWorldExtension",
  mountsOn: "homeScreen",
  template:
    '<div style="width: 100%; display: flex; justify-content: center; position: absolute; left: 0; top: 50%; transform: translateY(-50%)">This is my extension</div>',
  methods: [greet.toString()],
  main: (() => {
    console.log("Hello World!");
  }).toString(),
};

registerExtension(extension);
```

This extension will log "Hello World!" to the console on the client, and it will replace the home page with the text "this is my extension".