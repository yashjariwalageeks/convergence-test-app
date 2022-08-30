/**
 * @param {{
 *   email: string,
 *   password: string,
 *   dateOfBirth: date,
 *   gender: string
 *   }} userInfo
 * @returns {promise}
 */
export function registerUser(userInfo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                //fetch all user from local storage
                let users = localStorage.getItem("user");
                users = !!users ? JSON.parse(users) : [];
                //check if user is exists or not
                const userFound = users.findIndex((value) => {
                    return value.email === userInfo.email
                })
                //If user is not exists then create one
                if (userFound === -1) {

                    localStorage.setItem("user", JSON.stringify([...users, userInfo]));
                    resolve({
                        statusCode: 201,
                        message: "User registered successfully!!"
                    })
                } else {
                    //If user is already exists then throw error
                    reject({
                        statusCode: 409,
                        error: true,
                        message: "User already exists!!"
                    })
                }
            } catch (e) {
                //handle any unhandled error
                reject({
                    statusCod: 500,
                    error: true,
                    message: e.message
                })
            }

        }, 2000)
    }).then((response) => {
        //return response
        return response;
    }).catch((error) => {
        //return error
        return error
    })
}
