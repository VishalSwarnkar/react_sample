var Event = React.createClass({
  getInitialState: function() {
    return {edit: false};
  },
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },
  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/events/' + this.props.event.id,
      method: 'DELETE',
      success: function(data) {
        this.props.handleDeleteRecord(this.props.event);
      }.bind(this),
      error: function(xhr, status, error) {
        console.log("Unable to delete event ", error);
      }
    });
  },
  handleUpdate: function(event) {
    event.preventDefault();
    if(this.validRecord()) {
      var event_data = {
        name: this.recordValue("name"),
        date: this.recordValue("date"),
        description: this.recordValue("description"),
        place: this.recordValue('place')
      };
      $.ajax({
        method: 'PUT',
        url: '/api/events/' + this.props.event.id,
        data: {event: event_data},
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data)
          this.state.edit = false
          this.setState = {edit: false}
        }.bind(this),
        error: function(xhr, status, error) {
          console.log("Unable to update the record", error);
        }
      })
    }else {
      console.log("Entered record is not correct");
    }
  },
  recordValue: function(fieldName) {
    return ReactDOM.findDOMNode(this[fieldName]).value;
  },
  validRecord: function() {
    if(this.recordValue("name") &&
    this.recordValue("date") &&
    this.recordValue("description") &&
    this.recordValue("place")){
      return true;
    }else {
      return false;
    }
  },
  handleToggle: function(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  },
  renderForm: function(event) {
    return (
      <tr>
        <td>
          <input name="name"
            defaultValue={this.props.event.name}
            className="form-control"
            type="text"
            ref={(name) => this.name = name}>
          </input>
        </td>
        <td>
          <input name="date"
            defaultValue={this.props.event.event_date}
            className="form-control"
            type="date"
            ref={(date) => this.date = date}>
          </input>
        </td>
        <td>
          <input name="place"
            defaultValue={this.props.event.place}
            className="form-control"
            type="text"
            ref={(place) => this.place = place}>
          </input>
        </td>
        <td>
          <input name="description"
            defaultValue={this.props.event.description}
            className="form-control"
            type="text"
            ref={(description) => this.description = description}>
          </input>
        </td>
        <td>
          <a className="btn btn-success btn-sm" onClick={this.handleUpdate}>Save</a>
          <a className="btn btn-default btn-sm" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    );
  },
  renderRecord: function(event) {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
        <td>
          <a className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</a>
          <a className="btn btn-primary btn-sm" onClick={this.handleToggle}>Edit</a>
        </td>
      </tr>
    );
  },
  render: function() {
    if(this.state.edit) {
      return (this.renderForm());
    } else {
      return (this.renderRecord());
    }
  }
});
