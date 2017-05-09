import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('subscription-create')
    .as({ plan: '$:@' })
    .then(':billing-plan-create', '$:plan').merge('plan')
    .then(':billing-plan-activate', '$:plan.id').merge('plan_update')
    .then(':billing-agreement-attributes-from-plan', '$:plan').merge('agreement')
    .then(':billing-agreement-create', '$:agreement').merge('agreement')
    .end();

};
