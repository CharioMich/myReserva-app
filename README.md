# React + TypeScript + Vite



## References

Calendar PNG & Favicon: https://freesvgicons.com/search?q=calendar

## Forms
Register Form was implemented with states and simple flowbite components
to demonstrate understanting of form handling and validation.
The best alternative for a cleaner outcome would be a React Hook Form.

## Bugs
After expiry of access token, if no API call with axiosPrivate instance is made (ex. fetch reservations on Dashboard page),
the token does not get refreshed. I tried to implement getCurrentUser with axiosPrivate instance
and inject the instance from the AuthProvider. In this case, getCurrentUser signature in users.ts file, would be like this:
```js
export const getCurrentUser = async (axiosPrivate: AxiosInstance) => {...}
```
However, I get custom "useAuth must be used within useAuth" error.
