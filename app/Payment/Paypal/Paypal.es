import paypal from 'paypal-rest-sdk';

import invoice from './Paypal.Invoice';
import order from './Paypal.Order';
import subscription from './Paypal.Subscription';
import billingPlan from './Paypal.BillingPlan';
import billingAgreement from './Paypal.BillingAgreement';

export default function (node, logger) {

  node.on('http-post-subscription-create')
    .then(':billing-plan-create', '$:body').merge('plan')
    .then(':billing-plan-activate', '$:plan.id').merge('plan_update')
    .as({ type: 'json', data: { source: '$:body', plan: '$:plan' } })
    .end();

/*************************/

  void order(node, logger);
  void invoice(node, logger);
  void subscription(node, logger);
  void billingPlan(node, logger);
  void billingAgreement(node, logger);

};
