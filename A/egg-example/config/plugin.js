'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true, // 开启
    package: 'egg-mysql', // 对应哪个包
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
};
// exports.mysql = {
//   enable: true, // 开启
//   package: 'egg-mysql', // 对应哪个包
// };

