import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('order-get', function (orderId, callback) {
    return paypal.order.get(orderId, this.node.get('.'), callback);
  });

};
