const constants = {
    user_types: {
      tenant: 4,
      owner: 5,
    },
    user_types_redable: {
      tenant: 'tenant',
      owner: 'owner',
    },
    exceptionCodes: [500, 501, 502, 503, 403, 401, 444],
    codes: {
      anauthorized: 401,
      internal_server_error: 500,
      not_found_error: 400,
    },
    english_months: ["January", 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    english_months_sort: ["Jan", 'Feb', "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    request: {
      post: 'post',
      get: 'get',
      put: 'put',
      delete: 'delete',
    },
    iconTypes: {
      materialIcons: 'MaterialIcons',
      ionicons: 'Ionicons',
      antDesign: 'AntDesign',
      evilIcons: 'EvilIcons',
      fontAwesome: 'FontAwesome',
      feather: 'Feather',
      simpleLineIcons: 'SimpleLineIcons',
    },
    screenPositions: {
      flex_end: 'flex-end',
      flex_start: 'flex-start',
      center: 'center',
    },
  };

export function getRandomNumber(){
    return Math.floor(Math.random()*10000000)
}

export const getRedableDateFromISOString = function (dateObj : string | Date) {
    if (!dateObj) return 'Unknown';
    if (typeof dateObj === 'string') dateObj = new Date(dateObj);
    const date = `${dateObj.getDate()} ${
      constants.english_months_sort[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
    return date;
  };

  export function getUserFromLocalStorage(){
    try {
      const data = localStorage.getItem("user")
      if(!data) return null
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }