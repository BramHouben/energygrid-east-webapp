import Cookies from "universal-cookie";

export function setAuthorizationCookie(authorizationTokes) {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  const cookie = new Cookies();
  cookie.remove("jwt", { path: "/" });
  cookie.set("jwt", authorizationTokes, {
    path: "/",
    expires: expirationDate,
    sameSite: true,
    secure: false,
  });
}

export function getJwt() {
  const cookie = new Cookies();
  return cookie.get("jwt");
}
