import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('invoice-get', function (invoiceId, callback) {
    return paypal.invoice.get(invoiceId, this.node.get('.'), callback);
  });

};
