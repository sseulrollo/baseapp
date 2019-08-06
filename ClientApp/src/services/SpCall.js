import axios from 'axios';

// Load sp
export function selectSp({spname, where}) {
    return axios.get('api/Common/LoadSql', {
            params : {
                sql: spname,
                args: where
            }
        })
        .then(response => response.data);
}

// update or delete or create
export function executeSp({spname, where}) {
    return axios.get('api/Common/ExecuteSql', {
                params : {
                    sql: spname,
                    args: where
                }
            })
            .then(response => response.data);
}


// call code
export function getCode({groupid, where}) {
    return axios.get('api/Common/Code', {
                params : {
                    args: {
                        GroupId: groupid,
                        Where: where
                    }
                }
            })
            .then(response => response.data);
}

// call menu
export function getMenu() {
    return axios.get('api/Common/Menu')
            .then(response => 
                    response.data);
}

// login
export function setLogin({username, pw}) {
    const userInfo = {
        user_id: username,
        password: pw
    }
    console.log(userInfo);
    return axios.post('/User/Login', {
                headers : {
                    'Content-type' : 'x-www-form-urlencoded',
                    'Accept' : 'application/json',
                    'data-Type' : 'json'
                },
                body:JSON.stringify(userInfo)
            })
            .then(response => response.data)
}