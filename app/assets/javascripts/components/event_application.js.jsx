var EventApplication = React.createClass({
  getInitialState: function() {
    return {events: [], sort: "name", order: "asc"};
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
  handleDeleteRecord: function(event) {
    var events = this.state.events.slice();
    var index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({events: events});
  },
  handleUpdateRecord: function(old_event, new_event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({events: events});
  },
  getDataFromApi: function() {
    var self = this;
    $.ajax({
      url: '/api/events',
      type: 'GET',
      success: function(data) {
        self.setState({events: data});
      },
      error: function(xhr, status, error) {
        console.log("Cannot get the data from API: ", error);
      }
    })
  },
  handleSortColumn: function(name, order) {
    if(this.state.sort != name) {
      order = 'asc';
    }
    $.ajax({
      url: '/api/events',
      data: {sort_by: name, order: order},
      method: 'GET',
      success: function(data) {
        this.setState({events: data, sort: name, order: order});
      }.bind(this),
      error: function(xhr, status, error) {
        console.log('Cannot sort the column', error);
      }
    });
  },
  render: function() {
      return(
        <div className="container">
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
              <EventTable events={this.state.events}
                sort={this.state.sort}
                order={this.state.order}
                handleDeleteRecord={this.handleDeleteRecord}
                handleUpdateRecord={this.handleUpdateRecord}
                handleSortColumn={this.handleSortColumn}/>
            </div>
          </div>
        </div>
      )
    }
});
