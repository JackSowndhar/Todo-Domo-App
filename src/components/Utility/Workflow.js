import Domo from "ryuu.js";

export const triggerWorkflow = (actionType, userData) => {

   const payload = {
      subject: `TODO App ${actionType}`,
      body: `User name: ${userData.name}, age: ${userData.Age} was ${actionType} in the TODO app.`,
      email: "msowndhar552@gmail.com"
  };

  Domo.post(`/domo/workflow/v1/models/email/start`, payload)
  .then((res) => {
    console.log("Workflow Triggered", res);
  })
  .catch((err) => {
    console.error("Workflow Error", err);
  });
};