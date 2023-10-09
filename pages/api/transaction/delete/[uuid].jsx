export default async (request, response) => {
  const apiUrl = 'http://192.168.10.10:8443/transaction/delete';

  try {
    //console.log(JSON.stringify(request.body));
    const uuid = request.url.split('/').pop();

    console.log(uuid);

    const fetchResponse = await fetch(`apiUrl/$uuid`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(request.body),
    });

    if (!fetchResponse.ok) {
      console.log('Response is not ok.');
      const errorMessage = await fetchResponse.text();
      response.status(400).json({ error: errorMessage });
      return;
    }

    const data = await fetchResponse.json();
    console.log('Data deleted from the database:', data);
    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

  console.log('End of delete.');
};
