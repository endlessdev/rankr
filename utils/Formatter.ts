export let changeFormattedStatus = (status: string) => {
    if(!status) return null;
    if (status.indexOf("상승") != -1 || status.indexOf("+") != -1) {
        return "up";
    } else if (status.indexOf("하락") != -1 || status.indexOf("-") != -1) {
        return "down";
    } else {
        return "new";
    }
};