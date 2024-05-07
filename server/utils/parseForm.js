import multiparty from "multiparty";

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });
};
