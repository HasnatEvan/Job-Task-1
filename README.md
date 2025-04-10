# 🅵🅾🅽🆃  🅶🆁🅾🆄🅿  🆂🆈🆂🆃🅴🅼

A single-page web application to upload fonts, group multiple fonts together, and manage them — built using **ReactJS**, **Tailwind CSS**, **DaisyUI**, and **Node.js + Express + MongoDB** on the backend.

---

## 🚀 Features

✅ Upload `.ttf` font files (TrueType Font)  
✅ Live preview of uploaded fonts  
✅ Create font groups with at least **two fonts**  
✅ Add/Delete rows dynamically when creating groups  
✅ View, Edit, and Delete font groups  
✅ No page reloads — uses **React & API** integration  
✅ Responsive UI using **Tailwind CSS** & **DaisyUI**  
✅ Backend follows **SOLID principles**  
✅ MongoDB for storing fonts & font group data  

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ ReactJS
- 💨 Tailwind CSS
- 🌼 DaisyUI
- 📦 Axios (for API calls)

### Backend:
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB (Mongoose)

---

## 📁 Project Structure

font-group-system/ ├── client/ # React frontend │ ├── components/ # Reusable UI components │ ├── pages/ # Page-level components (FontUpload, FontGroup etc.) │ ├── services/ # Axios services for API │ ├── App.jsx # Main component │ └── main.jsx # React entry point ├── server/ # Node backend │ ├── controllers/ # Business logic (Font & Group controller) │ ├── models/ # Mongoose models │ ├── routes/ # API routes │ ├── uploads/ # Uploaded font (.ttf) files │ ├── middleware/ # Validation and error handling │ └── server.js # Entry point for Express server ├── .gitignore ├── README.md ├── package.json

---

## 🧪 How to Run the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/font-group-system.git
cd font-group-system
cd server
npm install
 npm run dev
# Server runs on http://localhost:5000
 cd ../client
npm install
 npm run dev
# App runs on http://localhost:5173
 📌 Functional Notes
✅ Only .ttf files are accepted during upload

✅ Live font preview using dynamically generated @font-face

✅ Font group must have at least two fonts

✅ Add/Delete font input rows dynamically

✅ Font groups are editable and deletable

✅ All interactions use API without page reload

🔗 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/fonts	Upload font file
GET	/api/fonts	Get all uploaded fonts
POST	/api/font-groups	Create font group
GET	/api/font-groups	Get all font groups
PUT	/api/font-groups/:id	Update font group
DELETE	/api/font-groups/:id	Delete font group
🧠 SOLID Principles Used
Single Responsibility: Separated routes, models, controllers

Open/Closed: Logic can be extended without modifying existing code

Liskov Substitution: Reusable and consistent API structures

Interface Segregation: Lightweight modular services

Dependency Inversion: Separated concerns between UI, services & backend

📝 License
This project is licensed under the MIT License.

🤝 Acknowledgment
This task is part of the Full Stack JavaScript Developer Assignment to demonstrate the ability to build fully functional font management features using modern web development tools. 


🔗 Live Demo: https://delightful-empanada-f0bbd3.netlify.app/

