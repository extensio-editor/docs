# Extensio docs

This is the documentation for the extensio editor and its associated projects.

Well actually the documentation lives on [it's website](https://docs.extensio.xyz/) but this is that website's code.

The documents that are the documentation are in [the raw folder](https://github.com/extensio-editor/docs/tree/main/public/raw) and get parsed into html when they need to get loaded.

It gets which document it needs to load directly from the url with a `/:name(.*)` catch all url.

Now this is hosted on github pages, this means that in order to be able to use said catch-all url's we opted for using the vue router in the hash mode. 
This means that any page will actually be prefixed by `/#/`. To make people still able to use the regular url, we rewrite any url that doesnt start with that hash to one that does in [404.html](https://github.com/extensio-editor/docs/tree/main/404.html) (the fallback for when the status code is 404).

All pages will get cached on the client by a service worker when they get loaded.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
