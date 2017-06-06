/**
 * Created by ThinkPad on 2017/5/22.
 */
var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(
<Hello name="World" />,
    document.getElementById('example')
);