import * as React from "react";
import { Menu } from "semantic-ui-react";
export function execute_fetch(query, page) {
 
	var restURL = "https://api.newswhip.com/v1/region/U.S./Politics/24?key=Tt7S2WdjCabLU?origin=http://localhost";

	
	return fetch(restURL, {
	  method: "GET",
	  headers: {
		'Content-Type': 'application/xml',
		'Accept': 'application/xml'
		// "Authorization": 'YmyCVsjgCKmbeGymBeZFYMxkDAMzdM934Wv3dtNrufvbv'
  
	  }
	}).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  })
}
