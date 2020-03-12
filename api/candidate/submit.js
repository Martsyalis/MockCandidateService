const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function submit (event) {
  try {
    const requestBody = JSON.parse(event.body);
    const fullname = requestBody.fullname;
    const email = requestBody.email;
    const experience = requestBody.experience;

    if (typeof fullname !== 'string' || typeof email !== 'string' || typeof experience !== 'number') {
      return {
        statusCode: 412,
        body: JSON.stringify({
          message: `Candidate info failed validation`
        })
      }
    }

    const submitCandidateP = async candidate => {
      const candidateInfo = {
        TableName: process.env.CANDIDATE_TABLE,
        Item: candidate,
      };
      await dynamoDb.put(candidateInfo).promise()
      return candidate
    };
    
    const candidateInfo = (fullname, email, experience) => {
      const timestamp = new Date().getTime();
      return {
        id: uuid.v1(),
        fullname: fullname,
        email: email,
        experience: experience,
        submittedAt: timestamp,
        updatedAt: timestamp,
      };
    };

    const newCandidate = await submitCandidateP(candidateInfo(fullname, email, experience));

    return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Sucessfully submitted candidate with email ${email}`,
          candidateId: newCandidate.id
        })
    }
  } 
  catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to submit candidate with email ${email}`
      })
    }
  }
}

module.exports.submit = submit;