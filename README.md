# <u>React + TypeScript + Vite Project </u>

This front-end project is a supplement to my-reserva-api, and together they form a full-stack application,
simulating an appointment/reservation handler app for small businesses such as doctors, salons, barber-shops etc.
In its current state, the app provides a basic reservation UI where a user can: 
- Create an account
- Login
- Logout
- Make a reservation
- View their current reservations 
- Cancel reservations

An admin account (defined in the backend -> \[admin whitelist\] -> admin@aueb.gr) can view all user reservations, 
filtered by the selected date.

---

# <u> Technical Info </u>

- ## Forms
  Project's forms were implemented with states, zod validation and simple Flowbite components
  to demonstrate understanding of form handling and validation.
  The best alternative for a cleaner outcome would be a React Hook Form.



- ## Room for improvement...
  ### # 1 <br>
  After the expiry of access token, if no API call with axiosPrivate instance is made (ex. fetch reservations on Dashboard page),
  the token does not get refreshed. We could implement getCurrentUser with an axiosPrivate instance, but
  since axiosPrivate (useAxiosPrivate.ts) is using useAuth under the hood, when trying to call it or inject it in  useEffect of
  AuthProvider.tsx we get an error because no auth context has yet been initialized. Something like a chicken-and-egg problem. <br>
  getCurrentUser signature in users.ts file, would look something like this:
  
  ```js
  export const getCurrentUser = async (axiosPrivate: AxiosInstance) => {...}
  ```
  We would create the axiosInstance in the AuthProvider.tsx and inject it into the getCurrentUser function, but that's 
  not possible for the reason mentioned above. 
  
  ### # 2
  Flowbite's ``` <NavbarLink> ``` component does not support ``` as={Link} ``` prop, so we cannot use 
  React Router for faster navigation. Implementing custom ``` <Link> ``` elements would have been an
  alternative but due to restricted amount of time, default Flowbite's elements and ``` href ``` were used.

--- 

## <u>References</u>

Calendar PNG & Favicon: https://freesvgicons.com/search?q=calendar <br>
User SVG: https://www.svgrepo.com/ <br>
Detective dog image (403 page): https://puns.co/