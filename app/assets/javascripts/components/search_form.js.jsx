var SearchForm = React.createClass({

  handleSearch: function() {
    console.log(this.query.value);
    var query = ReactDOM.findDOMNode(this.query).value;
    var self = this;

    $.ajax({
      url: '/api/events/search',
      data: {query: query},
      success: function(data){
        self.props.handleSearch(data)
      },
      error: function(xhr, status, error){
        console.log('Search Error ', status, xhr, error);
      }
    });
  },
  render: function(){
    return (
      <input onChange={this.handleSearch}
        type="text"
        className="form-control"
        placeholder="Type search item"
        ref={(query) => this.query = query} />
    )
  }
});
