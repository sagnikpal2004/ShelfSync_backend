# ShelfSync_backend

## API Documentation

### GET "/"
Check API status
#### Request
- **Headers**: None
- **Body**: None
#### Response
- **Status**: `200 OK`
- **Body**: `OK`

### POST "/auth/login"
Log user in and retrieve JWT Token
#### Request
- **Headers**: None
- **Body**: ``` { email: string, password: string } ```
#### Response
- **Status**: 
  - `200 OK` if login is successful
  - `401 Unauthorized` if email or password is incorrect
- **Body**: ```{ "token": <JWTSessionToken> }```

### POST "/auth/register"
Register a new user and retrieve JWT Token
#### Request
- **Headers**: None
- **Body**: ``` { name: string, email: string, password: string } ```
#### Response
- **Status**: 
  - `201 Created` if registration is successful
  - `409 Conflict` if user already exists
- **Body**: ```{ "token": <JWTSessionToken> }```
