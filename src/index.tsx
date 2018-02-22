import * as React from "react";
import * as ReactDOM from "react-dom";
import { Card, Item, Image, Icon, Modal, Form, Menu, Checkbox, Input, Loader, Button, Dropdown, Divider, Sidebar, Label, Segment, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import { fetch_medox } from "./fetch_medox";
import { CardsCornerPopup, ModalViewButtons } from "./actions";
import registerServiceWorker from "./registerServiceWorker";



  interface Props_CardExp {
   key: any;
		iconName: any;
		iconColor: any;
		image: string;
		cardexp_itemJSON: any;
		mediaType: any;
		DRAG_AND_DROP_STRING: any;
		description: string;
		title: string;
		href: string;
		video: any;
		audio: any;
		target: string;
		meta: any;
		
}



export class CardExpandable extends React.Component<Props_CardExp>{

	constructor(props: any) {
	  super(props);
	
	  this.handleExpand = this.handleExpand.bind(this);
	  this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleDrag = this.handleDrag.bind(this);

  
	  this.state = {
		expanded: false,
		expandIcon: "chevron down",
		descriptionWhiteSpace: "nowrap",
		descriptionOverflow: "hidden",
		descriptionTextOverflow: "ellipsis",
		isHovered: "none",
		cardexp_itemJSON: ""
	  };
	}

	
	handleExpand(e: any) {
	  e.preventDefault();
	  if (this.state["expanded"] == false) {
		this.setState({
		  expanded: true,
		  expandIcon: "chevron up",
		  descriptionWhiteSpace: "",
		  descriptionOverflow: "",
		  descriptionTextOverflow: ""
		});
	  } else {
		this.setState({
		  expanded: false,
		  expandIcon: "chevron down",
		  descriptionWhiteSpace: "nowrap",
		  descriptionOverflow: "hidden",
		  descriptionTextOverflow: "ellipsis"
		});
	  }
	}
	handleDrag(e: any) {
		e.dataTransfer.setData("text", this.props["DRAG_AND_DROP_STRING"]);
		console.log(this.props["DRAG_AND_DROP_STRING"]);
	}
	handleMouseEnter(e: any) {
	  this.setState({
		isHovered: ""
	  });
	}
	handleMouseLeave(e: any) {
	  this.setState({
		isHovered: "none"
	  });
	}
  
	
  
	render() {
			let itemImage = null;
		let mediaTag = null;
		let iconNode = null;

		if (this.props.mediaType == "image") {
			itemImage = (
				<Item.Image
					src={this.props.image}
					size="tiny"
					style={{
						textAlign: "center",
						cursor: "zoom-in"
					}}
				/>
			);
			mediaTag = <Image src={this.props.image} />;
			iconNode = <Icon name="image" />;
		}
		if (this.props.mediaType == "video") {
			itemImage = (
				<Item.Image
					size="tiny"
					style={{ textAlign: "center", cursor: "zoom-in" }}>
					<Icon.Group size="big">
						<Icon name="film" color="blue" />
						<Icon corner name="play" />
					</Icon.Group>
				</Item.Image>
			);
			mediaTag = (
				<video width="100%" autoPlay controls>
					<source src={this.props.video} type="video/mp4" />
					Your browser does not support HTML5 video.
				</video>
			);
			iconNode = <Icon name="film" />;
		}
		if (this.props.mediaType == "audio") {
			itemImage = (
				<Item.Image
					size="tiny"
					style={{ textAlign: "center", cursor: "zoom-in" }}>
					<Icon.Group size="big">
						<Icon name="volume up" color="red" />
						<Icon corner name="play" />
					</Icon.Group>
				</Item.Image>
			);
			mediaTag = (
				<audio  autoPlay controls>
					<source src={this.props.audio} type="video/mp4" />
					Your browser does not support HTML5 audio.
				</audio>
			);
			iconNode = <Icon name="volume up" />;
		}
		return (
		
					<Card
						onClick={e => e.preventDefault()}
						fluid
						centered
						draggable="true"
						onDragStart={this.handleDrag}
						href={this.props["href"]}
						color={this.props["color"]}
						target={this.props["target"]}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}
						style={{ margin: "3px" }}>
						<Modal closeIcon="close" trigger={itemImage} size="small">
					<Modal.Header>{this.props.title}</Modal.Header>
					<Modal.Content scrolling>{mediaTag}</Modal.Content>

					<ModalViewButtons cardexp_itemJSON={this.props["cardexp_itemJSON"]}/>

				</Modal>

						<Card.Content>
						
						<div style={{ position:"absolute", right:"10px",display: this.state["isHovered"] }}>
						<CardsCornerPopup cardexp_itemJSON={this.props["cardexp_itemJSON"]} />
					</div>
						
							<strong>
							{iconNode}
							{this.props["title"]}
							</strong>

							<Card.Meta>{this.props["meta"]}</Card.Meta>
							<Card.Description
								style={{
									whiteSpace: this.state["descriptionWhiteSpace"],
									overflow: this.state["descriptionOverflow"],
									textOverflow: this.state["descriptionTextOverflow"],
									textAlign: "justify"
								}}>
								{this.props["description"]}
								<div style={{ position: "absolute", right: "5px", display: this.state["isHovered"] }}>
							<Icon
								name={this.state["expandIcon"]}
								link
								onClick={this.handleExpand}
								
							/>
					</div>
							</Card.Description>
						</Card.Content>

						<Icon
							name={this.state["expandIcon"]}
							link
							onClick={this.handleExpand}
							style={{
								position: "absolute",
								right: "5px",
								bottom: "20px",
								display: this.state["isHovered"]
							}}
						/>
					</Card>
			
			






				
	
		);
	}
  }

  interface Props2 {
	
	style: any;

	
}
interface MyComponentState2 { 
	dimmerActive :  boolean 
	searchSideBarVisible: any
	keepOpened: any,
	filtersHaveChanged: any,
	filterButtonColor: any,
	query: any,
	resultCount: any,
	articles: any,
	allCards: any,
	newCards: any,
	style: any,
	page_to_fetch: number
}

