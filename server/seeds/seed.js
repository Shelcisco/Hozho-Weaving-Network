const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  try {
    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor, reactions } = await Thought.create(thoughtSeeds[i]);

      // Update user thoughts array
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );

      // Associate each reaction with the thought
      if (Array.isArray(reactions)) { // Check if reactions is an array
        for (let j = 0; j < reactions.length; j++) {
          const { reactionBody, username } = reactions[j];
          const reactingUser = await User.findOne({ username });
          const reaction = {
            reactionBody,
            username,
            createdAt: new Date()
          };

          Thought.reactions.push(reaction);
          await Thought.save();

          reactingUser.reactions.push(reaction);
          await reactingUser.save();
        }
      }
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
