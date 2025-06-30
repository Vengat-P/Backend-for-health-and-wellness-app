## Helath and Wellness App Back end

## Overview

- Develop an app focused on health and wellness with features for fitness tracking, nutrition planning, and mental health support.

## Tech Stack

- **NodeJs** for Backend
- **expressJs** for performence and easy update
- **cors** for middleware
- **dotenv** for environment variables
- **mongoose** to Connect Mongo DB
- **JsonWebToken** for token singin and verify functionalites
- **bcrypt** to hash and compare the passwords
- **Nodemailer** to send email function
- **Node-cron** to trigger automatic email function
- **VSCode** for development
- **JavaScript** to applying logics

## Basic Installation and MVC Folder setup

**Step 1**

- Initailize NPM by using npm init --y command in prombt then change scripts start for node index.js and type module and create index.js file.

**Step 2**

- install required pacakges npm i expres ,cors ,dotenv ,nodemon ,bcrypt,nodemailer,node-cron and JsonWebToken. Then add scripts for dev to automatic restart of nodemon index.js

  **Step 3**

- create folders and required javascript file in MVC Patterns its nothing but database, models,routers and controllers are in separate folders.MVC- Model Views Controllers .

## Logics

**Step 1**

- initalize express function and add middlewares like express.json and cors.then create defult route for home page of backend. then declare port and start the server using listen function.

**Step 2**

- connect mongo DB using mongoose . make a async function with trycatch that returns our connection string with mongoose connect function.then call this function in index file before default route.

**Step 3**

- need to create Schema structure using mongoose schema function . this structure format will refelcts our DB so create wisely . Each field should have type (String) and required(true).And email feild should be unique.and getting user info details like gender,age,height and weight to check body control for these create feilds. then store Schema in variable name users to access further for this use mongoose model function.like this create three modals.one is fitness schema to store fitnesslog details,and second one is nutrition schema to store nutrition details, goal schema to store goal details and autoGoal schema for autogoal log genreate from goal.

**Step 4**

- In user router file import express and declare (express.router) function to make custom routes for each operations. export default router function .then import this router file in index file with type of js file. then create custom route function for app and pass this (/api/auth/) and userRoute(this will replace all opertions end point).

**Step 5**

- **AuthController**
- **userRegister** In auth controller file first import authschema which is inlcude our schema structure and make an export function for userRegister . This function also trycatch model and parameters will be request and response. catch will give error message in json format.In try block declare variable with new function and call users as function from stored schema pass inside request.body .then our password need to be encrypt so by using bcrypt hash method we can hash the password. now store as newUser with new feature passing all fields. then to save newUser call save function.now in reponse with 200 status code pass json message and data(newUser).now goto user router file make router with post function and pass register path and userRegister function(automatcally controllers will import need to change last file in js type).

- **userLogin** In auth controller file crete a export function name is userLogin . now destructure the datas from client by using request.body method. and find the user from mongo db using findOne method (pass email because this feild is unique) and stored as user.now write validation if not a user return user not found. then check password with our hash password for this we need to use bcrypt compare method.then write validations for password if password not match return invalid password. now need to asign token for user for this we need to use jwt sign method and store that token then pass that into response.this will give token for login user.then go to user router page and use post method router and set path as /login and pass userLogin controller.

- **getuser** for this function we need login token . to decode that we need user middleware function. in this middleware function get token by bearer token method and verify that in jwt method and store as decoded. now target req.user as decoded(this will give you the user id). this is middleware function so this will return next function call. now go to auth controller make a export function name is getUser and use async,try catch method till catch block. in try block get user id from req.user and pass that as \_id in findone method of mongo DB this will give user informations store this as user and declare password and toke as undefined for security purpose then pass this data in response.Now go to user router file and set get method and pass /getuser and getUser controller . we can get user information details.

- **forgotPassword** create export function of forgotPassword . get email id from req.body method if user not valid throw error. if user valid call send email function from nodemailer (import sendEmail from nodemailer.js). these node mailer send email function has three parameters, first one to pass user.email ,then subject write password reset link or related then text here write details and pass frontendlink with proper route in the end pass user.\_id and user.token . then send response as email sent successfully. user will get email for reset password link.

