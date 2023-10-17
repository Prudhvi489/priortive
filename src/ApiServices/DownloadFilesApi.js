import gomytripclient from "../GomytripClient";

export const DownloadFileFromApi = (endPoint, payload) => {
    gomytripclient.post(endPoint, payload, { responseType: 'blob' }
    ).then(res => {
        const blobUrl = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));

        const tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.setAttribute('download', `Admin${endPoint}.${payload.downloadType===1?"pdf":'xlsx'}`); // Set the desired file name
        document.body.appendChild(tempLink);
        tempLink.click();
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(tempLink);
    }).catch(err => {
        alert('ERR')
    })
}