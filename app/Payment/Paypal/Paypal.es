import invoice          from './Paypal.Invoice';
import order            from './Paypal.Order';
import subscription     from './Paypal.Subscription';
import billingPlan      from './Paypal.BillingPlan';
import billingAgreement from './Paypal.BillingAgreement';

export default function (node, logger) {

  void order(node, logger);
  void invoice(node, logger);
  void subscription(node, logger);
  void billingPlan(node, logger);
  void billingAgreement(node, logger);

};
