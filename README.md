# BookMySalon – Salon Booking Management System

BookMySalon is a modern **web-based salon appointment booking platform in Sri Lanka** that allows users to easily discover salons, and schedule appointments online.

The platform helps customers find trusted salons and book services instantly while enabling salons to manage bookings efficiently.

---

# Live Demo

🌐 https://bookmysalon.yunilad2006.workers.dev/
---

# Features

### User Authentication

* Secure user registration and login
* Firebase Authentication integration
* Session management with real-time auth state tracking

### Salon Discovery

* Browse featured salons
* View salon services, location, and details
* Dynamic salon data loaded from Firestore

### Appointment Booking

* Book salon services online
* Choose service, date, and time
* Add notes or special requests

### Email Notifications

* Automatic booking confirmation emails
* Admin notification for new bookings
* Powered by Web3Forms

### Smart Search

* Filter salons by:

  * City
  * Service type
  * Availability date

### Secure Frontend

* HTML sanitization to prevent XSS attacks
* Authenticated booking actions
* Firestore integration with structured data

---

# Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6 Modules)

### Backend / Cloud

* Firebase Authentication
* Firebase Firestore Database

### Integrations

* Web3Forms (Email notifications)

### Deployment

* Cloudflare Pages

---

# Project Structure

```
BookMySalon
│
├── assets/          # Images, logo, icons
├── css/             # Styling files
├── js/
│   └── home.js      # Main application logic
│
├── firebase.js      # Firebase configuration and services
├── index.html       # Main landing page
└── README.md
```

---

# Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/BookMySalon.git
cd BookMySalon
```

---

### 2️⃣ Configure Firebase

Create a Firebase project and update:

```
firebase.js
```

Replace the configuration with your Firebase credentials.

---

### 3️⃣ Enable Firebase Services

Enable the following in Firebase Console:

* Authentication (Email/Password)
* Firestore Database

---

### 4️⃣ Run the Project

Simply open:

```
index.html
```

Or run with a local server (recommended):

```
Live Server (VSCode)
```

---

# 🗄 Firestore Database Structure

### salons

```
salons
   └── salonId
       ├── name
       ├── location
       ├── services
       ├── contact
       ├── image
       └── availability
```

### bookings

```
bookings
   └── bookingId
       ├── userId
       ├── salonId
       ├── service
       ├── date
       ├── time
       ├── notes
       └── createdAt
```

### users

```
users
   └── userId
       ├── email
       ├── role
       └── createdAt
```

---

# 🔒 Security Considerations

* Firebase Authentication for user identity
* Firestore rules should restrict access to authenticated users
* HTML sanitization implemented to prevent XSS attacks
* Email service restricted via Web3Forms access key

---

# 🎯 Future Improvements

* Salon owner dashboard
* Real-time appointment availability
* Payment integration
* Review and rating system
* Admin analytics dashboard

---

# 👨‍💻 Author

**Yunila Dissanayake**

Software Developer | Web Development Enthusiast

GitHub
https://github.com/yunilaD
