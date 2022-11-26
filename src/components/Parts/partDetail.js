import React from "react";
import {
    Button,
    Paper,
    CircularProgress,
    TextField, Container, Grid
} from "@material-ui/core";
import "./index.scss";
import PartsApis from "../../apis/PartsApis";
import { AuthContext } from "../../components/Auth/AuthContext";


class PartDetail extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            parts_data: {
                name: "",
                price: 0,
                quantity: 0,
                description: ""
            },
            is_loading: false,
        };
    }


    componentDidMount() {
        if (this.props.is_creation === false) {
            this.setState({
                is_loading: true
            })
            let params = `?id=${encodeURIComponent(this.props.part_id)}`
            PartsApis.getParts(params).then(data => {
                this.setState({
                    parts_data: data,
                    is_loading: false
                })
            })
                .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
        }
    }


    createPart = () => {
        this.setState({
            is_loading: true
        })
        PartsApis.postParts(this.state.parts_data).then(data => {
            this.context.handleUpdate("successMsg", "part created")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getPartsData()
            this.setState({
                is_loading: false
            })
        })
        .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    updatePart = () => {
        this.setState({
            is_loading: true
        })
        PartsApis.putParts(this.state.parts_data).then(data => {
            this.context.handleUpdate("successMsg", "part updated")
            this.props.handleUpdate("detail_toggle", false)
            this.props.getPartsData()
        })
        .catch(error => this.context.handleCatch(error, () => this.setState({ is_loading: false })))
    }

    handleUpdateFields = (key, value) => {
        let { parts_data } = this.state
        parts_data[key] = value
        this.setState({
            parts_data: parts_data,
        });
    };

    handleBack = () => {
        this.props.handleUpdate("detail_toggle", false)
    }

    render() {
        let { parts_data } = this.state
        let { is_creation } = this.props
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
                                                    <h4>Create Part</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.createPart}>Save</Button>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                <Grid item>
                                                    <h4>Update Part</h4>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="standard" color="primary" onClick={this.handleBack} >Cancel</Button>
                                                    <Button variant="contained" color="primary" onClick={this.updatePart}>Save</Button>
                                                </Grid>
                                            </Grid>
                                    }
                                </Grid>
                                <Grid item xs={7}>
                                    <Paper className="mt10 detail-card">
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item>
                                                <TextField id="standard-basic" label="Name" variant="standard" name="name" value={parts_data.name} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="number" id="standard-basic" label="Price" variant="standard" name="price" value={parts_data.price} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField type="number" id="standard-basic" label="Quantity" variant="standard" name="quantity" value={parts_data.quantity} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
                                            </Grid>
                                            <Grid item>
                                                <TextField multiline rows={5} id="standard-basic" label="Description" variant="standard" name="description" value={parts_data.description} onChange={(e) => this.handleUpdateFields(e.target.name, e.target.value)} />
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

export default PartDetail;
