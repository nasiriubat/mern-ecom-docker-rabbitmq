'use strict';

var utils = require('../utils/writer.js');
var OrderService = require('../service/OrderService');
var sendTask = require('../rabbit-utils/sendTask.js');



let lastId = 0;

function generateUniqueIntegerId() {
  lastId += 1;
  return lastId;
}


module.exports.addOrder = function addOrder(req, res, next) {
  
  const oID = generateUniqueIntegerId();
  var order = {
    
    sandwichId: 1,
    id: oID,
    status: "ordered"
  };

  OrderService.addOrder(order)
    .then(function (response) {
      utils.writeJson(res, response);
      // sendTask.addTask("rapid-runner-rabbit", "received-orders", order);
    })
    .catch(function (error) {
      utils.writeJson(res, error);
    });
};

module.exports.getOrderById = function getOrderById(req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  OrderService.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error);
    });
};

module.exports.getOrders = function getOrders(req, res, next) {
  OrderService.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, error);
    });
};
