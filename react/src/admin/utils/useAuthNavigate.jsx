// navigateUtil.js
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const navigateTo = (path) => {
    history.push(path);
};

export default history;