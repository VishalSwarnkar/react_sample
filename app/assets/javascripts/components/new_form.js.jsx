var NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      name: '',
      event_date: '',
      place: '',
      description: ''
    }
  },
  handleAdd: function(event) {
    event.preventDefault();
    var self = this;

    if (this.validForm()) {
      $.ajax({
        url: '/api/events',
        method: 'POST',
        data: {event: self.state},
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          console.log('Unable to add new event ', error);
        }
      })
    }else {
      console.log('Please enter valid input in the form');
    }
  },
  validForm: function() {
    if(this.state.name && this.state.event_date && this.state.place &&
       this.state.description) {
         return true;
       }else {
         return false;
       }
  },
  handleChange: function(event) {
    var input_name = event.target.name;
    var value = event.target.value;
    this.setState({[input_name]: value})
  },
  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group">
          <input type="text" className="form-control"
            name="name"
            placeholder="name"
            ref={(name) => this.name = name}
            value={this.state.name}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="date" className="form-control"
            name="event_date"
            placeholder="Event date"
            ref={(event_date) => this.event_date = event_date}
            value={this.state.event_date}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control"
            name="place"
            placeholder="place"
            ref={(place) => this.place = place}
            value={this.state.place}
            onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control"
            name="description"
            placeholder="Description"
            ref={(description) => this.description = description}
            value={this.state.description}
            onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
  }
})
