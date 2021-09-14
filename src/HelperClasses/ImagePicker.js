import React, { useState } from 'react';
import { saveToStorage, getFromStorage } from './StorageHandler';

export default function ImagePicker() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("nothing");
    const cloudinary = 'https://api.cloudinary.com/v1_1/dloc1rnq9/image/upload';

    const handleImage = async (images) => {
        for (let image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "uzoealqx");

            const resp = await fetch(cloudinary, {
                body: formData,
                method: 'POST'
            })
            await resp.json().then((respJSON) => {
                saveToStorage('image_url', respJSON.secure_url);
            });
        }
    }

    return (
        <React.Fragment>
            <input
                type="file"
                id="fileupload"
                accept="image/*"
                ref={fileInputEl => setFile(fileInputEl)}
                onChange={() => handleImage(file.files) }
            />
        </React.Fragment>
    )
}
