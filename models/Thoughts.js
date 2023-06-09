// **Thought**:

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thouhgtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
