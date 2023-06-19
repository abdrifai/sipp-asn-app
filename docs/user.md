# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rifai",
  "password": "password",
  "nama": "Abd. Rifai"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifai",
    "nama": "Abd. Rifai"
  }
}
```

Response Body Error :

```json
{
  "errors": "username already registered"
}
```

## Login User API

Endpoint : POST /api/login

Request Body :

```json
{
  "username": "rifai",
  "password": "password"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "rifai", //optional
  "password": "password" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifai",
    "nama": "Abd. Rifai"
  }
}
```

Response Body Error :

```json
{
  "errors": "name length max 100"
}
```

## Get User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "rifai",
    "nama": "Abd. Rifai"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "ok"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
