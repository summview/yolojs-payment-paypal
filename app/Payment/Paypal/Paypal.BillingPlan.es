import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('billing-plan-create', function (billingPlanAttributes, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.billingPlan.create(billingPlanAttributes, cfg, callback);
  });

  node.on('billing-plan-update', function ({ planId, update }, callback) {
    const cfg = this.node.get(['client_id', 'client_secret']);
    return paypal.billingPlan.update(planId, update, cfg, callback);
  });

  node.on('billing-plan-activate')
    .then( ':billing-plan-update'
         , { planId: '$:@'
           , update: [ { op: 'replace', path: '/', value: { state: 'ACTIVE' } } ]
           }
         )
    .end();

};
