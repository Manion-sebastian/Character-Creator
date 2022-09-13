# pLans
### Project 2 GA-SEI Full Stack Application


### The Daily User
Say you want to be able to make a plan for the day, either what you'll be doing, or what you need to be doing. pLan is the app for you! Create a pLan to keep track of what needs doing.
If you love inspiration create a pLan with images, and text **Spark your next idea**

## User Stories
* as a user I would like to sign up for an account
* as a user I would like to be able to log in and out of the website
* as a user I would like to create personal pLans and keep track of them
* as a user I would like to be able to edit my pLans and allow them to have photos if I so wish
* as a user I would like to be able to delete my pLans if they have angered me
* as a user I would like to see my pLans ordered neatly on the main page
 

---

## What is it?
#### A personal planner
Create, Edit, and Schedule pLans. An intuitive and fun way of scheduling your week.
Be the best you, you can be with **pLans** a new app from the developer that brought you Safe Space Dots Journey Home.


## What API will I implement?
#### Cloudinary
I will be relying on Cloudinary for media processing and editing.

## Will I be using a CSS Framework?
#### Yes, ~~Bootstrap 5~~ Tailwind
 ~~I will be using Bootstrap for the styling of the application as it is easy to use and very flexible in usage.~~

 I've used Bootstrap before many times and I want to learn something new so I will be using Tailwind

## What will be used for this Project?
As mentioned above I will be using Cloudinary, and Bootstrap. I will also be using Vanilla Javascript, HTML, CSS, Postgres, as well as an assortment of modules. 

---

## ERD and Wireframes

#### ERD
![imgur, ERD](https://i.imgur.com/rdF1P5M.png)

#### Main Screen
![imgur, main screen](https://i.imgur.com/kIYWCoq.png)

#### Content Screen
![imgur, content screen](https://i.imgur.com/xyA4h36.png)

#### User Creation Screen and Form
![imgur, user create screen](https://i.imgur.com/IDrPGjn.png)

#### pLan Creation Screen and Form
![imgur, pLan create screen](https://i.imgur.com/HXGY35U.png)

---

## RESTful routing
#### user

| Method | Action | Description |
|:------:|:------:|:-----------:|
| POST   | /users | Create new user |
| GET    | /users/new | Render form for creating new User |
| PUT    | /users/:id | Edit User |
| DELETE | /users/:id | Delete User |

#### pLans
| Method | Action | Description |
|:------:|:------:|:-----------:|
| GET    | /users/:id/plans | Show all pLans |
| POST   | /users/:id/plans | Create new user |
| GET    | /users/:id/plans/new | Render form for creating new pLan |
| PUT    | /users/:id/plans | Edit pLan |
| DELETE | /users/:id/plans/:id | Delete pLan |

---

## MVP and Stretch Goals

#### MVP
To have a full MVP I will have 
* A functioning login, and authentication system
* Clean and correct routes
* A form for creating a new user, and pLan
* A display of all existing pLans
* Images for the user, and pLans
* A well styled website

#### Stretch Goals
Stretch Goals I hope I can implement
* Exporting pLans
* Animations for creating and deleting pLans
* PLan folders

---

## Potential Roadblocks
Potential issues I could have
* Formatting issues with content
* Layout issues
* Route issues

---

## Proof of API usage

#### link: https://res.cloudinary.com/ga-sei-sm/image/upload/v1663043166/shark.png

![cloudinary](https://res.cloudinary.com/ga-sei-sm/image/upload/v1663043166/shark.png)