import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import './../../../assets/scss/custom.css';
import MUIDataTable from "mui-datatables";
import { FormControlLabel } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllPost, handlePostStatus, deletePost, checkUserStatus, blockUser } from './../../../api'
import { countries } from 'country-data';
import { connect } from 'react-redux';
import Switch from "react-switch";
import APIURL from '../../../../globalvariables';
import {
    Container, Row, Col, Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
const acceptable_user_roles = ["super_admin"]
const dashboard = [
    "dashboard",
];
const back = [
    'ti-control-backward',
];
const panel = [
    'ti-layout-grid2-alt',
];


let varToken = 'YWRtaW5AZ21haWwuY29tOjk4ZmM1YjgzOTI1NmU0NTY='

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteWarning: false,
            askStatus: false,
            deletePostData: null,
            loadData: true,
            viweDetails: false,
            success: false,
            FileUrl: null,
            blockSuccess: false,
            blockSuccessMessage: ''
        }
        this.onCancel = this.onCancel.bind(this)
    }

    componentDidMount = () => {
        const FileUrl = APIURL.baseURl
        this.setState({ FileUrl: FileUrl })
        this.getAllPostDetail();
    }

    openModal = (id) => {
        this.setState({ agentId: id });
        this.child.setAgengId(id)
        this.handleClickOpen('openAgent');
    }

    getAllPostDetail = async () => {
        let self = this;
        self.setState({ loader: true })
        let response = await getAllPost()
        if (response && response?.data?.statusCode == 200) {
            const dataP = response.data.data;
            let datas = [];
            dataP.map(datain => {
                const country = countries[datain?.countryCode].name
                datas.push([datain?.caption ?? "****", country, datain, datain, datain])
            })

            // datas.sort(function (a, b) {
            //     let nameA = a[1],
            //         nameB = b[1]
            //     if (nameA < nameB) {
            //         return -1;
            //     }
            //     if (nameA > nameB) {
            //         return 1;
            //     }
            //     return 0;
            // });
            self.setState({ postListData: datas, loadData: false })
        }
    }

    deleteAlert = (value) => {
        this.setState({ deletePostData: value, deleteWarning: true })
    }

    deletePost = async () => {
        let { deletePostData } = this.state
        let response = await deletePost(deletePostData, this.props.token)
        if (response && response.data.statusCode == 200) {
            this.setState({ deleteWarning: false, success: true })
            setTimeout(() => {
                this.componentDidMount()
                this.setState({ success: false })
            }, 2000)
        }

    }

    handleStatus = (value) => {
        let statusChangeText = value?.status == true ? "Disable Status" : " Enable Status"
        this.setState({ askStatus: true, status: value.status, statusChangeText, changeStatusData: value })
    }

    changePostStatus = async (stateChange) => {
        let { changeStatusData } = this.state
        let data = {
            _id: changeStatusData?._id,
            status: changeStatusData?.status
        }
        let response = await handlePostStatus(data)

        if (response) {
            this.setState({ success: true, askStatus: false })
            setTimeout(() => {
                this.getAllPostDetail()
                this.setState({ success: false })
            }, 3000)
        }
    }

    viewPostDetails = async (value) => {
        let check = await checkUserStatus(value?.userId, this.props.token)
        if (check.data.success) {
            value["isBlocked"] = check?.data?.data[0]?.isBlocked
        }
        this.setState({ viweDetails: true, viewData: value })
    }


    redirectTo = (data) => {
        this.props.history.push('/system_admin/app/admin/unit?id=' + data.id + "_" + data.unitId)
    }



    onCancel = (event) => {
        this.setState({ [event]: false,  })
    }

    onClose = (event) => {
        this.setState({ [event]: false, viweDetails:false })
    }


    handleBack = () => {
        this.props.history.goBack()
    }

    handleClickOpen = (changeState) => {
        this.setState({ [changeState]: true });

    };

    handleClose = (changeState) => {
        this.setState({ [changeState]: false });

    };

    closeViewModel = () => {
        this.setState({
            viweDetails: !this.state.viweDetails
        });
    }

    handleUser = async (userId, event) => {
        let { blockSuccess, blockSuccessMessage } = this.state
        let response = await blockUser(userId, event, this.props.token)
        if (response?.data.success) {
            blockSuccessMessage = event == "block" ? "User Successfully Blocked" : "User Successfully Unblocked"
            this.setState({ blockSuccess: true, blockSuccessMessage })
        }
        setTimout(() => {
            this.setState({ blockSuccess: false, blockSuccessMessage: '', viweDetails: false })
        }, 2000)
    }

    render() {
        const { userType } = this.props;
        const { postListData, blockSuccess, blockSuccessMessage, loadData, FileUrl, deleteWarning, askStatus, statusChangeText, success, viweDetails, viewData } = this.state
        // if (userType && !acceptable_user_roles.includes(userType)) {
        //     return (<Redirect to={'/system_admin/signin'} />);
        // }
        const options = {
            textLabels: {
                download: false,
                body: {
                    noMatch: loadData ? <CircularProgress className="w-3 mr-3 mb-3 progress-primary" thickness={3} /> : <div style={{ color: "#d1402a" }}>Sorry! No any Data Found</div>
                }
            },
            responsive: 'stacked',
            selectableRows: false,
            download: false
        };
        const columns = [
            {
                name: "Post Caption",
                options: {
                    filter: false
                }
            },
            { name: "Country" },
            {
                name: "Post Details",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <FormControlLabel
                            value={value}
                            control={<VisibilityIcon titleAccess="View post details" style={{ fontSize: 20, alignItems: "center", marginLeft: "20%" }} onClick={(e) => this.viewPostDetails(value)} />}
                        />
                    )
                }
            },
            {
                name: "Status",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <FormControlLabel
                            value={value}
                            control={<div style={{ textTransform: 'capitalize' }}><Switch onChange={() => this.handleStatus(value)} checked={value?.status} /> </div>}

                        />
                    )
                }
            },
            {
                name: "Delete",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <FormControlLabel
                            value={value}
                            control={<DeleteIcon titleAccess="Delete unit" style={{ fontSize: 20, alignItems: "center" }} onClick={(e) => this.deleteAlert(value).bind(this)} />}
                        />
                    )
                }
            },

        ]
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="6" className="addAgent">
                        <h1>Post list</h1>
                        <div>
                            <span className="material-icons icons-middle">{dashboard}</span>
                            <a>Dashboard</a><a>Post's List</a>
                        </div>
                    </Col>
                    <Col xs="12" sm="6">
                        <div className="bkAgent">
                            <Button color="primary" onClick={this.handleBack} ><span className={back}></span>Back</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12">
                        <MUIDataTable
                            data={postListData}
                            columns={columns}
                            options={options}
                        />
                    </Col>
                </Row>

                <SweetAlert
                    warning
                    btnSize="sm"
                    show={deleteWarning}
                    showCancel
                    confirmBtnText="Yes, Delete"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="success"
                    onConfirm={(event) => this.deletePost()}
                    onCancel={() => this.onClose('deleteWarning')}>
                    This action will Delete Post!
				</SweetAlert>
                <SweetAlert
                    warning
                    btnSize="sm"
                    show={askStatus}
                    showCancel
                    confirmBtnText={statusChangeText}
                    confirmBtnBsStyle="warning"
                    cancelBtnBsStyle="success"
                    title="Are you sure?"
                    onConfirm={(event) => this.changePostStatus('askStatus')}
                    onCancel={() => this.onCancel('askStatus')}>
                </SweetAlert>
                <SweetAlert
                    success
                    show={success}
                    title="Successful!"
                    btnSize="sm"
                    onConfirm={() => this.onCancel('success')}>
                </SweetAlert>
                <SweetAlert
                    success
                    show={blockSuccess}
                    title={blockSuccessMessage}
                    btnSize="sm"
                    onConfirm={() => this.onCancel('blockSuccess')}>
                </SweetAlert>

                <Modal isOpen={viweDetails} toggle={this.closeViewModel}>
                    <ModalHeader><h3>Post Detail</h3></ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name"><b>Post Caption :   </b></Label>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name">{viewData?.caption ?? "No Caption"}</Label>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name"><b>Post Created by :   </b></Label>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name">{viewData?.userName}</Label>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name"><b>Country :   </b></Label>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name">{countries[viewData?.countryCode]?.name}</Label>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="labels"><b>Message :  </b></Label>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-lg-6">
                                        <Label for="task-name">{viewData?.message}</Label>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-lg-4">
                                        <Label for="labels"><b>Post Image :   </b></Label>{console.log("FILEURL", FileUrl + "/" + viewData?.imageUrl)}
                                    </div>
                                </div>
                            </FormGroup>
                            <div className="viewBanerUpr1">
                                <div className="viewImage">
                                    <img
                                        className="viewImagw22"
                                        src={(FileUrl && viewData?.imageUrl) ? FileUrl + "/" + viewData.imageUrl : require("../../../assets/img/msgSend.png")}
                                        alt="" />
                                </div>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {viewData?.isBlocked ?
                            <Button variant="contained" color="primary" onClick={() => this.handleUser(viewData?.userId, "unblock")} >{"Unblock User"}</Button>
                            :
                            <Button variant="contained" color="primary" onClick={() => this.handleUser(viewData?.userId, "block")} >{"Block User"}</Button>
                        }
                        <Button variant="contained" className="btn-primary text-white" onClick={() => this.onClose("viweDetails")}>Close</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = ({ authUser }) => {
    const { user, token, userType } = authUser;
    return { token, userType };
};

export default connect(mapStateToProps)(Index);
