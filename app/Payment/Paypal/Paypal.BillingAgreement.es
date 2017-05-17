import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('billing-agreement-attributes-from-plan', function (plan) {
    const start_date = new Date()
    start_date.setSeconds(start_date.getSeconds() + 60);
    return (
      { name: plan.name
      , description: plan.description
      , start_date: start_date.toISOString()
      , plan: { id: plan.id }
      , payer: { payment_method: 'paypal' }
      }
    );
  });

  node.on('billing-agreement-get', function (id , callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.billingAgreement.get(id, cfg, callback);
  });

  node.on('billing-agreement-create', function (attributes, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.billingAgreement.create(attributes, cfg, callback);
  });

  node.on('billing-agreement-execute', function (token, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.billingAgreement.execute(token, {}, cfg, callback);
  });

};
