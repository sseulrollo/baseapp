import axios from 'axios';

// Load sp
export function selectSp(spname, where) {
    return axios.get('api/Common/LoadSql', {
            params : {
                sql: spname,
                args: where === undefined ? {} : where
            }
        })
        .then(response => response.data);
}

//loadSingle
export function loadSingle(spname, where) {
    return axios.get('api/Common/LoadSqlSingle', {
                params : {
                    sql: spname,
                    args: where === undefined ? {} : where
                }
            })
            .then(response => response);
}

// update or delete or create
export function executeSp(spname, where) {
    return axios.get('api/Common/ExecuteSql', {
                params : {
                    sql: spname,
                    args: where
                }
            })
            .then(response => response.data);
}


// call code
export function getCode(groupid, where) {
    return axios.get('api/Common/Code', {
                params : {
                    args: {
                        GroupId: groupid,
                        Where: where
                    }
                }
            })
            .then(response => response);
}

// call code
export function getCodeDynamic(groupid, where) {
    return axios.get('api/Common/CodeDynamic', {
                params : {
                    args: {
                        Group_Id: groupid,
                        Where: where
                    }
                }
            })
            .then(response => response);
}


// call menu
export function getMenu(user_id) {
    
    return axios.get('api/Common/Menu')
            .then(response => response.data);
}

// login
export function setLogin(username, pw) {
    

    const userInfo = {
        user_id: username,
        password: pw
    }

    return axios.post('/User/Login', {
                headers : {
                    'Content-type' : 'x-www-form-urlencoded',
                    'Accept' : 'application/json',
                    'data-Type' : 'json'
                },
                body:JSON.stringify(userInfo)
            })
            .then(response => {
                response               
            })
}


export function setCheck (state, props) {
    return "OK";
}