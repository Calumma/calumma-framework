import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { Grid, Button, IconButton, Typography, Tooltip } from '@material-ui/core';
import useCrud from '../hooks/useCrud'
import CancelIcon from '@material-ui/icons/Cancel';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import useFeedback from "../feedback/useFeedback";
import CircularProgress from '@material-ui/core/CircularProgress';


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: "100%",
    height: 130,
    padding: 4,
    boxSizing: 'border-box'
};


const container = {
    borderRadius: 2,
    border: '5px dashed #eaeaea',
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    maxWidth: "150px",
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function FileUploader(props) {

    const dropContainer = {
        minHeight: props.height ? props.height : "200px",
    }

    const base_path = props.path;
    const { create_file, remove } = useCrud(base_path)
    const { showFeedback } = useFeedback();

    const [files, setFiles] = useState([]);
    const [filesInfo, setFilesInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const uploadFiles = (acceptedFiles) => {
        var data = new FormData();

        for (var i = 0; i < acceptedFiles.files.length; i++) {
            data.append('files', acceptedFiles.files[i])
        }

        setIsLoading(true);
        create_file(data)
            .then((result) => {
                Object.keys(result).forEach(path => {
                    acceptedFiles.files.filter(file => file.path === path)[0].preview = base_path + result[path]
                    acceptedFiles.files.filter(file => file.path === path)[0].customPath = result[path]
                })

                if (props.singleFile) {
                    let persistFile = [acceptedFiles.files[0]]
                    setFiles(persistFile);
                    setFilesInfo(persistFile.map(it => { return { original: it.name, renamed: it.customPath } }));
                } else {
                    setFiles(files.concat(acceptedFiles.files));
                    setFilesInfo(filesInfo.concat(acceptedFiles.files.map(it => { return { original: it.name, renamed: it.customPath } })))
                }
                setIsLoading(false);
            }).catch((err) => {
                showFeedback('error', 'Erro ao enviar arquivo.');
                setIsLoading(false);
            });
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        accept: props.acceptedTypes ? props.acceptedTypes : ['image/*', '.pdf'],
        noClick: true,
        onDrop: acceptedFiles => {
            if (props.path) {
                uploadFiles({ files: acceptedFiles });
            } else {
                setFiles(acceptedFiles);
                setFilesInfo(acceptedFiles);
            }
        }
    });

    const removeFile = function (path) {
        if (props.path) {
            remove(path)
                .then(() => {
                    setFiles(files.filter(file => file.customPath !== path));
                    setFilesInfo(filesInfo.filter(file => file !== path));
                });
        } else {
            setFiles(files.filter(file => file.customPath !== path));
            setFilesInfo(filesInfo.filter(file => file !== path));
        }
    };


    const getFileCompactName = (fileName) => {
        let maxFileNameSize = 20;
        if (fileName.length < maxFileNameSize)
            return fileName;
        else {
            let splitFile = fileName.split(".");
            let extension = splitFile[splitFile.length - 1];
            if (splitFile[0] < (maxFileNameSize - 3 - extension.length))
                return splitFile[0] + "..." + extension;
            else {
                let mainText = splitFile[0].substr(0, maxFileNameSize - 3 - extension.length);
                return mainText + "..." + extension;
            }
        }
    }

    const isImage = function (filename) {
        filename = filename.toLowerCase();
        return (filename.endsWith(".jpeg") || filename.endsWith(".jpg") || filename.endsWith(".gif") || filename.endsWith(".pdf") || filename.endsWith(".png"))
    };

    const thumbs = files.map(file => (
        <div style={{ paddingBottom: "5px", marginRight: "10px" }}>
            <Grid container justify="flex-end" style={{ height: 0 }}>
                <IconButton color="secondary" style={{ position: "relative", bottom: "20px", left: "20px" }} aria-label="upload picture" component="span">
                    <CancelIcon onClick={() => removeFile(file.customPath)} />
                </IconButton>
            </Grid>
            <Tooltip arrow title={file.name} aria-label={file.name} placement="top">
                <Grid container direction="column">
                    <Grid item style={thumb} key={file.name}>
                        <Grid container justify="center" style={thumbInner}>
                            {isImage(file.name) ? <img src={file.preview} style={img} alt="preview" /> : <InsertDriveFileIcon color="primary" style={{ width: "80px", height: "80px" }} />}
                        </Grid>
                    </Grid>
                    <Grid item container justify="center">
                        <Typography>
                            {getFileCompactName(file.name)}
                        </Typography>
                    </Grid>
                </Grid>
            </Tooltip>
        </div>
    ));

    useEffect(() => {
        props.onChange(undefined, props.name, filesInfo);
    }, [filesInfo]);

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <Grid container>
            <Grid item container xs={12} style={dropContainer}>
                <Grid container justify="center" direction="column" {...getRootProps({ className: 'dropzone' })} style={container}>
                    <Grid container direction="column" spacing={3}>
                        <form id="file-dropzone">
                            <input disabled={isLoading}
                                {...getInputProps()}
                            />
                        </form>
                        <Grid item container justify="center">
                            <Typography variant="h4">
                                Arraste o arquivo desejado
                            </Typography>
                        </Grid>
                        <Grid item container justify="center">
                            <Button
                                startIcon={isLoading ?
                                    <CircularProgress size={15} /> : <AttachFile color="primary" />}
                                disabled={isLoading}
                                variant="outlined"
                                color="primary"
                                onClick={open}
                            >
                                Ou clique aqui
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid style={thumbsContainer} justify="center">
                        {thumbs}
                    </Grid>
                </Grid>
            </Grid>
            <Typography variant="caption" style={{ color: "#f55549" }}>
                {props.errors[props.name] ? props.errors[props.name].message : props.helperText}
            </Typography>
        </Grid>
    );
}

FileUploader.displayName = 'CalummaFileUploader';
export default FileUploader;
