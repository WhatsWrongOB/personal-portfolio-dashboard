function getOSAndBrowser() {
  const userAgent = navigator.userAgent;
  let os = "Unknown OS";
  let browser = "Unknown Browser";

  if (/Windows/i.test(userAgent)) {
    os = "Windows";
  } else if (/Macintosh/i.test(userAgent)) {
    os = "Mac OS";
  } else if (/Linux/i.test(userAgent)) {
    os = "Linux";
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
  } else if (/iPhone/i.test(userAgent)) {
    os = "iOS (iPhone)";
  } else if (/iPad/i.test(userAgent)) {
    os = "iOS (iPad)";
  }

  if (/Chrome/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/Firefox/i.test(userAgent)) {
    browser = "Firefox";
  } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    browser = "Safari";
  } else if (/MSIE/i.test(userAgent) || /Trident/i.test(userAgent)) {
    browser = "Internet Explorer";
  } else if (/Edge/i.test(userAgent)) {
    browser = "Edge";
  }

  return `${os} - ${browser}`;
}

const useGetToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("token"));
    if (!user) return null;
    return user.token;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export { useGetToken, getOSAndBrowser };
