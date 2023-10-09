export default async(request, response) => {

 const apiUrl = 'http://192.168.10.10:8443/transaction/insert';

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
        console.log('response is not ok.')
        //console.log(response.json())
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the server
      console.log('Data added to the database:', data);
      response.status(200).json(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });

    //response.status(200);

  } catch (error) {
    console.log("error fetching")
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

  console.log('end of add.')

};

