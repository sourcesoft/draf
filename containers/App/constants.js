/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOADING_SHOW = 'boilerplate/App/LOADING_SHOW';
export const LOADING_HIDE = 'boilerplate/App/LOADING_HIDE';
export const CHANGE_USER = 'boilerplate/App/CHANGE_USER';
export const LOGGED = 'boilerplate/App/LOGGED';
export const ROLE = 'boilerplate/App/ROLE';
