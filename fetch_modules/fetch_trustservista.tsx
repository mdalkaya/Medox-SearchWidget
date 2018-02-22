import * as React from "react";
import { Menu } from "semantic-ui-react";
export function execute_fetch(query, page) {

	var restURL =
	  "https://trust.servista.eu/api/rest/v2/topstories";
  
	return fetch(restURL, {
	  method: "GET",
	  headers: {
			"X-TRUS-API-Key": '4b12ed953cdf42c71ea778c63be0e226',
			"Content-Type": 'application/json',
			"Accept": "application/json",
			"Cache-Control": "no-cache",
			"{interval": "1 }"
			
	  }
	}).then((response) => response.json())
	  .then((responseData) => {
		console.warn(responseData);
		return responseData;
	  })
	  .catch(error => console.warn(error));
  }