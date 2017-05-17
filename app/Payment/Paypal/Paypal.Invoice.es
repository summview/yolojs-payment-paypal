import paypal from 'paypal-rest-sdk';

export default function (node, logger, paypal) {

  node.on('invoice-get', function (invoiceId, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.invoice.get(invoiceId, cfg, callback);
  });

};
