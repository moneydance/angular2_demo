const env = process.env.ENV;
switch (env) {
  case "DEV":
    import Config from ./base/base.config.ts;
    break;
}
