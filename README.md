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

### GET "/spaces"
Retrieve all spaces for the authenticated user
#### Request
- **Headers**: 
  - `Authorization: Bearer <JWTSessionToken>`
- **Body**: None
#### Response
- **Status**: 
  - `200 OK` if spaces are retrieved successfully
  - `401 Unauthorized` if the user is not authenticated
- **Body**: 
  ```json
  [
    {
      "_id": "string",
      "user_id": "string",
      "name": "string",
      "description?": "string",
      "coords1": number[2],
      "coords2": number[2],
      "superSpace": Space,
      "subSpaces": Space[],
      "thingList": Thing[]
    }
  ]

### GET "/spaces/:id"
Retrieve a specific space by ID for the authenticated user
#### Request
- **Headers**: 
  - `Authorization: Bearer <JWTSessionToken>`
- **Body**: None
#### Response
- **Status**: 
  - `200 OK` if space are retrieved successfully
  - `401 Unauthorized` if the user is not authenticated
  - `404 Not Found` if the space is not found
- **Body**: 
  ```json
  {
    "_id": "string",
    "user_id": "string",
    "name": "string",
    "description?": "string",
    "coords1": number[2],
    "coords2": number[2],
    "superSpace": Space,
    "subSpaces": Space[],
    "thingList": Thing[]
  }

### POST "/spaces"
Create a new space for the authenticated user
#### Request
- **Headers**: 
  - `Authorization: Bearer <JWTSessionToken>`
  - **Body**:
  ```json
  {
    "name": "string",
    "description?": "string",
    "coords1": number[2],
    "coords2": number[2],
    "superSpace": Space,
  }
#### Response
- **Status**: 
  - `201 Created` if space are created successfully
  - `401 Unauthorized` if the user is not authenticated
- **Body**: 
  ```json
  {
    "_id": "string",
    "user_id": "string",
    "name": "string",
    "description?": "string",
    "coords1": number[2],
    "coords2": number[2],
    "superSpace": Space,
    "subSpaces": Space[],
    "thingList": Thing[]
  }

### PUT "/spaces/:id"
Update a specific space by ID for the authenticated user
#### Request
- **Headers**: 
  - `Authorization: Bearer <JWTSessionToken>`
- **Body**: 
  ```json
  {
    "name?": "string",
    "description?": "string",
    "coords1?": number[2],
    "coords2?": number[2],
    "superSpace?": Space,
    "subSpaces?": Space[],
    "thingList?": Thing[]
  }
#### Response
- **Status**: 
- `200 OK` if space are updated successfully
- `401 Unauthorized` if the user is not authenticated
- `404 Not Found` if the space is not found
- **Body**:
```json
  {
    "_id": "string",
    "user_id": "string",
    "name": "string",
    "description?": "string",
    "coords1": number[2],
    "coords2": number[2],
    "superSpace": Space,
    "subSpaces": Space[],
    "thingList": Thing[]
  }
```

### DELETE "/spaces/:id"
Delete a specific space by ID for the authenticated user
#### Request
- **Headers**: 
  - `Authorization: Bearer <JWTSessionToken>`
- **Body**: None
#### Response
- **Status**: 
- `200 OK` if space are updated successfully
- `401 Unauthorized` if the user is not authenticated
- `404 Not Found` if the space is not found
- **Body**:
```json
{
  "message": "Space deleted successfully"
}
```