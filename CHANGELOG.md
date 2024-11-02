## 0.6.0 (2024-11-02)

### BREAKING CHANGE

- Remove carts table and leave only CartItems

### Feat

- **MenuCard**: add proper add to card functionality
- remove Carts table
- **Menu**: fetch menu items from API

### Fix

- **Header**: remove throw when querying CartItems
- **Header**: get actual cart items count
- use id in query object
- **MenuCard**: move price and add to cart to bottom
- **MenuCard**: fix menu card rendering

### Refactor

- remove test data

## 0.5.0 (2024-10-31)

### Feat

- add TanStack react-query
- create new OrderItems table
- **CartItems**: add user as field in CartItems
- **Users**: create new Cart whenever a new User is created

### Fix

- update payload types
- update payload types
- **CartItems**: remove placed column
- **Orders**: use users instead of carts as identifier
- **CartItems**: fix access control for RUD
- add access control

## 0.4.0 (2024-10-31)

### Feat

- **Header**: enable logout
- add AuthContextProvider
- **CartItems**: add placed column in cart item
- create new queue table
- add separate cart items table
- add carts table
- add new Items table for food
- **Users**: add grade and section columns
- add new users table
- add PayloadCMS

### Fix

- **AuthContextProvider**: fix api link
- **AuthContextProvider**: replace useState with useEffect
- **Orders**: rename Queue to Orders
- **Carts**: rename Cart to Carts
- **Cart**: remove items relation from table
- **globals.scss**: remove erroneous bootstrap import

### Refactor

- **utilities/api.ts**: refactor API fetch into separate function
- **utilities/payload**: remove utilities/payload/index.ts
- delete utilities/user.ts
- **Layout**: use useAuth for getting user data
- replace supabase auth with Payload auth
- **MenuCard**: change arrow function into normal function
