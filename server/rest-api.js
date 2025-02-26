var express = require("express");
var cors = require("cors");
var admin = require("firebase-admin");

// 🔹 Load environment variables (Render uses them)
require("dotenv").config();

var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Debug: Check if FIREBASE_SERVICE_ACCOUNT is loaded
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    console.error("❌ FIREBASE_SERVICE_ACCOUNT is not set!");
    process.exit(1); // Stop execution if missing
}

let serviceAccount;
try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (error) {
    console.error("❌ Error parsing FIREBASE_SERVICE_ACCOUNT:", error);
    process.exit(1); // Stop execution if JSON is invalid
}

// 🔹 Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore(); // Firestore database instance

// ✅ API to insert client details into Firestore
app.post("/contact", async (req, res) => {
    try {
        var clientDetails = {
            name: req.body.name || "",
            email: req.body.email || "",
            phone: req.body.phone || "",
            message: req.body.message || "",
            date: req.body.date || new Date().toISOString() // Ensure valid format
        };

        await db.collection("ClientDetails").add(clientDetails);
        console.log(`✅ Record inserted into Firestore`);
        res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        console.error("❌ Error inserting record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ API to get users from AdminCredentials collection
app.get("/users", async (req, res) => {
    try {
        const usersSnapshot = await db.collection("AdminCredentials").get();
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ✅ API to get client details from ClientDetails collection
app.get("/ClientDetails", async (req, res) => {
    try {
        const clientsSnapshot = await db.collection("ClientDetails").get();
        const clients = clientsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(clients);
    } catch (error) {
        console.error("❌ Error fetching client details:", error);
        res.status(500).json({ error: "Error fetching client details" });
    }
});

// 🔹 Use dynamic port for Render deployment
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
