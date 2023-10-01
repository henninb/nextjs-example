export default (_request, response) => {
  // Replace with your actual data source or database query
  const data = [

    {
        "accountId": 1057,
        "accountNameOwner": "amazon_brian",
        "accountType": "debit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1969-12-31T18:00:00.000-06:00"
    },
    {
        "accountId": 1001,
        "accountNameOwner": "amazon-store_brian",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1023,
        "accountNameOwner": "amex_brian",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": -1.00,
        "future": 0.00,
        "cleared": 270.19,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1127,
        "accountNameOwner": "amex-delta_kari",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": -1.00,
        "future": 0.00,
        "cleared": 1845.18,
        "dateClosed": "1969-12-31T18:00:00.000-06:00"
    },
    {
        "accountId": 1025,
        "accountNameOwner": "amex_kari",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1026,
        "accountNameOwner": "amex-newegg_brian",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1029,
        "accountNameOwner": "barclay-cash_brian",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1024,
        "accountNameOwner": "barclay-cash_kari",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1011,
        "accountNameOwner": "barclays_brian",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },
    {
        "accountId": 1027,
        "accountNameOwner": "barclays_kari",
        "accountType": "credit",
        "activeStatus": true,
        "moniker": "0000",
        "outstanding": 0.00,
        "future": 0.00,
        "cleared": 0.00,
        "dateClosed": "1970-01-01T00:00:00.000-06:00"
    },


  ];

  response.status(200).json(data);
};

