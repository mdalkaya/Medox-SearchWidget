import * as React from "react";
import TimeAgo from 'javascript-time-ago';
import { Item, Menu, Icon, Loader } from "semantic-ui-react";
import {CardExpandable} from "./index"
import { userInfo } from "os";
/*export function execute_fetch(query, page) {


	  var medox_access_token = get_token();

	  console.log("Token : " + medox_access_token);
	  var searchURL =
		  "https://demo.medox.scisys.de:8443/dira6/api/v10/search/contentItems";
  
	  return fetch(searchURL, {
		  method: "POST",
		  headers: {
			  Authorization: "Bearer " + medox_access_token,
			  Accept: "application/json",
			  "Content-Type": "application/json",
		  
		  },
		  body: JSON.stringify({
			  query: {
				  bool: {
					  must: [{ index: { meta: query + " " } }],
					  filter: [{ term: { status: "valid" } }]
				  }
			  },
			  from: 1,
			  size: 20,
			  sort: [{ modTime: { order: "desc" } }]
		  })
	  })
		  .then(response => response.json())
		  .then(responseData => {
			alert(JSON.stringify(responseData));
			return	[0, <CardBuilder resultJSON={responseData} />];
		

		  })
		  .catch(error => console.warn(error));





	}
	function get_token() {
		var today = new Date();
	
		if (
			localStorage.getItem("medox_access_token") === null ||
			Date.parse(localStorage.getItem("medox_access_token_expiry_date")) < today.getTime()
		) {
			return new_token();
		} else {
			return localStorage.getItem("medox_access_token");
		}
	}
	
	function new_token() {
		console.log("start new token 1");
		var user = "annova";
		var password = "Medox124";
		var loginURL = "https://demo.medox.scisys.de:8443/dira6/auth/v10/login";
		var tok = user + ":" + password;
		var hash = btoa(tok);
		var today = new Date();
		fetch(loginURL, {
			method: "GET",
			headers: {
				Authorization: "Basic " + hash,
				Accept: "application/json"
			}
		})
			.then(response => response.json())
			.then(responseData => {
				console.log("start new token 2");
				localStorage.setItem("medox_access_token", responseData.access_token);
				var expiryDateTimeMS = today.getTime() + responseData.expires_in * 1000;
				localStorage.setItem("medox_access_token_expiry_date", expiryDateTimeMS.toString());
				console.log(responseData.access_token);
				return responseData.access_token;
			});
	}
*/
export function fetch_medox(query, page) {


	var tokenpromise = new Promise(function (resolve, reject) {
	  var user = "annova";
	  var password = "Medox124";
	  var loginURL = "https://demo.medox.scisys.de:8443/dira6/auth/v10/login";
	  var tok = user + ":" + password;
	  var hash = btoa(tok);
	  var today = new Date();
  
  
	  if (
		localStorage.getItem("medox_access_token") === null 
	  ) {
		fetch(loginURL, {
		  method: "GET",
		  headers: {
			Authorization: "Basic " + hash,
			Accept: "application/json"
		  }
		}).then(response => response.json())
		  .then(data => {
			localStorage.setItem("medox_access_token", data.access_token);
			var expiryDateTimeMS = today.getTime() + data.expires_in * 1000;
			localStorage.setItem("medox_access_token_expiry_date", expiryDateTimeMS.toString());
			resolve(data.access_token)
			
		  })
	  }else{
		resolve(localStorage.getItem("medox_access_token"));
  
	  }
	});
  
  //one we have a valid token, we actually execute the fetch
	return tokenpromise.then(function (token) {
	  console.log(token);
	  var searchURL =
		"https://demo.medox.scisys.de:8443/dira6/api/v10/search/contentItems";
  
	  return fetch(searchURL, {
		method: "POST",
		headers: {
		  Authorization: "Bearer " + token,
		  Accept: "application/json",
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({
		  query: {
			bool: {
			  must: [{ index: { meta: query + " " } }],
			  filter: [{ term: { status: "valid" } }]
			}
		  },
		  from: 1,
		  size: 20,
		  sort: [{ modTime: { order: "desc" } }]
		})
	  })
		.then(response => response.json())
		.then(responseData => {
		  //console.log(responseData);
  
		  TimeAgo.locale('en');
		  const timeAgo = new TimeAgo('en-US');
  
		  var len = responseData.contentItems.length,
			//newData = { resultCount: responseData.count, items: [] },
			newData = { resultCount: responseData.count, items: [] },
			i;
		  //console.log(len);
		
		  //Loop through the source JSON and format it into the standard format
		  for (i = 0; i < len; i += 1) {
  
			newData.items.push({
			  id: responseData.contentItems[i]._id,
			  key: responseData.contentItems[i]._id,
			  rawItem: responseData.contentItems[i],
			  title: responseData.contentItems[i].mainTitle,
			  open_url: "https://demo.medox.scisys.de:8443/",
			  description:
			  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  
			  target: "_blank",
			  iconName: responseData.contentItems[i].hasOwnProperty("images")
				? "image"
				: responseData.contentItems[i].hasOwnProperty("videos")
				  ? "film"
				  : "volume up",
			  iconColor: responseData.contentItems[i].hasOwnProperty("images")
				? "green"
				: responseData.contentItems[i].hasOwnProperty("videos")
				  ? "blue"
				  : "red",
			  mediaType: responseData.contentItems[i].hasOwnProperty("images")
				? "image"
				: responseData.contentItems[i].hasOwnProperty("videos")
				  ? "video"
				  : "audio",
  
			  thumbnail: responseData.contentItems[i].hasOwnProperty("images")
				? responseData.contentItems[i].images[0].variants[0].url
				: responseData.contentItems[i].hasOwnProperty("videos")
				  ? "https://react.semantic-ui.com/assets/images/image-16by9.png"
				  : null,
			  highres: responseData.contentItems[i].hasOwnProperty("images")
				? responseData.contentItems[i].images[0].variants[0].url
				: responseData.contentItems[i].hasOwnProperty("videos")
				  ? responseData.contentItems[i].videos[0].variants[0].url
				  : responseData.contentItems[i].audios[0].variants[1].url,
  
			  dragAndDropString:
			  "<mos><mosID>DIRA.DEMO.AUDIO.MOS</mosID>" +
			  "<objID>" +
			  responseData.contentItems[i]._id +
			  "</objID>" +
			  "<objSlug>" +
			  responseData.contentItems[i].mainTitle +
			  "</objSlug>" +
			  "<objTB>48000</objTB> <objDur>497664</objDur>" +
			  "<mosAbstract>" +
			  responseData.contentItems[i].mainType.displayName +
			  "</mosAbstract></mos>",
			  meta: responseData.contentItems[i].mainType.displayName +
			  "&nbsp;&middot;&nbsp" +
			  responseData.contentItems[i].creaUser +
			  "&nbsp;&middot;&nbsp" +
			  timeAgo.format(new Date(responseData.contentItems[i].creaTime)),
  
			});
		  }
		  //console.log(JSON.stringify(newData));
		  return newData;
		})
		.catch(error => console.warn(error));
	});
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


				