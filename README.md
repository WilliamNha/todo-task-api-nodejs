# Todo List API

REST API todo app written in Node.js.

## Overview

This is a task management API sample project.

## Database

This API uses MongoDB as database.

## How to Use
- Change db_URL in initDB.js file to your database url
- Inside project terminal: Run `npm start`

## Endpoints

### Create new task

**POST: /task**

Sample:

```
{
   "task": "watch netflix",
   "time": "10:25"
}
```
-----

### Get all task

**GET: /task**
-----

### Get task by id

**GET: /task/:id**
-----

### Update task

**PATCH: /task/:id**

Sample:

```
{
   "task": "coding",
   "time": "11:25"
}
```
-----

### Delete task

**DELETE: /task/:id**

### Toogle task (finished or unfinised)

**PUT: /task/:id**
