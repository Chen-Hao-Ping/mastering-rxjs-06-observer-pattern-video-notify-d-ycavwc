import { mergeScan } from 'rxjs/operators';

interface user_interface {
  //用戶主體
  index: number;
  notify(String): void;
}
/*
interface Users_interface{
  name:string,
  userList:[],
  addUser(user_interface):void,
  notifyObserver(any):void
}*/

const usersGroupList = [];

/*const UsersGroup = {//群組
  userList: [],
  addUser: (user) => {
    UsersGroup.userList.push(user);
    console.log(`user ${user.index} is add`);
  },
  notifyObserver: (msg) => {
    UsersGroup.userList.forEach((obs) => {
      obs.notify(msg);
    });
  },
};*/
function createUsersGroup(name: String) {
  let UsersGroup = {
    name: name,
    userList: [],
    addUser: (user) => {
      UsersGroup.userList.push(user);
      console.log(`user ${user.index} is add`);
    },
    notifyObserver: (msg) => {
      UsersGroup.userList.forEach((obs) => {
        obs.notify(msg);
      });
    },
  };
  usersGroupList.push(UsersGroup);
}

function position_name(List, name) {
  let list = List.filter((List) => !List.name.indexOf(name));
  return list[0];
}

function createUser(name: string, id: number) {
  let user: user_interface = {
    index: id,
    notify: (msg) => {
      console.log(`by id = ${user.index} 的通知,${msg}`);
    },
  };
  /*
  let userGroup = usersGroupList
    .filter(usersGroup => !(usersGroup.name).indexOf(name))
    //.map(userGroup => userGroup.name === name)
    //.filter(bool => bool == true)
  //console.log(userGroup);
  userGroup[0].addUser(user);*/
  position_name([...usersGroupList], name).addUser(user);
}

createUsersGroup('techer1');
createUsersGroup('techer2');
createUsersGroup('techer3');
createUsersGroup('techer4');
createUsersGroup('techer5');

createUser('techer1', 10);
createUser('techer2', 20);
createUser('techer3', 30);
createUser('techer4', 40);
createUser('techer5', 50);
createUser('techer1', 11);
createUser('techer1', 12);
createUser('techer1', 13);
createUser('techer1', 14);
createUser('techer1', 15);
createUser('techer1', 16);

/*
getUser(10);
getUser(11);

UsersGroup.notifyObserver('Hello word');

getUser(12);
UsersGroup.notifyObserver('第二次群體通知');*/
/*
let userGroup = usersGroupList
    .filter(usersGroup => !(usersGroup.name).indexOf("techer2"))
userGroup[0].notifyObserver('Hello word');
*/
position_name([...usersGroupList], 'techer2').notifyObserver(
  '第二次測試群體通知'
);
