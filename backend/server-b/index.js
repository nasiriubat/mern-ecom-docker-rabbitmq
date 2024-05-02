'use strict';

const amqp = require('amqplib');
const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

async function main() {
    try {
        const connection = await amqp.connect('amqp://rapid-runner-rabbit');
        const channel = await connection.createChannel();

        const queue = 'received-orders';
        await channel.assertQueue(queue, { durable: true });

        console.log('Waiting for orders...');

        channel.consume(queue, async function(msg) {
            const order = JSON.parse(msg.content.toString());

            console.log('Received order:', order);

            const processingResult = processOrder(order);

            const statusQueue = 'order-status';
            await channel.assertQueue(statusQueue, { durable: true });

            // Delay the sending of the message by 15 seconds
            setTimeout(async () => {
                await channel.sendToQueue(statusQueue, Buffer.from(JSON.stringify(processingResult)));
                channel.ack(msg);
            }, 15000);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function processOrder(order) {
    const success = Math.random() < 0.8; // 80% success rate
    const status = success ? 'ready' : 'failed';

    return { id: order.id, status };
}

main();