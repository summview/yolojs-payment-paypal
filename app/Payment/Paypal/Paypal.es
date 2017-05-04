import paypal from 'paypal-rest-sdk';

export default function (node, logger) {

  node.on('-start', function (node) {
    paypal.configure( { client_id: node.get('client_id')
                      , client_secret: node.get('client_secret')
                      , mode: node.get('mode') || 'production'
                      }
                    );
    return node;
  });

  node.on('http-get-transaction')
    .end();

  node.on('http-post-receipt')
    .end();

};
