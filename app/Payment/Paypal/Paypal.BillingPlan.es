import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  const cancel_url = 'http://example.com/cancel';
  const return_url = 'http://example.com/success';

  const billingPlanAttributes =
    { name: 'monthly subscription'
    , description: 'Create Plan for monthly subscription'
    , merchant_preferences:
      { auto_bill_amount: 'yes'
      , initial_fail_amount_action: "continue"
      , max_fail_attempts: 1
      , cancel_url: cancel_url
      , return_url: return_url
      }
    , payment_definitions:
      [ { name: 'regular'
        , amount: { value: '4.99', currency: 'USD' }
        , cycles: 0
        , frequency: 'MONTH'
        , frequency_interval: 1
        , type: 'REGULAR'
        }
      ]
    , type: 'INFINITE'
    };

  node.on('billing-plan-create', function (flow, callback) {
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
