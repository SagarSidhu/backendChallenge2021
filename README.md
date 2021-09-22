# backendChallenge2021
Simple Image repository application to tackle challenge posted here: https://docs.google.com/document/d/1eg3sJTOwtyFhDopKedRD6142CFkDfWp1QvRKXNTPIOc/edit 


## Application is accessable at https://shopify-challenge-winter-2021.herokuapp.com/

## Security 
- Authentication using database table `users`
	- `users` is a table with two columns `username` & `password`
		- **What I would add in future iterations:**
			- Add password encryption.
				- Verify password meets basic security standards.
			- Keep track of the last login time of a user.
- Implement error handling
	- If a user has not been authenticated all internal API enpoints return a `403 Forbidden`
		
## Hosting
Application is hosted using Heroku 

## Technologies Used
- NodeJS / JavaScript / ExpressJS
- MongoDB 
	- Used for database management of `Users & Images`
		
## Implemented Routes

Endpoint | GET | POST | PUT
--- | --- | --- | ---
`/gallery`| Returns data about images submitted by all users. `Optional Params: imageURL, Date Added, Owner, Added By, Tags` | -- | --
`/myimages` | Returns all images that are owned by logged in user. Note: all requests have `Owner` param set to logged in user. `Optional Params: imageURL, Date Added, Added By, Tags`| -- | --
`viewPortal/assignImage` | --- | Add an image to gallery. `Required Params: imageURL, Date Added, Owner, AddedBy, tags`. Note if this request is made through UI at `https://shopify-challenge-winter-2021.herokuapp.com/viewPortal/` Ownder, AddedBy & Date Added are populated by the backed. | --

# Future Considerations

## Potential Routes That Could Be Added

Endpoint | GET | POST | PUT
--- | --- | --- | ---
`/gallery`| Returns data about images submitted by all users. `Optional Params: imageURL, Date Added, Owner, Added By, Tags` | *POST requests to request ownership of images that are appear in the gallery but are owned by other users.* | --
`/myimages` | Returns all images that are owned by logged in user. Note: all requests have `Owner` param set to logged in user. `Optional Params: imageURL, Date Added, Added By, Tags`| -- | *Add ability to update tags that are associated to images*
`viewPortal/assignImage` | --- | Add an image to gallery. `Required Params: imageURL, Date Added, Owner, AddedBy, tags`. Note if this request is made through UI at `https://shopify-challenge-winter-2021.herokuapp.com/viewPortal/` Owner, AddedBy & Date Added are populated by the backed. | --

- Improve UI
- Allow users to request ownership of others images, potential bidding
