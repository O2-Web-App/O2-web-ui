export const paymentFunction = (amount: number | undefined) => {
  const {
    BakongKHQR,
    khqrData,

    MerchantInfo,
  } = require("bakong-khqr");
  const optionalData = {
    currency: khqrData.currency.usd,
    amount: amount,
    billNumber: "#0001",
    mobileNumber: "85587575857",
    storeLabel: "O2",
    terminalLabel: "Cam-O2",
  };

  const merchantInfo = new MerchantInfo(
    "phy_lymann@aclb",
    "Phy Lymann",
    "PHNOM PENH",
    1243546472,
    "KDEYKHQR",
    optionalData
  );
  const khqr = new BakongKHQR();
  const response = khqr.generateIndividual(merchantInfo);
  return response;
};
