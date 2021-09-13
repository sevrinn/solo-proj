Sev's Solo Proj Musicians Networking App
I'm going to build a project that is a place for musicians and bands to show thier songs and have other community members comment and like their work.
Users can sign up or sign in. Once signed in you can create a band with a name, members, description. Bands can add songs, song posts can be liked and commented on
From the dashboard, you can see your bands and from the band page, you can see the songs
Solo Project Requirements

- []Log and Reg with validations
  - users can log in or create an account if they dont already have one
- [x]User can CREATE object to db
  - [x]user can create Bands linked to user
    - []user can create a song linked to a band
- [x]User can READ obj retrieved from db
  - [x]User can view bands in a list
    - []User can view songs in a list
  - [x]User can view band details individually
    []User may like, fave, rsvp (many to many)
  - bands and individual songs can be liked
- [x]User may EDIT posted data
  - once band or song is created, info about it can be edited
- []User may DELETE posted data
  - once band or song is created, it can be deleted
- []Application includes protected route (user must be in session to view)
  - user must be signed in to create bands/songs, and interact with content
- []Application features static content(CSS, images, JS,)
  - styled to look cute
- []Created data must be validated (no past events, wall posts must have content, no duplicates)
  - user name / email cannot be duplicated,

Bonus reqs

- []application is responsive
  - probably will do this at somepoint but maybe not in time for a better grade
- []app is publicly deployed
- []file upload
  - users will be able to upload .wav or .mp3 of song
- []app features and API - going to try and include music theory api that i found but going to get all the other required stuff working first
