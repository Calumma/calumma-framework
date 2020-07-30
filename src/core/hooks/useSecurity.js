const useSecurity = () => {

    const checkUserRole = (expectedRole) => {
        if (!expectedRole || expectedRole.length === 0) {
            return true
        }

        if (expectedRole instanceof Array && expectedRole.length === 1) {
            expectedRole = expectedRole[0];
        }
        const userRole = localStorage.getItem('petrobras/user/roles');
        const activeRole = localStorage.getItem('petrobras/user/activeRole');
        if(activeRole && (typeof expectedRole === 'string')){
            return activeRole === expectedRole;
        }
        if(!userRole)
            return false;
        const roles = userRole;

        if(typeof expectedRole === 'string')
            return roles.includes(expectedRole);

        return expectedRole.map(expectedRole => roles.includes(expectedRole))
                           .reduce((x, y) => x || y);
    };

    const getUserIdentity = () => {
        let roles = JSON.parse(localStorage.getItem("petrobras/user/roles") || "[]");
        let key = localStorage.getItem('petrobras/user/key');
        let activeRole = localStorage.getItem('petrobras/user/activeRole');
        let name = localStorage.getItem('petrobras/user/name');
        let token = localStorage.getItem('petrobras/user/token');
        let email = localStorage.getItem('petrobras/user/email');

        return {
            roles: roles,
            activeRole: activeRole,
            key: key,
            name: name,
            token: token,
            email: email
        };
    };

    const getUserAuth = () => {
        let authorization = localStorage.getItem('petrobras/user/token');
        return authorization;
    };

    const changeActiveRole = (newRole) => {
        let roles = JSON.parse(localStorage.getItem("petrobras/user/roles") || []);
        if(roles && roles.length > 1 && roles.includes(newRole)){
            localStorage.setItem('petrobras/user/activeRole', newRole);
        }else
            console.error("Won´t change activeRole, validation failed");
    };

    const getUserHasAccessToEvent = (enventInfo) => {
        let key = localStorage.getItem('petrobras/user/key');
        return ((enventInfo["responsibleAdministrator"] === key) || (enventInfo["ownerAdministrator"] === key) || (enventInfo["operator"] === key) || (enventInfo["responsibleOperator"] === key)); 
    };

    const setUserIdentity = (roles, key, email, username, token) => {
        const rolesStr = JSON.stringify(roles);

        if(roles && roles.length > 0){
            localStorage.setItem('petrobras/user/activeRole', roles[0]);
        }

        localStorage.setItem('petrobras/user/key', key);
        localStorage.setItem('petrobras/user/token', token);
        localStorage.setItem('petrobras/user/email', email);
        localStorage.setItem('petrobras/user/name', username);
        localStorage.setItem('petrobras/user/roles', rolesStr);
    };

    const clearUserIdentity = () => {
        localStorage.removeItem('petrobras/user/token');
        localStorage.removeItem('petrobras/user/email');
        localStorage.removeItem('petrobras/user/roles');
        localStorage.removeItem('petrobras/user/activeRole');
        localStorage.removeItem('petrobras/user/key');
        localStorage.removeItem('petrobras/user/name');
    };

    return {
        checkUserRole,
        getUserIdentity,
        setUserIdentity,
        getUserAuth,
        getUserHasAccessToEvent,
        changeActiveRole,
        clearUserIdentity
    };
};

export default useSecurity;
