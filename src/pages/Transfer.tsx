import { useState } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';

let accessToken: any = process.env.REACT_APP_ACCESS_TOKEN

const client = Client.init({
    authProvider: (done) => done(null, accessToken)
})

const Transfer = (props: any) => {
    const share = props.share;
    return (
        <>
            <p>{share.id}</p>
        </>
    )
}

export default Transfer;