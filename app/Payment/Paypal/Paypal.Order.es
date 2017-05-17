import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('order-get', function (orderId, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.order.get(orderId, cfg, callback);
  });

};
