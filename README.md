# DH2642_Final_Project

# TRACKIFY

This is a Final Project for KTH DH2642. We mainly used React framework and Spotify API for our project.

## What is TRACKIFY?

Trackify is a Spotify analytics interface, where users will be able to view their top artists/tracks, along with some other data tailored specifically to their account such as playlist reccomendations and trends over their listening history. 

## File structure of our project

 'spotify' is a top-level folder in our project. It contains 2 child folders, i.e., 'public' and 'src', and the 'src' folder contains a 'components' folder. 
 In a directory '/spotify/src/components', it includes 7 folders and each of them is for one react-component. They all contain at least one '.js' file and '.css' file.
We then have a main App.js file, which is our main landing page. The application state will be stored in the server. Then for each separate analytics page, the user account information and other elements of the application state will be passed down to the presenters/views/components, and then in each specific view we will make the further API calls needed for the page and display all this data together on the page using the components that we have built.

## How to set up the project

 1. [optional] Go to Spotify dashboard https://developer.spotify.com/dashboard and sign in with your account. Then, create an app and click the 'Edit Settings' button. Add 'http://localhost:3000' to 'Website' and 'http://localhost:3000/login' to 'Redirect URIs'. Go to spotify/src/components/LogIn/LogIn.js file and set CLIENT_ID to your spotify app id.  

 2. In spotify/src/components/LogIn/LogIn.js file, you need to set REDIRECT_URL to 'http://localhost:3000/login'. Also for the spotify/src/components/LogOut/Logout.js file, you need to set the href of <a> tag to 'http://localhost:3000' 

 3. Now all the basic settings are done. Go to the /spotify directory and enter 'npm install' in a console. It will help you install all the necessary packages needed for our project.

 4. After all the necessary packages are installed, enter 'npm start' in a console. Perfect! You can now see that our project is running in your local server.
 
 5. [Optional] If you want to deploy our app, you need to change all the urls we have set to your deployed version link. For example, if your deployed version link is 'https://www.example.com', then you need to set the link 'https://www.example.com/login' in step 2 and 'https://www.example.com' step 3. If you created your own app in step 1, you need to set 'https://www.example.com' to 'Website' and 'https:/www.localhost:3000/login' to 'REDIRECT URIs'. 

## API Info

 Spotify API was used for the project. Our app will access to your account and will offer our service to you. However, development mode was used so only the users who has added to our allowlist can use our app. If you created your own spotify app in a dashboard, you need to add the user's spotify account to 'USERS AND ACCESS' for successful access. You can find this button in your spotify project. Or, you can only use our sample account. ID and Password of our sample account are in the main page of our project.
 For more information about development mode of Spotify API, you can read the page: https://developer.spotify.com/documentation/web-api/guides/development-extended-quota-modes/ 

## Functions of 'Trackify'

 - Sign In
 It has sign-in function using OAuth access token. Window hash is parsed at first, and access token, token type and valid time will be stored in local storage when you log in.  

 - Sign out
 When the user click the sign-out button, stored information such as access token, token type and valid time will be deleted from the local storage.

- Top Tracks/Top Artists
 Based on your account's play records, it shows your top tracks and top artists. There are three tabs in each page and you can set the time range. The default is 'last 4 week'. If you click the image of each playlist, it will open spotify page and you can enjoy it.

- Recommendations 
 It recommends you the songs. When you click the image or the name or each song, it will also lead to the spotify page and you can enjoy it.

- Listening


## Copyright

 The company 'Spotify' owns the copyright for our 'Trackify' logo that we used for our project. 

## Bugs and version update

If there are any updates related to unexpected bugs, we will let you know here.

## The contributors of the 'Trackify'

We are members of the project group 23 of KTH DH2642 course. Our group consists of 3 members, i.e. Chaeyeon Park, Sofiya Mitchell, and Roman Maksymiuk.