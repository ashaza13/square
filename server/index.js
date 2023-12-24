const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
require('dotenv/config');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//STATIC
// get directory where is index.html
const root = path.join(__dirname, 'client', 'build');
//express.use static with the directory
app.use(express.static(root));
//express get request any (*) root, please use file that is on root directory configure above.
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
});



const uri = process.env.MONGODB_URI || "mongodb+srv://ahmedashaz9:MpyClnFaC7MuMcb3@cluster0.xwx3k4e.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db, usersCollection, tasksCollection;

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db("Cluster0");
        usersCollection = db.collection("users");
        tasksCollection = db.collection("tasks");
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        setTimeout(connectToMongoDB, 5000); // Retry connection after 5 seconds
    }
}

// Call the function to connect to MongoDB
connectToMongoDB();

// Register Route
app.post('/register', async (req, res) => {
    if (!usersCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { username, password, email } = req.body;

        // Validate the received data
        if (!username || !password || !email) {
            return res.status(400).send('Missing required fields');
        }

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user object with the hashed password
        const newUser = {
            username: username,
            password: hashedPassword, // Store the hashed password
            email: email,
            tasks: [] // Initialize an empty tasks list
        };

        // Insert the new user into the users collection
        const result = await usersCollection.insertOne(newUser);

        const userResponse = {
            _id: result.insertedId,
            username: username,
            email: email,
            tasks: [] // Initialize an empty tasks list
        };

        res.status(201).send(userResponse);
    } catch (error) {
        console.error('Error in /register route', error);
        res.status(500).send('Error registering new user');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    if (!usersCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { email, password } = req.body;

        // Validate the received data
        if (!email || !password) {
            return res.status(400).send('Missing required fields');
        }

        // Check if the user exists
        const existingUser = await usersCollection.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).send('User does not exist');
        }

        // Check if the password is correct
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(400).send('Invalid password');
        }

        // Create a response object excluding the password
        const userResponse = {
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            tasks: existingUser.tasks
            // Add any other fields you wish to return
        };

        // Return the user response object
        res.status(200).send(userResponse);
    } catch (error) {
        console.error('Error in /login route', error);
        res.status(500).send('Error logging in');
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    if (!usersCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { uid, taskName, repeats, date } = req.body;

        // Validate the received data
        if (!uid || !taskName || !date) {
            return res.status(400).send('Missing required fields');
        }

        // Create a new task object
        const newTask = {
            uid: uid,
            taskName: taskName,
            repeats: repeats,
            dates: [{
                date: date,
                count: 0
            }]
        };

        // Insert the new task into the tasks collection
        const result = await tasksCollection.insertOne(newTask);

        const taskResponse = {
            _id: result.insertedId,
            uid: uid,
            taskName: taskName,
            repeats: repeats,
            dates: [{
                date: date,
                count: 0
            }]
        };

        res.status(201).send(taskResponse);
    } catch (error) {
        console.error('Error in /tasks route', error);
        res.status(500).send('Error adding new task');
    }
});

// Get all tasks for a user
app.get('/tasks/:uid', async (req, res) => {
    if (!tasksCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { uid } = req.params;

        // Validate the received data
        if (!uid) {
            return res.status(400).send('Missing required fields');
        }

        // Find all tasks for the user
        const tasks = await tasksCollection.find({ uid: uid }).toArray();

        res.status(200).send(tasks);
    } catch (error) {
        console.error('Error in /tasks route', error);
        res.status(500).send('Error getting tasks');
    }
});

// Add a new date to a task
// If task exists, add 1 to count
app.put('/tasks/:id', async (req, res) => {
    if (!tasksCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { id } = req.params;
        const { date } = req.body;

        // Validate the received data
        if (!id || !date) {
            return res.status(400).send('Missing required fields');
        }

        const oid = new ObjectId(id);

        // Find the task by ID
        const task = await tasksCollection.findOne({ _id: oid, dates: { $elemMatch: { date: date } } });

        let result;

        //If task exists, add 1 to count
        if (task) {
            result = await tasksCollection.updateOne(
                { _id: oid, dates: { $elemMatch: { date: date } } },
                {
                    $inc: { "dates.$.count": 1 }
                }
            );
            return res.status(200).send(result);
        } else {
            // Update the task
            result = await tasksCollection.updateOne(
                { _id: oid },
                {
                    $push: {
                        dates: { date: date, count: 1 }
                    }
                }
            );
        }

        res.status(200).send(result);
    } catch (error) {
        console.error('Error in /tasks route', error);
        res.status(500).send('Error updating task');
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    if (!tasksCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { id } = req.params;

        // Validate the received data
        if (!id) {
            return res.status(400).send('Missing required fields');
        }

        const oid = new ObjectId(id);

        // Delete the task
        const result = await tasksCollection.deleteOne({ _id: oid });

        res.status(200).send(result);
    } catch (error) {
        console.error('Error in /tasks route', error);
        res.status(500).send('Error deleting task');
    }
});

//Add 1 to count
app.put('/tasks/:id', async (req, res) => {
    if (!tasksCollection) {
        return res.status(503).send('Database not connected');
    }

    try {
        const { id } = req.params;
        const { date, count } = req.body;

        // Validate the received data
        if (!id || !date || !count) {
            return res.status(400).send('Missing required fields');
        }

        // Find the task by ID
        const task = await tasksCollection.findOne({ _id: id });

        // Update the task
        const result = await tasksCollection.updateOne(
            { _id: id },
            {
                $set: {
                    dates: [...task.dates, { date: date, count: count }]
                }
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.error('Error in /tasks route', error);
        res.status(500).send('Error updating task');
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


