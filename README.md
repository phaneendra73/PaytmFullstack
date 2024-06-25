# Frontend 
This frontend is just a react componnets , hosted on Render at [https://paytmfullstack-1.onrender.com](https://paytmfullstack-1.onrender.com). You can see all the pages in the pages folder in the frontend and components. Please ignore the UI and be patient with loading times since it's on a free server, which can be slow.

# Backend API

This backend API is part of the Paytm Fullstack project, hosted on Render at `https://paytmfullstack.onrender.com/api/v1`. It provides endpoints for user authentication, user management, and bank account management.

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [User Routes](#user-routes)
- [Bank Routes](#bank-routes)

## Overview

### Base URL
The base URL for all API endpoints is:
```
https://paytmfullstack.onrender.com/api/v1
```

### Default Route
The root route returns a simple message.
```
GET /
Response: <h1>HELLO WORLD</h1>
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. The token must be included in the `Authorization` header as a Bearer token for protected routes.

### Middleware
The `authMiddleware` verifies the JWT token and adds the `userId` to the request object.

```javascript
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: 'No token provided or invalid token format' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userid) {
      req.userId = decoded.userid;
      next();
    } else {
      return res.status(401).json({ msg: 'Token does not contain user information' });
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token verification failed', err });
  }
};

module.exports = { authMiddleware };
```

## User Routes

### 1. Signup
Create a new user and generate a JWT token.

```
POST /api/v1/user/signup
Request Body:
{
  "username": "user@example.com",
  "password": "password",
  "firstname": "First",
  "lastname": "Last"
}
Response:
{
  "msg": "User Created Successfully",
  "token": "JWT_TOKEN"
}
```

### 2. Signin
Authenticate a user and generate a JWT token.

```
POST /api/v1/user/signin
Request Body:
{
  "username": "user@example.com",
  "password": "password"
}
Response:
{
  "msg": "Signed in successfully",
  "token": "JWT_TOKEN"
}
```

### 3. Update User
Update user information. Requires authentication.

```
PUT /api/v1/user
Headers:
  Authorization: Bearer JWT_TOKEN
Request Body:
{
  "password": "newpassword",
  "firstName": "NewFirst",
  "lastName": "NewLast"
}
Response:
{
  "message": "Updated successfully"
}
```

### 4. Get Users (Bulk)
Fetch users filtered by first name or last name. Requires authentication.

```
GET /api/v1/user/bulk?filter=somefilter
Headers:
  Authorization: Bearer JWT_TOKEN
Response:
{
  "user": [
    {
      "username": "user@example.com",
      "firstName": "First",
      "lastName": "Last",
      "_id": "user_id"
    },
    ...
  ]
}
```

## Bank Routes

### 1. Get Balance
Fetch the bank balance of the authenticated user.

```
GET /api/v1/bank/balance
Headers:
  Authorization: Bearer JWT_TOKEN
Response:
{
  "userbalance": {
    "userId": "user_id",
    "bankBalance": amount
  }
}
```

### 2. Transfer Money
Transfer money between two users. Requires authentication.

```
POST /api/v1/bank/transfer
Headers:
  Authorization: Bearer JWT_TOKEN
Request Body:
{
  "amount": transfer_amount,
  "to": "recipient_user_id"
}
Response:
{
  "msg": "transaction successfully"
}
```

---

### Note:
- Ensure to replace `JWT_TOKEN` with the actual token received from the signin/signup endpoints.
- Replace `transfer_amount` and `recipient_user_id` with actual values when making requests.

This README provides an overview of the available API endpoints, their request and response formats, and necessary headers for authentication.
