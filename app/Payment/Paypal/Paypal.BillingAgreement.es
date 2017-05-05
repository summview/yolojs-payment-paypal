import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('billing-agreement-create', function () {
    return paypal.billingAgreement.create(
  });

};
