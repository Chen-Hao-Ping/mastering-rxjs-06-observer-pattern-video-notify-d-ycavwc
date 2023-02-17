import { mergeScan } from 'rxjs/operators';

interface user_interface {
  //用戶主體
  index: number;
  master:String;
  notify(String): void;
}

interface Users_interface {
  name: String;
  userList: user_interface[];
  addUser(user_interface: user_interface): void;
  notifyObserver(String): void;
}

const usersGroupList = [];

function createUsersGroup(name: String) {
  let UsersGroup: Users_interface = {
    name: name,
    userList: [],
    addUser: (user_interface) => {
      UsersGroup.userList.push(user_interface);
      //console.log(`user ${user_interface.index} is add`);
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
    master:name,
    notify: (msg) => {
      console.log(`master = ${user.master} to id = ${user.index} 的通知,${msg}`);
    },
  };
  position_name([...usersGroupList], name).addUser(user);
}

createUsersGroup('techer1');
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

position_name([...usersGroupList], 'techer1').notifyObserver(
  '第二次測試群體通知'
);
position_name([...usersGroupList], 'techer1').notifyObserver(
  '第三次測試群體通知'
);
position_name([...usersGroupList], 'techer1').notifyObserver(
  '第四次測試群體通知'
);
