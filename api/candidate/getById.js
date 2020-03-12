const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getById(event) {
  const params = {
    TableName: process.env.CANDIDATE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  const candidate = await dynamoDb.get(params).promise();
  const response = {
    statusCode: 200,
    body: JSON.stringify(candidate.Item),
  };
  return response;
};

module.exports.getById = getById;