class WidgetWithCards extends React.Component<Props2> {
//	private CardExp:CardExpandable = new CardExpandable(React.Component);
	constructor(props: any) {
		super(props);
	
		
	this.handleFilterChange = this.handleFilterChange.bind(this);
	this.handleRefresh = this.handleRefresh.bind(this);
	this.handleLoadMore = this.handleLoadMore.bind(this);
	this.handleApplyFilters = this.handleApplyFilters.bind(this);
	this.resetFilters = this.resetFilters.bind(this);
	this.handleKeepOpened = this.handleKeepOpened.bind(this);
	this.handleSearchSideBar = this.handleSearchSideBar.bind(this);

	this.state = {
		page_to_fetch: 0,
		dimmerActive: false,
		searchSideBarVisible: false,
		keepOpened: false,
		filtersHaveChanged: false,
		filterButtonColor: null,
		query: "Merkel",
		resultCount: "0",
		articles: {
		  status: "ok",
		  source: "abc-news-au",
		  sortBy: "top",
		  articles: ""
		},
		allCards: <div />,
		newCards: <div />
	  };
	}


	handleRefresh(e) {
		this.setState(prevState => ({
			allCards: (
				<div>
				</div>
			)
		}));
		this.setState({ page_to_fetch: ++this.state["page_to_fetch"] });

		console.log(this.state["allCards"]);

		this.setState({
			resultCount: "Searching..."
		});
	//	fetch("https://demo.medox.scisys.de:8443/dira6/api/v10/search/contentItems");
		fetch_medox(this.state["query"], this.state["page_to_fetch"]).then(
			function(cardsHTML) {
			
	console.log(cardsHTML[0]);
				this.setState({
					resultCount: cardsHTML[0] + " results"
				});

				var previousCard = this.state.allCards;

				this.setState(prevState => ({
					allCards: (
						<div>
							{this.state.allCards}
							{cardsHTML[1]}
						</div>
					)
				}));
			}.bind(this)
		);
	}
	handleLoadMore(e) {
		this.setState({ page_to_fetch: ++this.state["page_to_fetch"] });

		console.log(this.state["allCards"]);

		this.setState({
			resultCount: "Searching..."
		});
		fetch(this.state["query"], this.state["page_to_fetch"]).then(
			function(cardsHTML) {
			
		console.log(cardsHTML[0]);
				this.setState({
					resultCount: cardsHTML[0] + " results"
				});

				var previousCard = this.state.allCards;

				this.setState(prevState => ({
					allCards: (
						<div>
							{this.state.allCards}
							{cardsHTML[1]}
						</div>
					)
				}));
			}.bind(this)
		);
	}
	handleKeepOpened(e) {
		this.setState({
		  keepOpened: !this.state["keepOpened"]
		});
	  }
	  handleSearchSideBar(e) {
		this.setState({
		  searchSideBarVisible: !this.state["searchSideBarVisible"]
		});
	  }
	
