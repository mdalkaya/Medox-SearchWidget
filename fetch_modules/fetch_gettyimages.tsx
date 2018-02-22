import * as React from "react";
import { Menu, Icon, Loader } from "semantic-ui-react";
import {CardExpandable} from "./index"
export function execute_fetch(query, page) {

	var restURL =
	  "https://api.gettyimages.com/v3/search/images?fields=detail_set&page_size=20&page="+
	  page+
	  "&phrase=" +
	  query;
	
		
	return fetch(restURL, {
	  method: "GET",
	  headers: {
		"Api-Key": '7kernhhu7dphy369eur8kv56',
		"Accept-Language": 'en'
		// "Authorization": 'YmyCVsjgCKmbeGymBeZFYMxkDAMzdM934Wv3dtNrufvbv'
  
	  }
	}).then((response) => response.json())
	  .then((responseData) => {
	//	console.log(JSON.stringify(responseData));
	
				return	[responseData.result_count, <CardBuilder resultJSON={responseData} />]
		
	
	  })
	  .catch(error => console.warn(error));
	}

	interface PropsCardBuilder {
   
		resultJSON : any;

		
	}
	

export 	class CardBuilder extends React.Component<PropsCardBuilder> {

    constructor(props) {
			super(props);
		var myCounter = 2323;

      this.state = {
			resultCount: this.props["resultJSON"].result_count
							 };
							
		}
		

		render() {
      return  (
	/*			this.setState({
					resultCount: data.result_count + " results"
				});*/

		<div>
 		
			{this.props["resultJSON"].images.length ? (
				this.props["resultJSON"].images.map(item => (
			
					<div
						key={item.id}
						style={{
							marginTop: "4px",
							marginRight: "5px",
							marginLeft: "1px"
						}}>

						<CardExpandable
					
							iconName="image"
							iconColor="blue"
							image={item.display_sizes[0].uri}
							description={item.caption}
							title={item.title}
							href={item.display_sizes[0].uri}
							cardexp_itemJSON={item}
							DRAG_AND_DROP_STRING={
								"<mos><mosID>DIRA.DEMO.AUDIO.MOS</mosID>" +
								"<objID>" +
								item.id +
								"</objID>" +
								"<objSlug>" +
								item.title +
								"</objSlug>" +
								"<objTB>48000</objTB> <objDur>497664</objDur>" +
								"<mosAbstract>" +
								item.description +
								"</mosAbstract></mos>"
							}
							target="_blank"
							meta={
								<span>
									<Icon name="tag" />
									{item.allowed_use.how_can_i_use_it}
									<Icon name="clock" />
								
								</span>
												}
												/>
											</div>
										))
									) : (
										<Loader active />
									)}
								</div>
							);
						}
					}


				