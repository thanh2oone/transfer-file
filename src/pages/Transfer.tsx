import { Client } from '@microsoft/microsoft-graph-client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const accessToken: any = process.env.REACT_APP_ACCESS_TOKEN
const userId: any = process.env.REACT_APP_USER_ID

const client = Client.init({
    authProvider: (done) => done(null, accessToken)
})

const Transfer = () => {
    const params = useParams();
    const id = params.id

    const [downLink, setDownLink] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        client
            .api(`/users/${userId}/drive/items/${id}`)
            .get()
            .then(res => {
                setDownLink(res["@microsoft.graph.downloadUrl"])
                setName(res.name)
            })
    },
        // eslint-disable-next-line 
        []
    )

    const handleDownload = async () => {
        const res = await fetch(downLink);
        const blob = await res.blob();

        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);

        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
            <button onClick={handleDownload}>Download</button>
        </div>
    )
}

export default Transfer;