	  handleFilterChange(e) {
		this.setState({
		  filtersHaveChanged: true
		});
	  }
	
	  handleApplyFilters(e) {
		if (this.state["filtersHaveChanged"]) {
		  this.setState({
			filterButtonColor: "orange"
		  });
		}
	
		if (!this.state["keepOpened"]) {
		  this.setState({
			searchSideBarVisible: false
		  });
		}
	  }
	
	  resetFilters(e) {
		this.setState({
		  filtersHaveChanged: false,
		  filterButtonColor: null
		});
	  }

	render()	{
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ margin: "5px", flex: "0" }}>
			  <Input
				labelPosition="right"
				type="search"
				placeholder="Search"
				defaultValue="Merkel"
				onChange={(e, data) => {
				  this.setState({ query: data.value });
				}}
				fluid
			  >
				<input />
				<Button.Group>
				  <Button icon="refresh" onClick={this.handleRefresh} />
	
				  <Button
				
					icon="filter"
					onClick={this.handleSearchSideBar}
				  />
	
				  <Dropdown
					icon={<Icon name="ellipsis vertical" fitted />}
					fitted
					floating
					button
					compact
					as="Button"
				  >
					<Dropdown.Menu>
					  <Dropdown.Item text="this is a Placeholder" icon="" />
					</Dropdown.Menu>
				  </Dropdown>
				</Button.Group>
			  </Input>
			</div>
	
			<Divider horizontal fitted>
			  <Label size="small" color="grey">
			  {this.state["resultCount"]} results
			  </Label>
			</Divider>
	
			<Sidebar.Pushable>
			  <Sidebar
				 animation="overlay" 
					direction="right"
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								overflowX: "hidden"
							}}
							visible={this.state["searchSideBarVisible"]}
				>
				<Segment
				  attached
				  className="fancy-scrollbar"
				  style={{ overflowY: "auto", height: "100%", flex: "1" }}
				>
				  <Header>
					<Icon name="filter" />Filters
				  </Header>
				  <Form>
					<Form.Field>
					  <label>Placeholder Filter</label>
					  <Input fluid onChange={this.handleFilterChange} />
					</Form.Field>
				  </Form>
				</Segment>
	
				<Segment attached style={{ flex: "0" }}>
				  <Checkbox label="Keep opened" onClick={this.handleKeepOpened}  />
				  <p />
				  <Button
					primary
					content="Apply"
					floated="left"
				
				  />
				</Segment>
			  </Sidebar>
			  <Sidebar.Pusher
				className="fancy-scrollbar card-list"
				style={{
				  overflowY: "auto",
				  display: "flex",
				  flex: "1",
				  flexDirection: "column",
				  height: "100%"
				}}
			  >
				 
						{this.state["cards"]} 

						{this.state["allCards"]}
						{this.state["newCards"]}

						<Divider horizontal>
							<Button content="Load more" onClick={this.handleLoadMore} />
							
					
						</Divider>
			  </Sidebar.Pusher>
			</Sidebar.Pushable>
		  </div>
				
		);
	}
}


export default class App extends React.Component{
	render() {
		return (
			<div
				className="fullscreen"
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					justifyContent: "space-between"
				}}>
				<WidgetWithCards style={{ height: "100%" }} />
			</div>
		);
	}
}

ReactDOM.render(
	//create-react-app exposes process.env.PUBLIC_URL to ensure that we use
	//the correct base URL both locally and in production
<App />, document.getElementById("root") as HTMLElement
);

registerServiceWorker();

