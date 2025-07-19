import axios from "axios";

export const get = async (base: string, endpoint: string) => {
  try {
    const resp = await axios.get(base + endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp?.data) {
      return resp?.data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};

export const post = async (base: string, endpoint: string, body: any) => {
  try {
    const resp = await axios.post(base + endpoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp?.data) {
      return resp?.data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};

export const idp = async (base: string, endpoint: string, body: any) => {
  try {
    const resp = await axios.post(base + endpoint, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (resp?.data) {
      return resp?.data;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      return error?.response?.data;
    }
  }
};
