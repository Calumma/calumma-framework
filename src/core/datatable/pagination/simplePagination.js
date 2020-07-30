import React from 'react'
import { TablePagination } from '@material-ui/core';
import { useTranslation } from 'react-i18next'

/*
    * total
    * tableConfig
    * setTableConfig
*/

const SimplePagination = (props) => {
    const { t } = useTranslation()
    return(
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={t("rowsPerPage")}
          component="div"
          count={props.total}
          rowsPerPage={props.size}
          page={props.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={(event, newPage) => props.setTableConfig(tableConfig => ({ ...tableConfig, "page": newPage }))}
          onChangeRowsPerPage={(event) => props.setTableConfig(tableConfig => ({ ...tableConfig, "size": +event.target.value }))}
      />
    );
};

export default  SimplePagination;