- **resetPassword** get id and token by using req.params method and get password by using req.body method . verify the token using jwt verify method if invalid token send error meassage . after updating new password need to encrypt so using bcrypt hash method to hash password and stored in db . to update this password in db use findByIdAndUpdate method (mongoose method) and set new password in db. if user not found throw error message . if password update successfully send response as a message password changed sucessfully else throw error. now authcontroller function and routers completed

**Step 6**

- **fitnessController**
- **createFitnessLog**In fitnesscontroller file first import fitness schema which is inlcude our schema structure and make an export function for createFitnesslog . This function also trycatch model and parameters will be request and response. catch will give error message in json format.In try block declare variable with new function and call fitness as function from stored schema pass inside request.body .and getting user id for user feild to connected respected users.for calories calculation added generalized formula for all exercises (Total calories burned = (Exercise duration in minutes) _ (MET value _ 3.5 \* weight in kg) / 200) the MET Value will be varied occording to exercise i took genral value 5 and for weight of user i use findOne method to get user details and pass user.weight . then to save new fitness log call save function.now in reponse with 200 status code pass json message and data(fitnesslog).now goto fitnessrouter file make router with post function and pass /create path,authmiddleware and createFitnessLog function(automatcally controllers will import need to change last file in js type).

- **getAllLogs** In fitness controller file export and declare with function name of getAllLogs.this is also async function and trycatch method. in catch block pass the response error message in json. In try block declare getfitnesslogs of stored schema by using mongodb find method and pass this variable in response data. now go to router and add path for getdata(/getfitnesslog) and pass this getAllLogs function.

- **getFitnessLogById** In fitnesscontroller file make function like same before method til trycatch block. in catch block pass the response of error message. in try block first get id from request using params method and stored as fitnesslogId. then use findById function of mongo db to get given id details and store that details in fitnesslog variable. pass the parameter fitnesslogid in findById function. then write validations if suppose data not found for that. then send response with data fitnessLog. now go to fitness router make path for getdata by id(/getdata/:id),authmiddleware and call getLog function.

- **updateFitnessLog** In fitnesscontroller file make function like same before method til trycatch block. In catch block pass the response of error message. In Try block get request id and store into fitnesslogidId by using params method. then destructure the schema structure with request.body method. now find the request id details using findByIdAndUpdate method of mongo db method and stored as result.inside of this find function pass \_id of fitnessLogId and all fields object and new as true object. then make validation function for product not found and send response with data of result.then go to fitnessRouter and make router for update(/update/:id),authmiddleware and pass update fitness log function.

- **deleteFitnessLog** In fitnessConroller file make function same like before step til trycatch block. In catch block pass the response of error message. In try block get request id and stored as fitnessLogId by using params method. now find the requested id details by using findByIdAndDelete function method of monogo db method. pass the parameter deleteId. this will get the requested id details and delete that fitnesslog.we can enter validation for fitnesslog not found for id not matching.if we want we can show remaining logs by using find method for stored schema and pass response with data of fitnessLogs to show remaining fitnessLogs. in fitness router pass(/delete/:id ) and authmiddleware and deletefitnesslog function. now fitness controller completed

**Step 7**

- **nutritionController**

- **CRUD** this controller also same like fitness controller . so i create all function and router similar to fitness controller but did change according to schema. here we need to find intake calories from taken food so i add carbohydrate _ 4 + protein _ 4 + fat \* 9 this formula from inputs we can get these details.other than that similar to fitness controller function names and variable name will change to relate nutrition .

**Step 8**

- **GoalController**

- **CRUD** this controller also crud opertion. so i update according to goal schema and routers also related to goal.

**Step 9**

- **autoGoalController**

- **CRUD** similar to previous crud operation but for crate i used cron schedule function to generate automatic trigger for all users. to find all users i used find method and for goal data i use for of method to send each users (find) and find goal data with condition from goal schema. remaing all operation will be same .

## Features

- Clean and Readable Code
- MVC pattern followed

## DEMO Link

- https://fit2go-app.onrender.com

## Authors

- [@ Vengat p](https://github.com/Vengat-P)
