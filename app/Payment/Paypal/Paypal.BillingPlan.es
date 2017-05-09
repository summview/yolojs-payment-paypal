import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('billing-plan-create', function (billingPlanAttributes, callback) {
    return paypal.billingPlan.create(billingPlanAttributes, this.node.get('.'), callback);
  });

  node.on('billing-plan-update', function ({ planId, update }, callback) {
    return paypal.billingPlan.update(planId, update, this.node.get('.'), callback);
  });

  node.on('billing-plan-activate')
    .then( ':billing-plan-update'
         , { planId: '$:@'
           , update: [ { op: 'replace', path: '/', value: { state: 'ACTIVE' } } ]
           }
         )
    .end();

};
