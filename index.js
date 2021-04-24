'use strict';

const personModel = require('./schema.js');

exports.handler = async (event) => {

  console.log(JSON.stringify(event, undefined, 2));
  try {
    const id = event.pathParameters && event.pathParameters.id;

    let data;

    if(id) {
      const list = await personModel.query('id').eq(id).exec();
      data = list[0];
    } else {
      data = await personModel.scan().exec();
    }
    let result = JSON.stringify(data);

    return {
      statusCode: 200,
      body: result,
    };

  } catch (e) {
    return{
      statusCode: 500,
      body: e.message
    }
  }

}