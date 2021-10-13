#Books Inventory Mangaement App

- first run "npm install"
- go to server/env/env.js
  replace the variables values to your database credentials
  you need your MySql username, password and port
  you will also need a rapid google api key, more info at - https://rapidapi.com/tarfah/api/google-books/
  when you have the key, please replace it with the value of "apiKey" in server/env/env.js file
  you can also change the database name if you want, on startup the server will create a new database if none found

- run "npm run server"
- run "ng serve -o"

the system will open in a new window of your default browser
