/**
 * Logging utility
 */
/* eslint-disable */
const isDebugModeOn = process.env.REACT_APP_DEBUG_MODE === 'true';
export default {
  /**
   * Whether the system is running in debug mode
   */
  isDebugMode: () => (
    isDebugModeOn
  ),

  /** Log the information when the debug mode is turned on */
  logWhenDebugModeIsOn: (l) => {
    if (isDebugModeOn) {
      console.groupCollapsed(l);
      console.log(l);
      console.trace(); // hidden in collapsed group
      console.groupEnd();
    }
  },

  logError: (l) => {
    console.groupCollapsed(l);
    console.error(l);
    console.trace(); // hidden in collapsed group
    console.groupEnd();
  },

  logWarn: (l) => {
    console.groupCollapsed(l);
    console.warn(l);
    console.trace(); // hidden in collapsed group
    console.groupEnd();
  }
};
