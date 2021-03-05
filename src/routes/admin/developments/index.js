import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import './../../../assets/scss/custom.css';
import { getActivePost } from "../../../api/index"
import { countries } from 'country-data';
import APIURL from '../../../../globalvariables';

class FormElements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnedResult: [],
            developmentStatus: '',
            developmentlength: '',
            response_message: '',
            FileUrl:null
        }
    }

    componentDidMount = async () => {
        try {
            const FileUrl = APIURL.baseURl
            let res = await getActivePost(this.props.token)
            let datap = res.data.data
            let postNumber = datap?.length
            console.log(postNumber, "getAllPost dashboard", datap)

            this.setState({ postNumber, datap, FileUrl })
        }
        catch (error) {
            this.setState({ response_message: error.message })
        }
    }



    render() {
        const { postNumber, datap, FileUrl } = this.state
        return (
            <div>
                <h2>ParkinSon Admin Dashboard <i className="ti-angle-right" /></h2>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-sm-12">
                            <div className="totalUnitUl">
                                <ul>
                                    <li>Active Posts: {postNumber}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row">
                            {datap && datap.length > 0 && datap.map((data, i) => (
                                <div className="col-xl-3 col-lg-3 col-sm-6">
                                    <div className="viewBanerUpr">
                                        <div className="viewBaner">
                                            <div><img src={FileUrl + "/" + data.imageUrl} alt={data?.message} /></div>
                                        </div>
                                        <div className="viewAvality">
                                            <label>{data?.caption ?? "****"}</label>
                                            <label>{ countries[data?.countryCode]?.name}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    const { developments, developmentStatus, developmentDashboard } = state.developmentReducer;
    const { calculations } = state.calculationReducer;
    const { user, token, userType } = state.authUser;
    return {
        developments, developmentStatus, developmentDashboard, calculations, user, token, userType
    };
}

export default connect(mapStateToProps)(FormElements);