const AWS = require('aws-sdk');
const uuid = require("uniqid");
//remove file from S3 
AWS.config.update({
    accessKeyId: process.env.S3accessKeyId,
    secretAccessKey: process.env.S3secretAccessKey,
    region: process.env.S3region
});

const BUCKET = "test-ngs-image-storage";

/**
 * @name s3putObject
 * @function
 * @description places file into s3 with specified bucket, folder, filename
 * @param {string} bucket 
 * @param {string} folder 
 * @param {string} fileName 
 * @param {buffer} body file data buffer
 */
function s3putObject(fileName, body) {

    const s3Bucket = new AWS.S3({
        params: {
            Bucket: BUCKET
        }
    });

    if(!fileName){
        fileName = uuid();
    }

    body.id = fileName;

    // let path = '';
    // if (!folder) {
    //     path = `${fileName}`;
    // } else if (folder.indexOf('/') != folder.length - 1) {
    //     path = `${folder}/${fileName}`;
    // } else {
    //     path = `${folder}${fileName}`;
    // }

    

    var data = {
        Key: `${fileName}.json`,
        Body: JSON.stringify(body),
        ContentEncoding: 'base64'
    };

    return s3Bucket.putObject(data).promise().then(
        success => {            
            return {
                id:fileName,
                success:success};
        },
        failure => {
            throw failure;
        }
    );
}

async function s3getObject(archiveId) {

    if(archiveId.indexOf('.json')==-1){
        archiveId = `${archiveId}.json`;
    }
    let data = {
        Key: archiveId
    };

    //remove file from S3 
    AWS.config.update({
        accessKeyId: process.env.S3accessKeyId,
        secretAccessKey: process.env.S3secretAccessKey,
        region: process.env.S3region
    });

    const s3Bucket = new AWS.S3({
        params: {
            Bucket: BUCKET
        }
    });

    return s3Bucket.getObject(data).promise().then(
        getRes => {
            return getRes;
        },
        err => {
            throw err;
        }
    );
}

async function s3listObject(archiveId) {

    let data = {
        // Key: BUCKET
    };

    //remove file from S3 
    AWS.config.update({
        accessKeyId: process.env.S3accessKeyId,
        secretAccessKey: process.env.S3secretAccessKey,
        region: process.env.S3region
    });

    const s3Bucket = new AWS.S3({
        params: {
            Bucket: BUCKET,
            Delimiter:'/'
        }
    });

    return s3Bucket.listObjects(data).promise().then(
        getRes => {
            let returnContents = [];
            if(getRes && getRes.Contents){
                getRes.Contents.forEach(
                    c=>{
                        returnContents.push({id:c.Key, lastModified:c.LastModified});
                    }
                )
            }
            return returnContents;
        },
        err => {
            throw err;
        }
    );
}

module.exports = {
    s3getObject,
    s3putObject,
    s3listObject
}