const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies


const AccCollection = require('./collections/Accounts')
const userInfo = require('./collections/Info')
const AddedCart = require('./collections/Cart')
const CheckedOut = require('./collections/CheckOut')
const Ratings = require('./collections/Ratings')

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






//cart funcs


app.post('/SendCart', async (req, res) => {
  const { Item, Price, Date, Uid } = req.body;
  try {

    const ItemSenc = new AddedCart({
      Item: Item,
      Price: Price,
      Date: Date,
      Uid: Uid,
    });
    await ItemSenc.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
})

app.post('/DeleteCartItem', async (req, res) => {
  const { itemId } = req.body; // Assuming itemId is the identifier for the item to be deleted
  try {
    // Find the item by its identifier and delete it from the database
    await AddedCart.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
});


app.get('/GetCart', async (req, res) => {
  AddedCart.find()
    .then((item) => {
      res.json(item)
    }).catch((err) => {
      console.log(err)
    })
})


//checkout endpoints

app.post('/SendProduct', async (req, res) => {
  const { Email, Username, Data, message, ContactNum, Address, Destination, totalPrice, Date, Uid } = req.body;
  try {

    const productSend = new CheckedOut({
      Email: Email,
      Username: Username,
      Data: Data,
      message: message,
      ContactNum: ContactNum,
      Address: Address,
      totalPrice: totalPrice,
      Date: Date,
      isCancelled: false,
      Destination: Destination,
      Uid: Uid,
    });

    await productSend.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
})

app.put('/editProduct/:Id', async (req, res) => {
  const { Id } = req.params;
  const { Destination } = req.body;
  try {
    const result = await CheckedOut.findByIdAndUpdate(Id, {
      $set: {
        Destination: Destination,
      }

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


app.put('/addDriver/:Id', async (req, res) => {
  const { Id } = req.params;
  const { Destination, DeliverGuy } = req.body;
  try {
    const result = await CheckedOut.findByIdAndUpdate(Id, {
      $set: {
        Destination: Destination,
        DeliverGuy: DeliverGuy
      }

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



app.get('/getProduct', async (req, res) => {
  CheckedOut.find()
    .then((data) => {
      res.json(data)
    }).catch((err) => {
      console.log(err)
    })
})



//inbox endpoints

app.post('/SendRating', async (req, res) => {
  const { Message, Username, Stars, Uid } = req.body;

  try {
    let existingUserInfo = await Ratings.findOne({ Uid });

    if (existingUserInfo) {
      // Update fields only if they are not empty
      if (Username) existingUserInfo.Username = Username;
      if (Stars !== '') existingUserInfo.Stars = Stars;
      if (Message !== '') existingUserInfo.Message = Message;

      await existingUserInfo.save();
      res.status(200).json({ message: 'Activity updated successfully' });
    } else {
      // Create a new document only if Uid doesn't exist
      const newUserInfo = new Ratings({
        Message,
        Username,
        Stars,
        Date: Date.now(),
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


app.get('/getRatings', async (req, res) => {
  Ratings.find()
    .then((data) => {
      res.json(data)
    }).catch((err) => {
      console.log(err)
    })
})



const TimestampSchema = require('./collections/Visit')


app.post('/postAct', async (req, res) => {
  const { Username, Uid } = req.body
  try {
    let existingUserInfo = await TimestampSchema.findOne({ Uid });

    if(existingUserInfo) {
      console.log('you already sent ur data')
    } else {
      const saveAct = new TimestampSchema({
        Username: Username,
        Uid: Uid
      })
      await saveAct.save()
    }

    res.status(200).json({ message: 'Activity updated successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
})

app.get('/getPostAct', async (req, res) => {
  TimestampSchema.find()
  .then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
  })
})

app.listen(8080, () => {
  console.log("listening to port 8080")
})