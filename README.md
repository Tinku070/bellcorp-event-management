# **Bellcorp Event Management Application**

## **Live Demo**

Frontend: https://bellcorp-event-management-three.vercel.app/
Backend: https://bellcorp-event-management-aa95.onrender.com

## **GitHub Repository**

https://github.com/Tinku070/bellcorp-event-management.git

## **Test Credentials**

Email: test@bellcorp.com  
Password: 123456

---

## **Features**

### **Authentication**

* User registration and login  
* JWT-based authentication  
* Protected dashboard routes  
* Persistent login using localStorage

### **Event Discovery**

* Browse all events  
* Search by event name  
* Filter by category  
* Dynamic data fetching  
* Displays organizer, location, date, category, and capacity

### **Event Registration**

* Register for events  
* Prevent duplicate registrations  
* Cancel registrations  
* Real-time UI updates after actions

### **User Dashboard**

* View registered events  
* Upcoming events section  
* Past events section

---

## **Tech Stack**

### **Frontend**

* React.js (Vite)  
* Axios  
* React Router  
* Context API for global authentication state

### **Backend**

* Node.js  
* Express.js  
* MongoDB Atlas  
* Mongoose  
* JWT Authentication  
* bcryptjs for password hashing

---

## **Database Design**

### **User**

* name  
* email (unique)  
* password (hashed)

### **Event**

* name  
* organizer  
* location  
* date  
* description  
* capacity  
* category

### **Registration**

* user → references User  
* event → references Event

This implements a many-to-many relationship between users and events.

---

## **Backend Logic**

* JWT middleware for protected routes  
* Prevents duplicate event registration  
* Validates event capacity before registering  
* Populates event details in the user dashboard

---

## **Environment Variables**

### **Backend (.env)**

`MONGO_URI=mongodb+srv://bellcorpUser:Bellcrop123@cluster0.fypq20f.mongodb.net/?appName=Cluster0`  
`JWT_SECRET=bellcorpsecret`

### **Frontend (.env)**

`VITE_API_URL=https://your-backend.onrender.com/api`

---

## **API Endpoints**

### **Auth**

POST /api/auth/register  
POST /api/auth/login

### **Events**

GET /api/events  
GET /api/events?search=\&category=

### **Registrations**

POST /api/registrations/:eventId  
DELETE /api/registrations/:eventId  
GET /api/registrations/my

---

## **Run Locally**

### **Backend**

`cd server`  
`npm install`  
`npm run dev`

### **Frontend**

`cd client`  
`npm install`  
`npm run dev`

---

## **Video Walkthrough**

The video demonstrates:

* Project structure  
* Database schema  
* JWT authentication flow  
* Event registration logic  
* Frontend user flow

