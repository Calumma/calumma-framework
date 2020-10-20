import { useHistory } from "react-router-dom";
import useSecurity from "./useSecurity";

const test = async () => { return {}; }

const useCrud = (relative_path, custom_auth_header=null, redirect_401="/") => {

  let history = useHistory();
  let auth_header = {};
  const {
    getUserIdentity
  } = useSecurity();

  let auth_credentials = undefined;
  
  auth_credentials = getUserIdentity();

  if (auth_credentials && custom_auth_header == null) {
    auth_header = {
      'Authorization': auth_credentials.token
    };
    custom_auth_header=test;
  }

  let create = async to_insert_object => {
    let request_details = {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: JSON.stringify(to_insert_object)
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    return fetch(relative_path, request_details).then(response => processResponse(response), error => processHttpCodeError(error));
  };

  let signin = async to_insert_object => {
    let body = "";
    Object.keys(to_insert_object).forEach(key => {
      body += encodeURIComponent(key) + "=" + encodeURIComponent(to_insert_object[key]) + "&";
    });
    let request_details = {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: body
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    return fetch(relative_path, request_details).then(response => processResponse(response), error => processHttpCodeError(error));
  };

  let create_file = async to_insert_object => {
    let request_details = {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: to_insert_object
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    return fetch(relative_path, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  };

  let read = async (url_parameters, search_parameters) => {
    let request_details = {
      method: 'GET',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      }
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    const url = new URL(relative_path + url_parameters);
    if (search_parameters !== null && search_parameters !== undefined) Object.keys(search_parameters).forEach(key => url.searchParams.append(key, search_parameters[key]));
    return fetch(url, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  };

  let read_file = async to_insert_object => {
    let request_details = {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: JSON.stringify(to_insert_object)
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    return fetch(relative_path, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  };

  let update = async to_update_object => {
    let request_details = {
      method: 'PUT',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: JSON.stringify(to_update_object)
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    return fetch(relative_path, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  };

  let patch = async to_update_object => {
    let request_details = {
      method: 'PATCH',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      },
      body: JSON.stringify(to_update_object)
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);
    
    return fetch(relative_path, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  }; 

  let remove = async url_parameters => {
    let request_details = {
      method: 'DELETE',
      credentials: 'omit',
      headers: {
        'Accept': '*',
        'Content-Type': 'text/plain',
        ...auth_header,
        ...(await custom_auth_header())
      }
    };

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);


    const url = new URL(relative_path + url_parameters);
    return fetch(url, request_details).then(response => processResponse(response)).catch(error => processHttpCodeError(error));
  };

  let query = async (url_parameters, projection, filters, config, groupByColumns, orderBycolumns) => {
    let size = "";
    let page = "";
    let groupBy = "";
    let orderBy = "";
    let filters_str = '';
    let request_details = {
      method: 'GET',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...auth_header,
        ...(await custom_auth_header())
      }
    };
    let projections = "projection=" + projection.filter(x => !x.derivated).map(x => typeof x === 'object' ? x.name : x).join(",");
    if (groupByColumns) groupBy = "&groupBy=" + groupByColumns.map(x => typeof x === 'object' ? x.name : x).join(",");
    if (orderBycolumns) orderBy = orderBycolumns.map(x => "&sort=" + x.field + "," + x.order);
    if (filters) filters_str = "&filters=" + Object.values(filters).join(" and ");

    if (config) {
      page = config.page ? "&page=" + config.page : "";
      size = config.size ? "&size=" + config.size : "";
    }

    console.log("custom_auth_header", await custom_auth_header());
    console.log("default", auth_header);

    let queryString = "?" + projections + filters_str + groupBy + page + size + orderBy;
    let url = new URL(relative_path + url_parameters + queryString);
    return fetch(url.toString(), request_details).then(response => processResponse(response), error => processHttpCodeError(error));
  };

  const processResponse = response => {
    let signinPage = redirect_401 ? redirect_401 : "/";

    if (response.status === 401) {
      history.push(signinPage);
      throw response;
    } else if (response.status < 200 || response.status > 299) {
      throw response;
    } else {
      try {
        return response.json();
      } catch {
        return response;
      }
    }
  };

  const processHttpCodeError = error => {
    if (error instanceof Error) {
      return {
        error
      };
    } else {
      throw error;
    }
  };

  return {
    create,
    create_file,
    read,
    read_file,
    query,
    update,
    remove,
    patch,
    signin
  };
};

export default useCrud;