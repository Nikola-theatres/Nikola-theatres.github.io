const host = `https://parseapi.back4app.com`;
/*api.js takes care of server comunication*/

async function registerUser(body) {
    const user = new Parse.User();
    user.set('username', body.username);
    user.set('email', body.email);
    user.set('password', body.password);
    try {
        let userResult = await user.signUp();
        console.log('User signed up', userResult);
        return userResult;
    } catch (error) {
        throw new Error('Error while signing up user');
    }
}
async function loginUser(username, password) {
    try {
        let user = await Parse.User.logIn(`${username}`, `${password}`);
        localStorage._id = user.id;
        console.log('User signed up', user);
        return user;
    } catch (error) {
        throw new Error("Error while logging in");
    }
}


async function getObjectsByClassname(className) {
    const data = Parse.Object.extend(className);
    const query = new Parse.Query(data);
    try {
        const results = await query.find();
        return results.map(x => [x.id, x.attributes]);
    } catch (error) {
        throw new Error("Please check the classname");
    }
}
async function getDataById(className, id) {
    const data = Parse.Object.extend(className);
    const query = new Parse.Query(data);
    try {
        const result = await query.get(id);
        return result.attributes;
    } catch (error) {
        throw new Error("Sorry, couldn't get your requested data");
    }
}
async function post(className, body) {
  let data = new Parse.Object(className);
  Object.entries(body).forEach(element => {
      data.set(element[0], element[1]);
  });
  try {
    const result = await data.save();
    return result;
  } catch (error) {
      throw new Error("Error sending request POST");
  }
}
async function put(className, id, body) {
  const query = new Parse.Query(className);
  try {
    const currentObj = await query.get(id);
    Object.entries(body).forEach(element => {
    currentObj.set(element[0], element[1]);
  });
    try {
      const response = await currentObj.save();
    } catch (error) {
      console.error('Error while updating ', error);
    }
  } catch (error) {
    console.error('Error while retrieving object ', error);
  }
};
async function del(className, id) {
  const query = new Parse.Query(className);
  try {
    const object = await query.get(id);
    try {
      const response = await object.destroy();
      console.log('Deleted ParseObject', response);
    } catch (error) {
      console.error('Error while deleting ParseObject', error);
    }
  } catch (error) {
    console.error('Error while retrieving ParseObject', error);
  }
}
export let userApi = {
    registerUser,
    loginUser
};
export let parseApi = {
    getObjectsByClassname,
    getDataById,
    post,
    put,
    del
};

