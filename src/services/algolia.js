import algoliasearch from 'algoliasearch';

const client = algoliasearch('E57QU1TXIA', '729c6a030893ca8a2c2fa00cd0fc7c41');
const index = client.initIndex('users');

export default index;
