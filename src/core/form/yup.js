import * as Yup from 'yup';
import moment from 'moment'

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY HH:mm");
}

Yup.setLocale({
  mixed: {
    default: 'Não é válido',
    notType: 'Valor inválido',
    required: 'Campo Obrigatório',
  },
  number: {
    min: 'Deve ser igual ou maior que ${min}',
    max: 'Deve ser igual ou menor que ${max}',
    positive: 'Deve ser positivo',
    negative: 'Deve ser negativo',
    lessThan: 'Deve ser maior que ${less}',
    moreThan: 'Deve ser menor que ${more}',
    integer: 'Deve ser inteiro'
  },
  date: {
    max: ({ max }) => 'Deve ser menor que ' + formatDate(max),
    min: ({ min }) => 'Deve ser maior que ' + formatDate(min)
  },
  array:{
    min: ({ min }) => 'Anexo obrigatório',
  }
});

export default Yup;
