export default async(request, response) => {
  // Replace with your actual data source or database query
  const data1 = [
      {
    "transactionId": 22754,
    "guid": "023ccd6f-1306-4746-a467-c40855fa2428",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-10-17",
    "description": "citi",
    "category": "online",
    "amount": 7.50,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime",
    "notes": "mynote"
  },
  {
    "transactionId": 22726,
    "guid": "2d405559-76ab-41df-8ab9-138cf182a987",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-10-16",
    "description": "amazon.com",
    "category": "online",
    "amount": 15.93,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22729,
    "guid": "d22f6378-6755-4c0c-8705-8f5348bbee1b",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-10-15",
    "description": "discover",
    "category": "online",
    "amount": 1.99,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22639,
    "guid": "b68200f5-8a44-4df7-b7d7-9bce70a1c768",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-25",
    "description": "amazon.com",
    "category": "online",
    "amount": -40.36,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22626,
    "guid": "3ffdfcd2-32e5-4600-9a87-5c4ab4997d07",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-22",
    "description": "citi",
    "category": "online",
    "amount": 5.00,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22533,
    "guid": "86073ce0-5d4a-45dd-b466-53017fe7fe37",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-20",
    "description": "discover",
    "category": "online",
    "amount": 1.99,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime",
    "notes": "mynote"
  },
  {
    "transactionId": 22578,
    "guid": "1e362d58-51aa-4179-ac43-63c8939d232a",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-17",
    "description": "citi",
    "category": "online",
    "amount": 3.00,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22577,
    "guid": "5cd1a9dc-4bc3-4ffb-913a-1d53ea67c1a1",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-17",
    "description": "amazon.com",
    "category": "online",
    "amount": 0.50,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime",
    "notes": "mynote"
  },
  {
    "transactionId": 22607,
    "guid": "87046ace-a657-4bce-b5b9-2f8c1ee68cc0",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-17",
    "description": "citi",
    "category": "online",
    "amount": 4.51,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
  {
    "transactionId": 22607,
    "guid": "87046ace-a657-4bce-b5b9-2f8c1ee68cb9",
    "accountId": 1057,
    "accountType": "debit",
    "transactionType": "undefined",
    "accountNameOwner": "amazon_brian",
    "transactionDate": "2020-09-17",
    "description": "citi",
    "category": "online",
    "amount": 4.50,
    "transactionState": "cleared",
    "activeStatus": true,
    "reoccurringType": "onetime"
  },
    {
      transactionId: 22541,
      guid: '5290e755-db72-41d3-894e-cdd260a2d7b3',
      accountId: 1057,
      accountType: 'debit',
      transactionType: 'undefined',
      accountNameOwner: 'amazon_brian',
      transactionDate: '2020-09-07',
      description: 'citi',
      category: 'online',
      amount: 3.00,
      transactionState: 'cleared',
      activeStatus: true,
      reoccurringType: 'onetime',
    },
    {
      transactionId: 22543,
      guid: '5290e755-db72-41d3-894e-cdd260a2d7b4',
      accountId: 1057,
      accountType: 'debit',
      transactionType: 'undefined',
      accountNameOwner: 'amazon_brian',
      transactionDate: '2020-09-07',
      description: 'my description',
      category: 'online',
      amount: 4.00,
      transactionState: 'cleared',
      activeStatus: true,
      reoccurringType: 'onetime',
    },
  ];


  const { account } = request.query;
    //if (request.url === '/api/transactions') {
    if (request.url.startsWith('/api/transactions')) {

      try {
        // Make the fetch request to your API
        //const apiUrl = `http://192.168.10.10:8443/transaction/account/select/${account}`;
        const apiUrl = `http://192.168.10.10:8443/transaction/account/select/chase-amazon_brian`;
        const data = await fetch(apiUrl).then((response) => response.json());
  
        // Return the fetched data as the response
        response.status(200).json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      }


  //     // Handle the /api/transactions route here
  //     // You can access the 'account' parameter and perform actions based on it

  //     fetch(`http://192.168.10.10:8443/transaction/account/select/amazon_brian`)
  // //fetch(`/api/transactions/`)
  // .then((response) => response.json())
  // //.then((data) => setData(data))
  // .catch((error) => console.error('Error fetching data:', error));

  //     //curl http://192.168.10.10:8443/transaction/account/select/amazon_brian

  //     //response.status(200).json({ account });
  //     response.status(200).json(data);
    } else {
      response.status(404).json({ error: 'Not Found' });
    }

};

