"use client";

export function Payment(amount: number) {
  const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

  const optionalData = {
    currency: khqrData.currency.khr,
    amount: amount,
    mobileNumber: "85561517679",
    storeLabel: "CAM-02",
    terminalLabel: "Cashier_1",
    merchantNameAlternateLanguage: "kdey168",
    merchantCityAlternateLanguage: "ភ្នំពេញ",
    upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO",
  };

  const individualInfo = new IndividualInfo(
    "phy_lyman@aclb",
    "Phy lyman",
    "PHNOM PENH",
    optionalData
  );
  const khqr = new BakongKHQR();
  const response = khqr.generateIndividual(individualInfo);

  return response;
}
