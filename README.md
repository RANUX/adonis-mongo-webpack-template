# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Mongo Lucid ORM
8. Migrations and seeds
9. Webpack
10. SASS
11. Bootstrap

## Setup

Clone this repo. Create mongo db. Go to template directory and create .env file:
```bash
cp .env.example .env
```
Run `npm install`


### Migrations

Run the following command to run startup migrations.
```js
adonis migration:run
```

### Webpack run
Run command: `npm run assets-watch`
Additional configuration in `webpack.mix.js` file.

### Adonis run
Run command: `adonis serve --dev`

### Bootstrap
If you don't like bootstrap, you can uninstall it and fix `style.scss` file.
```bash
npm uninstall bootswatch
npm uninstall bootstrap
```
