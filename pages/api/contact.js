import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      const { email, name, message } = req.body;

      if (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !message ||
        message.trim() === ''
      ) {
        res.status(422).json({
          message: 'Invalid input.'
        });
        return;
      }

      // Store it in a database
      const newMessage = {
        email,
        name,
        message
      };
      let client;

      try {
        client = await MongoClient.connect(
          `mongodb://localhost:27017/${process.env.mongodb_database}`
        );
      } catch (error) {
        res.status(500).json({
          message: "Couldn't connect to the database."
        });
        return;
      }

      const db = client.db();

      try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage._id = result.insertedId;
      } catch (error) {
        client.close();
        res.status(500).json({
          message: 'Storing message failed!'
        });
        return;
      }

      client.close();

      res.status(201).json({
        message: 'Successfully stored message!',
        data: newMessage
      });
      break;

    default:
      break;
  }
};

export default handler;
