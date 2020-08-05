import * as PNotify from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

PNotify.defaults.width = '400px';

const get = key => {
  try {
    const jsonSet = localStorage.getItem(key);
    if (!jsonSet || jsonSet === undefined) {
      return {
        watched: [],
        queue: [],
      };
    } else {
      return JSON.parse(jsonSet);
    }
  } catch (err) {
    PNotify.error({
      text: `Get error: ${err}`,
    });
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    PNotify.error({
      text: `Set error: ${err}`,
    });
  }
};

export default {
  save,
  get,
};
