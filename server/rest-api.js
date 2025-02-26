var express = require("express");
var cors = require("cors");
var admin = require("firebase-admin");

// 🔹 Load environment variables
require("dotenv").config();

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Debug: Check if FIREBASE_SERVICE_ACCOUNT is loaded properly
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("❌ FIREBASE_SERVICE_ACCOUNT is missing. Check environment variables.");
    process.exit(1);
}

let serviceAccount;
try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("✅ FIREBASE_SERVICE_ACCOUNT loaded successfully");
} catch (error) {
    console.error("❌ Error parsing FIREBASE_SERVICE_ACCOUNT:", error.message);
    process.exit(1);
}

// 🔹 Initialize Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin SDK initialized");
} catch (error) {
    console.error("❌ Error initializing Firebase Admin SDK:", error.message);
    process.exit(1);
}

var db = admin.firestore(); // Firestore database instance

// ✅ API to insert client details into Firestore
app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message, date } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        var clientDetails = {
            name,
            email,
            phone,
            message,
            date: date || new Date().toISOString()
        };

        await db.collection("ClientDetails").add(clientDetails);
        console.log(`✅ Record inserted into Firestore: ${name}`);
        res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("❌ Error inserting record:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ API to get users from AdminCredentials collection
app.get("/users", async (req, res) => {
    try {
        const usersSnapshot = await db.collection("AdminCredentials").get();

        if (usersSnapshot.empty) {
            return res.status(404).json({ message: "No users found" });
        }

        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error.message);
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ✅ API to get client details from ClientDetails collection
app.get("/ClientDetails", async (req, res) => {
    try {
        const clientsSnapshot = await db.collection("ClientDetails").get();

        if (clientsSnapshot.empty) {
            return res.status(404).json({ message: "No client details found" });
        }

        const clients = clientsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(clients);
    } catch (error) {
        console.error("❌ Error fetching client details:", error.message);
        res.status(500).json({ error: "Error fetching client details" });
    }
});

// 🔹 Use dynamic port for Render deployment
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
