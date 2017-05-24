import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('invoice-get').then(':safe').trap(true, ':describe-error')
    .then(function ({ payload: invoiceId, config }, callback) {
      return paypal.invoice.get(invoiceId, config, callback);
    }).end();

};
