const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies


const AccCollection = require('./collections/Accounts')
const userInfo = require('./collections/Info')

app.get('/', async (req, res) => {
  res.send("connected")
})

app.post('/SendAcc', async (req, res) => {
  const { Email, Username, Password, Uid } = req.body;
  try {
    console.log({
      Email: Email,
      Username: Username,
      Password: Password,
      Uid: Uid,
    });

    const AccountInfo = new AccCollection({
      Email: Email,
      Username: Username,
      Password: Password,
      Uid: Uid,
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
})

app.post('/SendInfo', async (req, res) => {
  const { Address, Username, Contact, Uid } = req.body;
  try {
    // Check if there's an existing document with the provided Uid
    let existingUserInfo = await userInfo.findOne({ Uid });

    if (existingUserInfo) {
      // Update existing document
      existingUserInfo.Address = Address;
      existingUserInfo.Username = Username;
      existingUserInfo.Contact = Contact;
      await existingUserInfo.save();
      res.status(200).json({ message: 'Activity updated successfully' });
    } else {
      // If no existing document found, create a new one
      const newUserInfo = new userInfo({
        Address,
        Username,
        Contact,
        Uid,
      });
      await newUserInfo.save();
      res.status(201).json({ message: 'New activity saved successfully' });
    }
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.put('/ChangeName/:Uid', async (req, res) => {
  const { Uid } = req.params;
  const { Username } = req.body; // Access req.body directly             

  try {
    console.log(Uid);
    const result = await AccCollection.updateOne({ Uid: Uid }, { // Using Uid as the filter
      $set: {
        Username: Username,
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/GetInfo', async (req, res) => {
  userInfo.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})

app.get('/GetAcc', async (req, res) => {
  AccCollection.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})

app.listen(8080, () => {
  console.log("listening to port 8080")
})