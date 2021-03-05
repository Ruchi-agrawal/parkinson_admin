/**
 * Pages Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    DashDevelopments,
    AsyncPostList,
    AsyncUserList
} from 'Components/AsyncComponent/AsyncComponent';

const Pages = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/agents`} />
            <Route path={`${match.url}/dashboard`} component={DashDevelopments} />
            <Route path={`${match.url}/postList`} component={AsyncPostList} />
            <Route path={`${match.url}/users_list`} component={AsyncUserList} />

        </Switch>
    </div>
);
export default Pages;