# DH2642_Final_Project
Trackify is a Spotify analytics interface, where users will be able to view their top artists/tracks/genres, along with some other data tailored specifically to 
their account such as playlist reccomendations and trends over their listening history. We have set up the main landing page with a navigation bar and
user login to Spotify, through the Spotify API. We also have displayed the user's top tracks from an API call on the main page. We still need to build out the 
other pages of the app, and will eventually transition this data fetched from the API, into these pages and work on displaying them in a more interesting way. Our 
file structure is that we have a main App.js file, which is our main landing page. The application state will be stored in the server. Then for each separate analytics page, the user account information and other elements of the application state will be passed down to the presenters/views, and then in each specific view we will make the further API calls needed for the page and display all this data together on the page. 
