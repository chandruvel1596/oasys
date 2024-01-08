/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //APIEndpoint: "http://115.240.220.5:9991/rd"
  //APIEndpoint: "http://192.168.2.71:9991/rd"
  //APIEndpoint:  "http://192.168.1.22:9991/rd",
  //APIEndpoint:  "http://192.168.1.22:9991/rd",  
  // APIEndpoint:  "http://192.168.4.27:9991/rd",
  APIEndpoint:  "http://192.168.2.93:9991/rd",
  LoginUrl: "/login/checkUser",
  signOut: "/signout",
  dashboardCountData: "/dashboard/countData",
  GetallModel : "/model/getAllModel",
  GetallActiveStatus : "/activeStatus/getAllActiveStatus",
  GetallServerEnvironment : "/serverEnvironment/getAllServerEnvironment",
  RegisterdeviceNew : "/registerDevice",
  GetallDeviceRegisterMaster : "/getAllDeviceRegisterMaster",
  EditdeviceRegisterMaster : "/editlDeviceRegisterMaster",
  DeRegister : "/deregister",
  OtpVerify : "/otpVerify",
  GetvendorDetails : "/login/getVendorDetails",
  GetdatebasedKeyRotationReport : "/report/getDateBasedKeyRotation",
  deviceDatewiseReport : "/report/deviceDateWiseReport",
  GetRegisteredDeviceReport : "/report/getRegisteredDeviceReport",
  GetdeRegisteredDeviceReport : "/report/getDeRegisteredDeviceReport",
  GetallSerialNo : "/report/getAllSerialNo",
  getUIDAIStatuscategory : "/report/getUidaiStatusCategory",
  bulkInsertDeviceRegister:"/bulkInsertDeviceRegister",
  urlConfiguration:"/url/saveurlconfiguration",
  saveMcValidatingConfiguration: "/mc/saveMcValidatingConfiguration",
  register:"/login/register",
  getAllMenu:"/menu/getAllMenu",
  changePassword:"/login/changePassword"
};
