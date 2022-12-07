# DH2642_Final_Project

# TRACKIFY
This is a Final Project for KTH DH2642. 

## What is TRACKIFY?
Trackify is a Spotify analytics interface, where users will be able to view their top artists/tracks/genres, along with some other data tailored specifically to 
their account such as playlist reccomendations and trends over their listening history. 

## What we have done
We have set up the main landing page with a navigation bar and user login/authentication to Spotify, through the Spotify API. We also have displayed the user's top tracks and top artists from an API call on the main page. 

## In-Progress
We are working on making the sign in an initial landing page and then after the login, transitioning to a new app main page that assumes the user is already logged in.
We are also working on using the data that we fetched from the API calls and displaying that in an interesting way.

## What we still plan to do
We still need to build out the other pages of the app, and will eventually transition this data fetched from the API, into these pages and work on displaying them in a more interesting and unique way. We will continue to add data features and work on the overall UX of the app. 

## File structure of our project
 
 'spotify' is a top-level folder in our project. It contains 2 child folders, i.e., 'public' and 'src', and the 'src' folder contains a 'components' folder. 
 In a directory '/spotify/src/components', it includes 7 folders and each of them is for one react-component. They all contain at least one '.js' file and '.css' file.
We then have a main App.js file, which is our main landing page. The application state will be stored in the server. Then for each separate analytics page, the user account information and other elements of the application state will be passed down to the presenters/views/components, and then in each specific view we will make the further API calls needed for the page and display all this data together on the page using the components that we have built.

 
