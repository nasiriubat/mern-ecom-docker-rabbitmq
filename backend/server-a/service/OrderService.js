'use strict';
const sendTask = require('../rabbit-utils/sendTask');
const receiveTask = require('../rabbit-utils/receiveTask');
const OrderModel = require('../models/orderModel');


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/


exports.addOrder = function (order) {
  return new Promise(function (resolve, reject) {
    sendTask.addTask("rapid-runner-rabbit", "received-orders", order)
      .then(() => {
        order.status = "in progress";
        const newOrder = new OrderModel(order);
        newOrder.save()
          .then(async () => {
            listenForUpdates()
            resolve(order);
          })
          .catch(error => {
            console.error('Error saving order to MongoDB:', error);
            reject(error);
          });
      })
      .catch(error => {
        console.error('Error sending task to RabbitMQ:', error);
        reject(error);
      });
  });
};

async function listenForUpdates() {
  try {
    receiveTask.getTask("rapid-runner-rabbit", "order-status").then(async function (order) {
      if (!order) {
        console.log('Received task is undefined or null');
        return;
      }
      const orderObj = JSON.parse(order);
      console.log(orderObj)
      await OrderModel.findOneAndUpdate({ id: orderObj.id }, {
        $set: {
          status: orderObj.status
        },
      },  { new: true, runValidators: true });
    });
  } catch (error) {
    console.error('Error occured in updating the status:', error.message);
  }
}


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/

exports.getOrderById = function (orderId) {
  return OrderModel.findOne({ id: orderId }, '-_id -__v').exec();
};



/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function () {
  return OrderModel.find({}, '-_id -__v').exec();
};