import { useState } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';
import Transfer from './Transfer';

let accessToken: any = process.env.REACT_APP_ACCESS_TOKEN

const client = Client.init({
    authProvider: (done) => done(null, accessToken)
})

const Home = () => {
    const [file, setFile] = useState({
        name: ""
    })

    const [downLink, setDownLink] = useState("");
    const [id, setId] = useState("");
    const [shareLink, setShareLink] = useState("");

    const changeUpload = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async (e: any) => {
        e.preventDefault();

        client
            .api(`/users/${process.env.REACT_APP_USER_ID}/drive/root:/Transfer/${file.name}:/content`)
            .put(file)
            .then((res) => {
                alert(`'${res.name}' upload successfull`)
                setId(res.id)
                setDownLink(res["@microsoft.graph.downloadUrl"])
                // setShareLink(`${process.env.REACT_APP_DOMAIN}/f/${id}`)
            })

    }

    const handleDownload = async () => {
        const res = await fetch(downLink);
        const blob = await res.blob();

        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);

        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
    return (
        <>
            <input type="file" name="file" onChange={changeUpload} />
            <form onSubmit={handleUpload}>
                <button type="submit">Upload</button>
            </form>
            <Transfer share={{
                id: id
            }} />
            <button onClick={handleDownload}>Download</button>
        </>
    )
}

export default Home;