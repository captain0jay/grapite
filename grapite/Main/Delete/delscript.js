async function deletescript(){
    
    const endpoint = 'http://127.0.0.1:4000/graphql';

    const query = `
        query RequestCollection {
            requestCollection(first: 1){ 
                edges {
                    node{
                        id
                        name
                        publishedAt
                        Expiry
                    }
                }
            }
        }
    `;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here
        },
        body: JSON.stringify({ query }),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    return data;
    })
    .catch(error => {
    console.error('Error:', error);
    });

    const requestEdges = response.data.requestCollection.edges;

    for (const edge of requestEdges) {
    const requestNode = edge.node;
    const publishedAt = requestNode.publishedAt;
    const Expiry = requestNode.Expiry;
    if (publishedAt) {
        const currentTime = new Date();
        const thresholdTime = new Date(currentTime - (Expiry * 1000));
        if(publishedAt<thresholdTime){
            const mutation = `
            mutation RequestDelete {
                requestDelete(id: $id) {
                    deletedId
                }
            }
            `;

            const variables = {
            id: requestNode.id
            };

            const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary authorization headers here
            },
            body: JSON.stringify({ query: mutation, variables }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
            });

            console.log("Request ",requestNode.name,"Expired");
        }
    } else {
    }
    }
}

module.exports = {deletescript}