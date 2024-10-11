# CryptoTracker
A server side application providing information about the prices, market cap, and 24h change of bitcoin, ethereum, and matic-network.

Two api endpoints have been built:

1) '/api/stats' : return the latest data about the requested cryptocurrency (price in usd, market cap and 24h change)

- Request params

{
	coin: `bitcoin` // Could be one of the above 3 coins
}

- Response

{
	price: 40000,
	marketCap: 800000000,
	"24hChange": 3.4
}
   
3) '/api/deviation' : that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

- Request params

{
	coin: `ethereum` // Could be one of the above 3 coins
}

- Response

{
	deviation: 4082.48
}


DATABASE HAS BEEN DEPLOYED ON MongoDB ATLAS
   
