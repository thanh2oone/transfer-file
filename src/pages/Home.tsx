import { useState } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';

const accessToken: any = process.env.REACT_APP_ACCESS_TOKEN
const domain: any = process.env.REACT_APP_DOMAIN
const userId: any = process.env.REACT_APP_USER_ID

const client = Client.init({
    authProvider: (done) => done(null, accessToken),
})


const Home = () => {
    const [file, setFile] = useState({
        name: ""
    })
    const [id, setId] = useState("");

    const changeUpload = (e: any) => {
        setFile(e.target.files[0])
    }

    const handleUpload = (e: any) => {
        e.preventDefault();

        client
            .api(`/users/${userId}/drive/root:/Transfer/${file.name}:/content`)
            .put(file)
            .then(res => {
                alert(`Upload successfull`)
                setId(res.id)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <input type="file" name="file" onChange={changeUpload} />
            <form onSubmit={handleUpload}>
                <button type="submit">Upload</button>
            </form>
            <div>
                {id && <a href={`${domain}/f/${id}`} target='_blank'>{domain}/f/{id}</a>}
            </div>
        </>
    )
}

export default Home;