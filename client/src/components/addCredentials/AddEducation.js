import {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    };

    onCheck = () => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Schools & bootcamps attended</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="School *"
                                    onChange={this.onChange}
                                    error={errors.school}
                                    value={this.state.school}
                                    name="school"
                                />
                                <TextFieldGroup
                                    placeholder="Degree / Certification *"
                                    onChange={this.onChange}
                                    error={errors.degree}
                                    value={this.state.degree}
                                    name="degree"
                                />
                                <TextFieldGroup
                                    placeholder="Field of Study *"
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                    value={this.state.fieldofstudy}
                                    name="fieldofstudy"
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    error={errors.from}
                                    value={this.state.from}
                                    name="from"
                                    type="date"
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    onChange={this.onChange}
                                    error={errors.to}
                                    value={this.state.to}
                                    name="to"
                                    type="date"
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current School / Bootcamp
                                    </label>
                                    <TextAreaFieldGroup
                                        onChange={this.onChange}
                                        value={this.state.description}
                                        name="description"
                                        placeholder="Program Description"
                                        error={errors.description}
                                        info="Brief info about the school / bootcamp"
                                    />
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-info btn-block mt-4"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {addEducation}
)(withRouter(AddEducation));
