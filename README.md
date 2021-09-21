# backendChallenge2021

Application is accessable at https://shopify-challenge-winter-2021.herokuapp.com/

# Hosting
Application is hosted using Heroku 

# Security 
	- Created simple authentication using database table `users`
		- `users` is a table with two columns `username` & `password`
			- `What I would add in future iterations:`
				- Add password encryption.
					- Verify password meets basic security standards.
				- Keep track of the last login time of a user.
	- Implement error handling
		- If a user has not been authenticated all internal API enpoints return a `403 Forbidden`
		
# Technologies Used
	- NodeJS / JavaScript / ExpressJS
	- MongoDB 
		- Used for database management of `Users & Images`
		
# Routes

Endpoint | GET | POST
--- | --- | --- 
`/gallery`| Returns data about images submitted by all users. `Optional Params: imageURL, Date Added, Owner, Added By, Tags` | --
`/myimages` | Returns all images that are owned by logged in user. Note: all requests have `Owner` param set to logged in user. `Optional Params: imageURL, Date Added, Added By, Tags`| --- 
`viewPortal/assignImage` | --- | Add an image to gallery. `Required Params: imageURL, Date Added, Owner, AddedBy, tags`. Note if this request is made through UI at `https://shopify-challenge-winter-2021.herokuapp.com/viewPortal/` Ownder, AddedBy & Date Added are populated by the backed.
