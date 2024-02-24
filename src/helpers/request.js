import axios from 'axios';
import Messages from '../constants/Messages';
import { paypointAxios } from './axiosConfig';
import { apiKey, apiPassword, freshdeskDomain } from './config';

const ticketsPath = '/api/v2/tickets';
const statusCode = '9000';

const postApplication = async (data) => {
  try {
    if (data) {
      const res = await paypointAxios.post(
        '/api/AgentApplic/CreateApplication',
        data
      );
      let statusCode = res.data.code || res.data.Code;
      if (statusCode === '9000') {
        alert(Messages.successMessage);
        console.log(res.data);
      } else {
        alert(Messages.failMessage);
        // alert(res.data.Message)
        console.log(res.data);
      }
    }
  } catch (error) {
    console.error(error.response);
    alert(Messages.failMessage);
  }
};

const getAgent = async (
  agentID,
  setAgentName,
  setPhoneNumber,
  setSnackbarMessage,
  setSnackbarVisible,
  setEmail,
  setData
) => {
  try {
    const res = await paypointAxios.get('/api/AgentApplic/GetByTerminalId', {
      params: {
        terminalId: agentID,
      },
    });
    if (
      parseInt(res.data.code) === 9000 &&
      res.data.response.TerminalId !== null
    ) {
      let data = res.data.response;
      setData ? setData(data) : setData(null);
      setAgentName(data.AgentName);
      data.Phone ? setPhoneNumber(data.Phone) : setPhoneNumber('');
      data.Email ? setEmail(data.Email) : setEmail('');
    } else {
      let err = res.data.responseMessage;
      setSnackbarMessage('Terminal ID Not Found! ', err);
      setSnackbarVisible(true);
      console.error(err);
    }
  } catch (error) {
    console.error(error);
  }
};

const postTicket = async (fields, navigation) => {
  try {
    const res = await axios.post(
      `https://${freshdeskDomain}${ticketsPath}`,
      fields,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        auth: {
          username: apiKey,
          password: apiPassword,
        },
      }
    );
    alert(Messages.successMessage);
    navigation.navigate('Dashboard');
  } catch (error) {
    alert(Messages.failMessage);
    console.error(error);
  }
};

