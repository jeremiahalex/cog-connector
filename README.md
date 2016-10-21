# Nano Services
So the idea is to create nano-services - working title cogs. Each Cog does one single thing and does it well. All Cogs are designed to be pipe-able, that is they can be called in sequence passing the output data from one to be the input data from another. To achieve this all data is handled in JSON that adheres to the following format.

### JSON Data Format v0.1
The JSON contains a collection of props (key-value pairs) that cogs can alter. The commonly understood values are currently:
- id
- name

In addition to this the file also contains a sequence of transforms that have been applied. Each cog should add itself to this list.
```json
  "props": [
    {
      "name": "example",
      "id": 0
    }
  ],
  "transforms": [
    {
      "name": "my-custom-cog",
      "description": "a cog i made to test this crazy idea",
      "version": "v1.0.0",
      "order" : 0
    }
  ]
```

## Creating Cogs
I've currently created two examples cogs. You can fork one to try and create your own if you like.
- [reverse-string](https://github.com/jeremiahalex/cog-reverse-string)
- [string-sum-int](https://github.com/jeremiahalex/cog-string-sum-int)

## Pipes
The application for creating pipes of connected cogs lives here: https://cog-connector.herokuapp.com
No UI yet, so you'll have to use postman or curl.

### Creating a Pipe
Send a POST request with JSON data to */pipes*

The JSON should contain an array of cogs to pipe together. Currently these are fully formed URLs but the intention is that they should be names, with cogs being be pre-registered with this App. That will allow cogs to be Tested and Approved.

__This does however means that you can add new cogs and test now without approval__

The result of a create action will be the pipe created include an _id_ property for using the pipe later

*Example Request*
```json
  "cogs": [
    "https://cog-reverse-string.herokuapp.com/connect",
    "https://cog-string-sum-int.herokuapp.com/connect"
  ]
```

*Example Response*
```json
  "cogs": [
    "https://cog-reverse-string.herokuapp.com/connect",
    "https://cog-reverse-string.herokuapp.com/connect"
  ],
  "_id": "580a04c50f8d942eaa6986b8"
```

### Run a Pipe
To run a pipe, do a post request to */pipes/:id** using the id of your pipe and some starting data in the same JSON format.

Below is an example END consumer that I made. change the name param in the url to try

https://cog-dashboard.herokuapp.com?name=jeremiah

## List all Pipes
## View a Pipe
## Test a Pipe
## Update a Pipe
## Edit a Pipe


## User Authentication
At some point in the distant future.
