# React + TypeScript + Vite Project
This front-end project is a supplement of my-reserva-api, and together they form a full-stack application,
simulating an appointment/reservation handler app for small businesses such as doctors, salons, barber-shops etc.
In its current state, the app provides a basic reservation UI where a user can: 
- Create an account
- Login
- Logout
- Make a reservation
- View their current reservations 
- Cancel reservations

An admin account (defined in the backend — e.g., admin@aueb.gr) can view all user reservations, 
filtered by the selected date.

---

# Technical Info

- ### Forms
  Register Form was implemented with states and simple Flowbite components
  to demonstrate understanding of form handling and validation.
  The best alternative for a cleaner outcome would be a React Hook Form.

---

# Room for improvement...
### #1 <br>
After expiry of access token, if no API call with axiosPrivate instance is made (ex. fetch reservations on Dashboard page),
the token does not get refreshed. I tried to implement getCurrentUser with axiosPrivate instance
and inject the instance from the AuthProvider. In this case, getCurrentUser signature in users.ts file, would be like this:
```js
export const getCurrentUser = async (axiosPrivate: AxiosInstance) => {...}
```
However, I get custom "useAuth must be used within useAuth" error.

### #2
Flowbite's ``` <NavbarLink> ``` component does not support ``` as={Link} ``` prop, so we cannot use 
React Router for faster navigation. Implementing custom ``` <Link> ``` elements would have been an
alternative but due to restricted amount of time, default Flowbite's elements were used.

--- 

## References

Calendar PNG & Favicon: https://freesvgicons.com/search?q=calendar <br>
User SVG: https://www.svgrepo.com/ <br>
Detective dog image (403 page): https://puns.co/