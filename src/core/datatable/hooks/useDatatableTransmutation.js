import moment from 'moment'
import { useTranslation } from 'react-i18next'

const useDatatableTransmutations = () => {
    const { t } = useTranslation();

    const transmuteDateField = (dateFormatInput, dateFormatOutput) => {
        return function dateParser(fieldInfo) {
            let date = {}

            if (fieldInfo === undefined || fieldInfo === "" || fieldInfo === null)
                return "";

            if (dateFormatInput === 'timestamp') {
                date = moment(fieldInfo)
            } else if (dateFormatInput === 'unix')
                date = moment.unix(fieldInfo);
            else {
                date = moment(fieldInfo, dateFormatInput);
            }

            return date.format(dateFormatOutput);
        }
    };


    const transmuteWithCustomFunction = (callback) => {
        return (row) => callback(row);
    };

    const transmuteIconField = (nameIconMap) => {
        return (fieldInfo) => {
            return nameIconMap[fieldInfo];
        }
    };

    const translateField = () => {
        return (fieldInfo) => {
            return t(fieldInfo);
        }
    };

    const transmuteStringBegin = (stringFormat) => {
        return (fieldString) => {
            if (fieldString)
                return stringFormat + " " + fieldString;
            else
                return "";
        }
    }

    const transmuteStringEnd = (stringFormat) => {
        return (fieldString) => {
            if (fieldString)
                return fieldString + " " + stringFormat;
            else
                return "0 " + stringFormat;
        }
    }

    const transmuteToUpperCase = (string) => {
        return string.toUpperCase();
    }

    return {
        transmuteDateField,
        transmuteIconField,
        translateField,
        transmuteStringBegin,
        transmuteStringEnd,
        transmuteWithCustomFunction,
        transmuteToUpperCase,
    }

};

export default useDatatableTransmutations;  