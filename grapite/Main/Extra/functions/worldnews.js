const { check } = require("./Universal/check")

async function worldnews(name,body) {
    const cachethere = await check("worldnews",body)
    console.log(cachethere)
    // Perform processing using parameters
    let answer
    if(cachethere!=null){
        answer=cachethere;
    }else{
        console.log("user created function goes here...")

        //Here goes code of user and when response is got sent to grafbase
        def = {"name":"default","response":"def"}

        //posting on grafbase
        const endpoint = 'http://127.0.0.1:4000/graphql';
        const mutation = `
        mutation RequestCreate{
            requestCreate(input: { name: "${name}", body: "${body}", response:"${def}"}) {
              request {
                id
              }
            }
          }
          `
        await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any necessary authorization headers here
        },
        body: JSON.stringify({ query: mutation }),
        })
        .then(response => response.json())
        .then(data => {
            const postId = data.data.postCreate.post.id;
            console.log('New Post ID:', postId);
            console.log('Success:',data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        //returning user the response
        answer=def;      
    }
    console.log("answer",answer)
    return answer
}

module.exports = worldnews;