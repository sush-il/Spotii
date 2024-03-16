# spoti

###### So far this is what i've learnt
###### we got to login url which redirects us to spotify authrize page with the given credentials and scope
###### This returns a code which can be used to get the acess token; code is in the url
###### we grab the code from the url
###### set credentials such as form, headers and authOptions; and use this to make a most request 
###### Once the post request is made we get back the access token and refresh token