# pLans
### Project 2 GA-SEI Full Stack Application


### The Daily User
Say you want to be able to make a plan for the day, either what you'll be doing, or what you need to be doing. pLan is the app for you! Create a pLan to keep track of what needs doing.

If you love inspiration create a pLan with images, and text **Spark your next idea**

---

## What is it?
#### A personal planner
Create, Edit, and Schedule pLans. An intuitive and fun way of scheduling your week.
Be the best you, you can be with **pLans** a new app from the developer that brought you Safe Space Dots Journey Home.

## What API will I implement?
#### Cloudinary
I will be relying on Cloudinary for media processing and editing.

## Will I be using a Framework?
#### Yes, Bootstrap 5
I will be using Bootstrap for the styling of the application as it is easy to use and very flexible in usage.

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

