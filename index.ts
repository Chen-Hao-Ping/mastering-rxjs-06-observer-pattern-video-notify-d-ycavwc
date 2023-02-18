import { mergeScan } from 'rxjs/operators';

interface user_interface {
  //用戶主體
  index: number;
  master: string;
  notify(mag: string): void;
}

interface master_interface {
  name: string;
  userList: user_interface[];
  log: history_interface;
  addUser(user: user_interface): void;
  notifyObserver(msg: string): void;
}

interface history_interface {
  time: Date;
  config: techer_config_interface;
  log: log_interface[];
}

interface log_interface {
  question: string;
  answer: string;
  question_mode: string; //sound_en,sound_ch,picture_en,picture_ch
  answer_mode: string; //dice,microphone
}

interface techer_config_interface {
  topic_subject: string;
  game_round: number;
  game_mode: string; //time,pk
  decide(game_mode: string): void;
  game_mode_config: any;
  answer_mode: string; //spell,speak
}

interface time_config_interface {
  //for techer_config_interface.game_mode == time ,代表出題‘比例’
  picture: number;
  word: number;
  sound: number;
}

interface pk_config_interface {
  //for techer_config_interface.game_mode == pk ,代表出題’難度‘
  level: number;
}

const masterList: master_interface[] = [];

function createMaster(name: string) {
  let UsersGroup: master_interface = {
    name: name,
    userList: [],
    log: null,
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
  masterList.push(UsersGroup);
}
function position_Master_name(List: master_interface[], name: string) {
  const array = List ?? masterList;
  let list = array.filter((array) => array.name.indexOf(name) == 0);
  return list[0];
}

function createUser(master: string, id: number) {
  let user: user_interface = {
    index: id,
    master: master,
    notify: (msg: string) => {
      console.log(
        `master = ${user.master} to id = ${user.index} 的通知,${msg}`
      );
    },
  };
  //position_Master_name([...masterList], master).addUser(user);
  position_Master_name([...masterList], master).addUser(user);
}

function set_game_config(game_config_api) {
  let api = game_config_api ?? {
    topic_subject: '',
    game_round: 0,
    game_mode: '',
    picture: 0,
    word: 0,
    sound: 0,
    level: 0,
    answer_mode: '',
  };
  let game_mode_config = {};
  let config: techer_config_interface = {
    topic_subject: api.topic_subject,
    game_round: api.game_round,
    game_mode: api.game_mode, //time,pk
    decide: (_) => {
      if (config.game_mode == 'time') {
        let game_mode_config: time_config_interface = {
          picture: api.picture,
          word: api.word,
          sound: api.sound,
        };
        game_mode_config = game_mode_config;
      } else if (config.game_mode == 'pk') {
        let game_mode_config: pk_config_interface = {
          level: api.level,
        };
        game_mode_config = game_mode_config;
      }
    },
    game_mode_config: game_mode_config,
    answer_mode: api.answer_mode, //spell,speak
  };
}

createMaster('techer1');
createMaster('techer1');
createMaster('techer2');
createMaster('techer3');
createMaster('techer4');
createMaster('techer5');

createUser('techer2', 10);
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

position_Master_name([...masterList], 'techer1').notifyObserver(
  '第二次測試群體通知'
);

position_Master_name([...masterList], 'techer1').notifyObserver(
  '第三次測試群體通知'
);

position_Master_name([...masterList], 'techer1').notifyObserver(
  '第四次測試群體通知'
);

createUser('techer1', 17);

position_Master_name([...masterList], 'techer1').notifyObserver(
  '第五次測試群體通知'
);
