export default async (request, response) => {
  const apiUrl = 'http://192.168.10.10:8443/transaction/insert';

  try {
    console.log(JSON.stringify(request.body));

    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    if (!fetchResponse.ok) {
      console.log('Response is not ok.');
      const errorMessage = await fetchResponse.text();
      response.status(400).json({ error: errorMessage });
      return;
    }

    const data = await fetchResponse.json();
    console.log('Data added to the database:', data);
    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

  console.log('End of add.');
};
