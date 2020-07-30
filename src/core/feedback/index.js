import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green, blue, red } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';
import { Snackbar, IconButton, SnackbarContent, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFeedbackStore } from './useFeedback'
import { useTranslation } from 'react-i18next'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: red[700],
    },
    info: {
        backgroundColor: blue[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
        color: '#fff'
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const useShowFeedback = (feedbackMessage, Icon) => {
    const { t } = useTranslation();
    const classes = useStyles1();

    if (typeof feedbackMessage === 'object') {
        if (feedbackMessage.errors) {
            return (
                <List>
                    {
                        feedbackMessage.errors.map(x => (
                            <ListItem>
                                <ListItemIcon>
                                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                </ListItemIcon>
                                <ListItemText>
                                    {t(x)}
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            );
        }

        return (
            <span>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {t(feedbackMessage.message)}
            </span>
        );
    }

    return (
        <span>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {t(feedbackMessage)}
        </span>
    );
}

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {useShowFeedback(message, Icon)}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default function CustomizedSnackbars(props) {
    const [config, setConfig] = useFeedbackStore();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setConfig(config => ({ ...config, ['open']: false }));
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={config.open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={config.variant}
                    message={config.message}
                />
            </Snackbar>
        </div>
    );
}

export { useFeedbackStore as useFeedback }