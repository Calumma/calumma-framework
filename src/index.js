import React from 'react'
import styles from './styles.module.css'
import {
  useCrud, useSecurity, CalummaForm, CalummaDateField, CalummaTimeField, CalummaTextField, CalummaAutoComplete, Feedback, CalummaErrorAlert,
  CalummaDateTimeField, CalummaServerSelect, CalummaEnumSelect, CalummaFileUploader, useForm, Yup, useFeedback, CalummaDatatable, 
  useDatatableTransmutation
} from './core'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export {
  useCrud, useSecurity, CalummaForm, CalummaDateField, CalummaTimeField, CalummaDateTimeField, CalummaTextField, CalummaAutoComplete, Feedback, 
  CalummaErrorAlert, CalummaServerSelect, CalummaEnumSelect, CalummaFileUploader, useForm, Yup, useFeedback, CalummaDatatable, 
  useDatatableTransmutation
}