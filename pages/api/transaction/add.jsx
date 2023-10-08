export default async(request, response) => {

 const apiUrl = 'http://192.168.10.10:8443/transaction/insert';
    if (request.url.startsWith('/api/transaction')) {

      try {

      console.log(JSON.stringify(request.body))

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response.json())
            //response.status(400)
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response from the server
          console.log('Data added to the database:', data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error:', error);
        });

        response.status(200)

      } catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      response.status(404).json({ error: 'Not Found' });
    }

};

