import base from "./base";
import development from "./development";
import production from "./production";
import test from "./test";

const config = {
  development,
  production,
  test,
};

export default Object.assign(base, config[process.env.NODE_ENV]);
