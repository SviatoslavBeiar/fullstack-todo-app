import { useParams, useNavigate } from "react-router-dom";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from 'moment';

export default function TodoComponent() {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();

    useEffect(() => {
        retrieveTodo();
    }, [id]);

    function retrieveTodo() {
        if (id !== '-1') {  // Check for new todo creation with -1
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate.split('T')[0]);
                })
                .catch(error => console.log(error));
        }
    }

    function onSubmit(values) {
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        };

        console.log(todo);

        if (id === '-1') {
            createTodoApi(username, todo)
                .then(response => {
                    navigate('/todos');
                })
                .catch(error => console.log(error));
        } else {
            updateTodoApi(username, id, todo)
                .then(response => {
                    navigate('/todos');
                })
                .catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors = {};
    
        // Validate description
        if (!values.description) {
            errors.description = 'Description is required';
        } else if (values.description.length < 5) {
            errors.description = 'Description must be at least 5 characters long';
        }
    
        // Validate target date
        if (!values.targetDate) {
            errors.targetDate = 'Target date is required';
        } else if (!moment(values.targetDate, 'YYYY-MM-DD', true).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        } else if (moment(values.targetDate).isBefore(moment(), 'day')) {
            errors.targetDate = 'Target date must be in the future';
        }
    
        console.log(values);
    
        return errors;
    }
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
