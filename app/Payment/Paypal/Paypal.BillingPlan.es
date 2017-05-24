import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('billing-plan-create').then(':safe').trap(true, ':describe-error')
    .then(function ({ payload: attributes, config }, callback) {
      return paypal.billingPlan.create(attributes, config, callback);
    }).end();

  node.on('billing-plan-update').then(':safe').trap(true, ':describe-error')
    .then(function ({ payload: { planId, update }, config }, callback) {
      return paypal.billingPlan.update(planId, update, config, callback);
    }).end();

  node.on('billing-plan-activate')
    .then( ':billing-plan-update'
         , { planId: '$:@'
           , update: [ { op: 'replace', path: '/', value: { state: 'ACTIVE' } } ]
           }
         )
    .end();

};
