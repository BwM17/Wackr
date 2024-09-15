const wol = require("wake_on_lan");

export const wake = (MAC: string) => {
  wol.wake(MAC, (error: any) => {
    if (error) {
      throw new Error(`error while connecting to mac: ${error}`);
    }
  });
};

export default wake;
