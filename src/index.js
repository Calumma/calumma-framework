import React from 'react'
import styles from './styles.module.css'
import {
  useCrud, useSecurity, CalummaForm, CalummaDateField, CalummaTimeField, CalummaTextField, CalummaAutoComplete, Feedback,
  CalummaServerSelect, CalummaEnumSelect, CalummaFileUploader, useForm, Yup, useFeedback, CalummaDatatable, useDatatableTransmutation
} from './core'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export {
  useCrud, useSecurity, CalummaForm, CalummaDateField, CalummaTimeField, CalummaTextField, CalummaAutoComplete, Feedback,
  CalummaServerSelect, CalummaEnumSelect, CalummaFileUploader, useForm, Yup, useFeedback, CalummaDatatable, useDatatableTransmutation
}