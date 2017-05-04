export default function (node, logger) {

  node.on('http-get-transaction').end();

  node.on('http-post-receipt')
  
    .end();

};
