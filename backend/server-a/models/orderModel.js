const mongoose = require('mongoose');



const OrderSchema = new mongoose.Schema({



  sandwichId: {
    type: Number,
    required: true
  },

  id: {
    type: Number,
    required: true
  },
  
  status: {
    type: String,
    enum: ['ordered',  'in progress', 'ready', 'failed'],
    default: 'ordered'
  }
});


module.exports = mongoose.model('Orders', OrderSchema);