//! moved uploadFile to Attachment component
const uploadFile = async (result, formData) => {
  try {
    if (result) {
      const res = await paypointAxios.post(
        '/AgentFile/uploadApplicationAttachment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      let resCode = res.data.code || res.data.Code;
      if (resCode === statusCode) {
        setUploadSuccess(true);
        alert(Messages.successMessage);
        console.log(res.data);
      } else {
        setUploadSuccess(false);
        alert(Messages.failMessage);
      }
      alert(res.data.message);
    }
  } catch (error) {
    console.error(error);
    setUploadSuccess(false);
    alert(Messages.failMessage);
  }
};

// // Define arrays outside the function to make them accessible globally
// let newApp = [];
// let pendingRes = [];
// let declinedRes = [];
// let approvedRes = [];

// const getBSPApplications = async (
//   fromText,
//   toText,
//   setNewReq,
//   setPending,
//   setDeclined,
//   setApproved,
//   setUserDetails,
//   setData // New parameter to receive fetched data
// ) => {
//   try {
//     const res = await paypointAxios.get('/api/AgentApplic/GetBspApplications', {
//       params: {
//         userId: setUserDetails.UserId,
//         dateRange: `${fromText} - ${toText}`,
//       },
//       headers: {
//         Accept: '*/*',
//       },
//     });

//     let resLength = res.data.response.length;
//     let docs = res.data.response;
//     console.info('REPORTS:', docs);

//     // Reset arrays
//     newApp = [];
//     pendingRes = [];
//     declinedRes = [];
//     approvedRes = [];

//     if (resLength > 0) {
//       docs.forEach((doc) => {
//         let currentStage = doc.CurrentStage;
//         switch (currentStage) {
//           case 'NewRequest':
//             newApp.push(doc);
//             break;
//           case 'PendingBOU':
//             pendingRes.push(doc);
//             break;
//           case 'DeclinedBOU':
//             declinedRes.push(doc);
//             break;
//           case 'FullyApproved':
//             approvedRes.push(doc);
//             break;
//           default:
//             break;
//         }
//       });

//       // Set the fetched data using the provided setData function
//       setData({
//         newApp,
//         pendingRes,
//         declinedRes,
//         approvedRes
//       });

//       // Update other state variables if needed
//       setNewReq(newApp.length.toString());
//       setPending(pendingRes.length.toString());
//       setDeclined(declinedRes.length.toString());
//       setApproved(approvedRes.length.toString());
//     } else {
//       alert('You have no application Records.');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

let newApp = [];
let pendingRes = [];
let declinedRes = [];
let approvedRes = [];

const getBSPApplications = async (
  fromText,
  toText,
  setNewReq,
  setPending,
  setDeclined,
  setApproved,
  userDetails
) => {
  let newApp = [];
  let pendingRes = [];
  let declinedRes = [];
  let approvedRes = [];

  try {
    const res = await paypointAxios.get('/api/AgentApplic/GetBspApplications', {
      params: {
        userId: userDetails.UserId,
        dateRange: `${fromText} - ${toText}`,
      },
      headers: {
        Accept: '*/*',
      },
    });

    console.log('res here>>>', res)

    if (res && res.data && res.data.response) {
      let docs = res.data.response;

      docs.forEach((doc) => {
        let currentStage = doc.CurrentStage;
        switch (currentStage) {
          case 'NewRequest':
            newApp.push(doc);
            break;
          case 'PendingBOU':
            pendingRes.push(doc);
            break;
          case 'DeclinedApplication':
            declinedRes.push(doc);
            break;
          case 'FullyApproved':
            approvedRes.push(doc);
            break;
          default:
            break;
        }
      });

      setNewReq(newApp);
      setPending(pendingRes);
      setDeclined(declinedRes);
      setApproved(approvedRes);

      if (newApp.length === 0 && pendingRes.length === 0 && declinedRes.length === 0 && approvedRes.length === 0) {
        alert('You have no application Records.');
      }
    } else {
      console.error('res.data or res.data.response is undefined');
    }
  } catch (error) {
    console.error(error);
  }

  console.info('DECLINED HERE', declinedRes)
};

const getRegions = async (setRegionList) => {
  try {
    const res = await paypointAxios.get('/api/Location/GetRegions', {});
    let regions = [];

    if (res.data.code == 9000) {
      if (res.data.data.length > 0) {
        res.data.data.forEach((item) => {
          regions.push({ value: item, label: item });
        });
      }
    }
    setRegionList(regions);
  } catch (error) {
    console.error(error);
  }
};

const getDistricts = async (selectedRegion, setDistrictList) => {
  try {
    const res = await paypointAxios.get('/api/Location/GetDistricts', {
      params: {
        region: selectedRegion,
      },
    });
    let districts = [];

    if (res.data.code == 9000) {
      if (res.data.data.length > 0) {
        res.data.data.forEach((item) => {
          districts.push({ value: item, label: item });
        });
      }
    }
    setDistrictList(districts);
  } catch (error) {
    console.error(error);
  }
};

const getCounties = async (selectedDistrict, setCountyList) => {
  try {
    const res = await paypointAxios.get('/api/Location/GetCounties', {
      params: {
        district: selectedDistrict,
      },
    });
    let counties = [];

    if (res.data.code == 9000) {
      if (res.data.data.length > 0) {
        res.data.data.forEach((item) => {
          counties.push({ value: item, label: item });
        });
      }
    }
    setCountyList(counties);
  } catch (error) {
    console.error(error);
  }
};

export {
  postApplication,
  getAgent,
  postTicket,
  getBSPApplications,
  getRegions,
  getDistricts,
  getCounties,
  newApp,
  pendingRes,
  declinedRes,
  approvedRes,
};
