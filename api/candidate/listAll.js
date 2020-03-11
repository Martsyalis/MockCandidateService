const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function listAll(event) {
  var params = {
    TableName: process.env.CANDIDATE_TABLE,
    ProjectionExpression: 'id, fullname, email',
  };
  const candidates = await dynamoDb.scan(params).promise();
  console.log('candidates: ', candidates);
  return {
    statusCode: 200,
    body: JSON.stringify({
      candidates: candidates.Items,
    }),
  };
}

module.exports.listAll = listAll;
