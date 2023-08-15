async function check(namet, jason) {
  const endpoint = 'http://127.0.0.1:4000/graphql';

  const query = `
    query Request($name: String!) {
      request(by: { name: $name }) {
        name
        body
        response
      }
    }
  `;

  const variables = {
    name: namet,
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any necessary authorization headers here
    },
    body: JSON.stringify({ query, variables }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });

  let answer
  if(response.data.request!=null){
    answer=response;
    console.log("done")
  }else{
    answer=response.data.request;
    console.log("done",answer)
  }
  return answer;
}

module.exports = { check };
