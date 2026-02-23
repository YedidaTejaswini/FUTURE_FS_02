const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://tejaswini:teja2086@cluster0.inziie1.mongodb.net/miniCRM")
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Connection Error:", err));

// ✅ Schema
const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: { type: String, default: "New" }
});

// ✅ Model
const Lead = mongoose.model("Lead", LeadSchema);

// ✅ Add Lead
app.post("/add", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: "Error adding lead" });
    }
});

// ✅ Get All Leads
app.get("/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Error fetching leads" });
    }
});

// ✅ Update Status
app.put("/update/:id", async (req, res) => {
    try {
        await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.send("Updated Successfully");
    } catch (error) {
        res.status(500).json({ error: "Error updating lead" });
    }
});

// ✅ Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});