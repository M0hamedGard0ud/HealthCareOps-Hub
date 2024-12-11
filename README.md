![This is the description file image](/client/src/components/img/bg.jpg)

# Healthcare Operations System

This is a Healthcare Operations System built using the MERN (MongoDB, Express.js, React, Node.js) stack. The frontend is developed with React and Vite, with styling done using styled-components.

## Features

- **Admin Dashboard**: Administrators can manage hospitals, patient records, lab users, approve hospital registrations, and view system performance metrics.
- **Hospital Dashboard**: Hospitals can manage their profile, appointment slots, and update their details.
- **Patient Dashboard**: Patients can view and manage their appointments, provide feedback, and interact with healthcare providers.
- **Lab Dashboard**: Lab users can manage lab test results, upload reports, and interact with hospital management.
- **Authentication System**: Secure user authentication using roles such as Admin, Hospital, Patient, and Lab User.

## Operations Include

- **Hospital Registration & Approval**: Hospitals can register and are required to get admin approval before accessing the dashboard.
- **Appointment Management**: Hospitals can manage appointment slots, and patients can book appointments.
- **User Management**: Admins can manage patients, lab users, and hospitals.
- **Lab Test Management**: Lab users can upload and manage lab test reports.
- **Feedback System**: Patients can provide feedback on hospital services.
- **Profile Management**: All users can update their profiles, including security questions for password recovery.
- **Approval Workflow**: Admins can approve or reject hospital and user registrations.
- **Performance Tracking**: Admins can view metrics to track system performance and user activities.

## Technologies Used

- **Frontend**: React, Vite, styled-components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Not deployed yet

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone git@github.com:M0hamedGard0ud/HealthCareOps-Hub.git
   ```

2. **Install dependencies**:
   ```bash
   cd healthcare-operations-system
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory.

   Define the following environment variables:

   ```plaintext
   PORT=4000
   DB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key_for_jwt
   ```

4. **Run the development servers**:
   - Start the frontend server:
     ```bash
     npm run dev
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

5. **Access the application**:
   Open your browser and navigate to:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:4000`

## Contributing

Contributions are welcome! Feel free to submit pull requests, bug reports, feature requests, or any suggestions to improve this project.

---
