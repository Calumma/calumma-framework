import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';

import { useTranslation } from 'react-i18next';


const CalummaFormErrorAlert = (props) => {

    const { t } = useTranslation();

    return (
        <>
            <Alert severity="error">
                <Typography>
                    {t('formErrorMessage')}
                </Typography>
            </Alert>
        </>
    );
};

export default CalummaFormErrorAlert;
