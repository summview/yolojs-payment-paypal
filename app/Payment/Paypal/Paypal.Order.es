import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('order-get').then(':safe').trap(true, ':describe-error')
    .then(function ({ payload: orderId, config }, callback) {
      return paypal.order.get(orderId, config, callback);
    }).end();

};
