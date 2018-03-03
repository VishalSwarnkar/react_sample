var EventApplication = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  componentDidMount: function() {
    this.getDataFromApi();
  },
  handleSearch: function(events) {
    this.setState({events: events});
  },
  handleAdd: function(event) {
    var events = this.state.events;
    events.push(event);
    this.setState({events: events});
  },
  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/events',
      type: 'Get',
      success: function(data) {
        self.setState({events: data});
      },
      error: function(xhr, status, error) {
        console.log("Cannot get the data from API: ", error);
      }
    })
  },
  render: function() {
      return(
        <div className="container">
          <div className="jumbotorn">
            <h1>React Tutorial</h1>
          </div>
          <div className="row">
            <div className="col-md-4">
              <SearchForm handleSearch={this.handleSearch} />
            </div>
            <div className="col-md-8">
              <NewForm handleAdd={this.handleAdd} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <EventTable events={this.state.events}/>
            </div>
          </div>
        </div>
      )
    }
});
