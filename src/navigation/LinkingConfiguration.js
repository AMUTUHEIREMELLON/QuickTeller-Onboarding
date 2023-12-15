import { createURL } from "expo-linking";

export default {
  prefixes: [createURL("/")],
  config: {
    screens: {
      Welcome: "welcome",
      LogIn: "login",
      Dashboard: {
        screens: {
          NewAgent: {
            screens: {
              BankInfo: "bankInfo",
              Beneficiary: "beneficiary",
              CompanyInfo: "companyInfo",
              ContactInfo: "contactInfo",
              LocationInfo: "locationinfo",
              AgentType: "agentType",
              Terms: "terms",
              Attach: "attach",
            },
          },
          ExistingAgent: {
            AgentInfo: "agentInfo",
            LocationInfo: "locationInfo",
            Terms: "terms",
            Attach: "attach",
          },
          Issues: {
            NewIssue: "newIssue",
          },
          Reports: "reports",
        },
      },
    },
  },
};
