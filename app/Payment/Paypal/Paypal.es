/*!UroxGvT3uDMQCT1va20i43ZZSxo*/
import invoice          from './Paypal.Invoice';
import order            from './Paypal.Order';
import subscription     from './Paypal.Subscription';
import billingPlan      from './Paypal.BillingPlan';
import billingAgreement from './Paypal.BillingAgreement';

export default function (node, logger) {

  node.on('safe', function (payload) {
    const config = this.node.get(['client_id', 'client_secret', 'mode']);
    if (config.mode == null) config.mode = 'sandbox';
    return { payload, config };
  });

  node.on('describe-error', function (failure) {
    const name = Yolo.Util.getIn(failure, 'error.name');
    const details = Yolo.Util.getIn(failure, 'error.response.details');
    const description = Yolo.Util.getIn(failure, 'error.response.error_description');
    const link = Yolo.Util.getIn(failure, 'error.response.information_link');
    if (details != null) {
      for (let i = 0; i < details.length; i++)
        logger.error('%s failed with %s', this.node.cwd(), details[i].issue);
    } else if (description != null) {
      logger.error('%s failed with %s', this.node.cwd(), description);
    }
    if (link != null)
      logger.error('Information link: %s', link);
    throw failure.error;
  });

  void order(node, logger);
  void invoice(node, logger);
  void subscription(node, logger);
  void billingPlan(node, logger);
  void billingAgreement(node, logger);

};
