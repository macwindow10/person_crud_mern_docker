const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve image files

//  mongodb is name of docker container
mongoose.connect('mongodb://admin:password@mongodb:27017/persondb?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const personSchema = new mongoose.Schema({
    name: String,
    profession: String,
    email: String,
    picture: String // file path
});

const Person = mongoose.model('Person', personSchema);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
app.post('/api/persons', upload.single('picture'), async (req, res) => {
    const { name, profession, email } = req.body;
    const picture = req.file ? req.file.path : '';
    const person = new Person({ name, profession, email, picture });
    await person.save();
    res.send(person);
});

app.get('/api/persons', async (req, res) => {
    const persons = await Person.find();
    res.send(persons);
});

app.put('/api/persons/:id', upload.single('picture'), async (req, res) => {
    const updateData = {
        name: req.body.name,
        profession: req.body.profession,
        email: req.body.email
    };
    if (req.file) updateData.picture = req.file.path;
    const updated = await Person.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.send(updated);
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));