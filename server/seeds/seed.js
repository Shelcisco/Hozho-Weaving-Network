const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  // try {
  //   await User.deleteMany({});
  //   await Thought.deleteMany({});

  //   await User.create(userSeeds);

  //   for (let i = 0; i < thoughtSeeds.length; i++) {
  //     const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
  //     const user = await User.findOneAndUpdate(
  //       { username: thoughtAuthor },
  //       {
  //         $addToSet: {
  //           thoughts: _id,
  //         },
  //       }
  //     );
  //   }
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }

  console.log('all done!');
  process.exit(0);
});


