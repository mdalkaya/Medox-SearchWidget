import merge from 'lodash/merge'
import * as React from "react";

import { Item, Menu, Icon, Loader } from "semantic-ui-react";
import {CardExpandable} from "./index"
// fetchJSON is bundled wrapper around fetch which simplifies working
// with JSON API:
//   * Automatically adds Content-Type: application/json to request headers
//   * Parses response as JSON when Content-Type: application/json header is
//     present in response headers
//   * Converts non-ok responses to errors
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'
 


const fetchJSONWithToken = (query, pagetofetch, options = {}) => {
    const token = localStorage.getItem("medox_access_token");
     let optionsWithToken = options
    if (token != null) {
      optionsWithToken = merge({}, options, {
        method: "POST",		
        headers: {
          Authorization: "Bearer " + localStorage.getItem("medox_access_token")
        },
        body: JSON.stringify({
            query: {
                bool: {
                    must: [{ index: { meta: + query + " " } }],
                    filter: [{ term: { status: "valid" } }]
                }
            },
            from: 1,
            size: 20,
            sort: [{ modTime: { order: "desc" } }]
        })
      })
    }
  // console.log(optionsWithToken);
    return fetchJSON("https://demo.medox.scisys.de:8443/dira6/api/v10/search/contentItems", optionsWithToken)
    .then(responseData => {
      alert(JSON.stringify(responseData));
      return	[0, <CardBuilder resultJSON={responseData} />];
  

    })
    .catch(error => console.warn(error));
  }




	interface PropsCardBuilder {
   
		resultJSON : any;

		
	}
	

export class CardBuilder extends React.Component<PropsCardBuilder> {

    constructor(props) {
			super(props);
		var myCounter = 2323;

      this.state = {
		loadingresults: true,
			resultCount: this.props["resultJSON"].count
							 };
							
		}
		

		render() {
      return  (
	/*			this.setState({
					resultCount: data.result_count + " results"
				});*/

				<Item.Group unstackable divided>
						{true ? (
							this.props["resultJSON"].contentItems.map(item => (
								<CardExpandable
								href=""
								cardexp_itemJSON={item}
									key={item._id}
								
									iconName="image"
									iconColor=""
									mediaType={
										item.hasOwnProperty("images") ? (
											"image"
										) : item.hasOwnProperty("videos") ? (
											"video"
										) : (
											"audio"
										)
									}
									image={
										item.hasOwnProperty("images") ? (
											item.images[0].variants[0].url
										) : null
									}
									video={
										item.hasOwnProperty("videos") ? (
											item.videos[0].variants[0].url
										) : null
									}
									audio={
										item.hasOwnProperty("audios") ? (
											item.audios[0].variants[1].url
										) : null
									}
									description="there should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrerthere should be a long description hrer"
									title={item.mainTitle}
									//href={item.audios[0].variants[0].url}
									DRAG_AND_DROP_STRING={
										"<mos><mosID>DIRA.DEMO.AUDIO.MOS</mosID>" +
										"<objID>" +
										item._id +
										"</objID>" +
										"<objSlug>" +
										item.mainTitle +
										"</objSlug>" +
										"<objTB>48000</objTB> <objDur>497664</objDur>" +
										"<mosAbstract>" +
										item.mainType.displayName +
										"</mosAbstract></mos>"
									}
									target="_blank"
									meta={
										<span>
											{item.mainType.displayName}
											&nbsp; &middot; &nbsp;
										
										</span>
									}
								/>
							))
						) : (
							<Loader active />
						)}
					</Item.Group>
							);
						}
					}


				


 
  
  // Decide whether this error returned from API means that we want
  // to try refreshing the token. error.response contains the fetch Response
  // object, error.body contains the parsed JSON response body
  const shouldRefreshToken = error =>  true
  //error.response.status === 401 &&
 // error.body.message === 'Unauthorized'


  // Do the actual token refreshing and update the saved token
  const refreshToken = () => {
    var user = "annova";
	var pass = "Medox124";
	var loginURL = "https://demo.medox.scisys.de:8443/dira6/auth/v10/login";
	var tok = user + ":" + pass;
	var hash = btoa(tok);
	var today = new Date();	
	return fetchJSONWithToken('https://demo.medox.scisys.de:8443/dira6/auth/v10/login', {
	  method: 'GET',
	  headers:{
		Authorization: "Basic " + hash,
				Accept: "application/json"
	  }
	})
	  .then(response => {
		
		localStorage.setItem("medox_access_token", response.body.access_token);
//		saveToken(response.body.token)
	  })
      .catch(error => {
        // If we failed by any reason in refreshing, just clear the token,
        // it's not that big of a deal
        localStorage.setItem("medox_access_token", null);
        throw error
      })
  }
  
  export const fetch = configureRefreshFetch({
    shouldRefreshToken,
    refreshToken,
    fetch: fetchJSONWithToken,
  })