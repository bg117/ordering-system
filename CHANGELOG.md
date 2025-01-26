## 0.11.1 (2025-01-26)

### Fix

- use S3 instead of cloudinary

## 0.11.0 (2025-01-26)

### Feat

- add cloudinary feature

## 0.10.3 (2024-12-31)

### Fix

- do not redirect admins to /menu

## 0.10.2 (2024-12-31)

### Fix

- remove export in ExportService

## 0.10.1 (2024-12-31)

### Fix

- add `key` prop in cart items

## 0.10.0 (2024-12-31)

### Feat

- make orders sort of realtime
- fill in order information with actual info from db
- allow totaling of orders
- implement queue
- i hate this so much
- add total field for order items
- add "order placed at" field in orders table
- add first name and last name columns to user table

### Fix

- ordering mechanism
- asc and desc is built in into the query param
- rename orderId to order

### Refactor

- switch to status instead of bool

## 0.9.3 (2024-12-30)

### Fix

- import PayloadCMS theme

## 0.9.2 (2024-12-30)

### Fix

- hide Admin context from logged out user
- login proceeding without checking

## 0.9.1 (2024-12-30)

### Fix

- breaking change from 3.0 beta

## 0.9.0 (2024-12-28)

### Feat

- add admin access

### Fix

- rename queue as orders

## 0.8.2 (2024-12-28)

### Fix

- use redirect while rendering

## 0.8.1 (2024-12-28)

### Fix

- margins
- remove unnecessary fields

## 0.8.0 (2024-12-28)

### Feat

- remove cart items when order placed
- allow placing of orders
- add "extra instructions" column in Orders table
- add thank you page

### Fix

- remove unique in order items
- remove user column from order items

## 0.7.0 (2024-12-28)

### Feat

- add remove item functionality
- allow user to change quantity of orders
- read from API cart items
- differentiate between unloaded user and no user

### Fix

- spacing in Additional Instructions below md
- margin after quantity control
- add to item should only trigger for single menu item
- **Login**: cast error type
- **MenuCard**: remove throw in menu card when fetching cart items

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
