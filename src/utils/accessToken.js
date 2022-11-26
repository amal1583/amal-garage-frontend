import { Cookies } from ".";
export function accessTokenGet() {
    return Cookies.get("authtoken");
}
export function accessTokenSet(id) {
    Cookies.set("authtoken", id, 365)
}
export function accessTokenDelete() {
    Cookies.delete("authtoken")
}