# Dance Class/Course Booking System

This application is a fullstack Node.js and Express web app. It allows users to view, book, and manage dance classes/courses. Organisers and admins can both add and edit courses, and admins can manage other users.

## Features
User login/logout with role-based access
Organiser dashboard for managing courses (Add/Edit/Delete)
Admin dashboard for managing users (Add Organiser/Delete User)
Public course list for booking
Course booking form and confirmation view
Input validation and basic error handling
Responsive and styled views using Mustache templates
In-memory and file-based NeDB storage
Full testing suite using Jest and Postman

## TechStack
**Backend:** Node.js, Express.js
**Templating:** Mustache
**Database:** NeDB (in-memory and file-based)
**Authentication:** Express-session (role-based access control)
**Testing:** Jest, Supertest, Postman
**Deployment:** Render (Free Node.js hosting)

## Getting Started

Clone the follow repository:
https://github.com/MelahC/WAD2-Dance-Booking
cd dance-booking-site

Install the dependencies
npm install

Seed The Database 
node scripts/seedOrganiser.js
node scripts/seedCourses.js

Start the server
npm start

## Live Demo

🔗 https://wad2-dance-booking.onrender.com/

### Testing

Run Tests

npm test