import React from "react";
import {
    Button,
    Paper,
    CircularProgress,
    TextField, Container, Grid
} from "@material-ui/core";
import "./index.scss";
import { AuthContext } from "../Auth/AuthContext";
import ServiceApis from "../../apis/ServiceApis";


class ServiceDetail extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            service_data: {
                id: null,
                created_at: "",
                name: "",
                price: 0,
                description: "",
                estimated_time: "",
                service_avail: 0,
            },
            is_loading: false,
        };
    }


    componentDidMount() {
        if (this.props.is_creation === false) {
            this.setState({
                is_loading: true
            })
            let params = `?id=${encodeURIComponent(this.props.service_id)}`
            ServiceApis.getServices(params).then(data => {
                this.setState({
                    service_data: data,
                    is_loading: false
                })
            })
                .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
        }
    }


    createEmployee = () => {
        this.setState({
            is_loading: true
        })
        ServiceApis.postService(this.state.service_data).then(data => {
            this.context.handleUpdate("successMsg", "service created")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getServicesData()
            this.setState({
                is_loading: false
            })
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    updateEmployee = () => {
        this.setState({
            is_loading: true
        })
        ServiceApis.putService(this.state.service_data).then(data => {
            this.context.handleUpdate("successMsg", "service updated")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getServicesData()
        })
            .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    handleUpdateFields = (key, value) => {
        let { service_data } = this.state
        service_data[key] = value
        this.setState({
            service_data: service_data,
        });
    };

    handleBack = () => {
        this.props.handleUpdate("detail_toggle", false)
    }

    render() {
        let { service_data } = this.state
        return (
            <>
                <Container maxWidth="md">
                    {
                        this.state.is_loading ?
                            <div className="tc">
                                <CircularProgress color="primary" />
                            </div>
                            :
                            <>
                                <Grid item xs={12}>
                                    {
                                        this.props.is_creation === true ?
                                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                <Grid item>
                                                    <h4>Create Service</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.createEmployee}>Save</Button>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                <Grid item>
                                                    <h4>Update Service</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.updateEmployee}>Save</Button>
                                                </Grid>
                                            </Grid>
                                    }
                                </Grid>
                                <Grid item xs={7}>
                                    <Paper className="mt10 detail-card">
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Name" variant="standard" name="name" value={service_data.name} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="number" id="standard-basic" label="Price" variant="standard" name="price" value={service_data.price} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Estimated Time" variant="standard" name="estimated_time" value={service_data.estimated_time} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField multiline rows={4} id="standard-basic" label="Description" variant="standard" name="description" value={service_data.description} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </>
                    }
                </Container>
            </>
        );
    }
}

export default ServiceDetail;
