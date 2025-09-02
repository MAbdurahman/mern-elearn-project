# mern-elearn-project

## Features
- MongoDB, Express.js, ReactJS, and Node.js
- Authentication and Authorization with JWT
- Clerk
- Cloudinary
- Stripe

### Create config.env file in config directory
```env
# Useful Variables
PORT=
NODE_ENV=
BACKEND_URL=
FRONTEND_URL=
API_ENV=
PAGINATION_LIMIT=
CURRENCY="USD"

# MongoDB Setup
MONGO_DB_URI=

# JSON Web Token
JWT_SECRET=
JWT_EXPIRES_TIME=
JWT_LIFETIME='400d'

# Clerk Setup
CLERK_WEBHOOK_SECRET= 
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY= 

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

# Stripe Setup
STRIPE_SECRET_KEY=
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PUBLISHABLE_KEY=

# PayPal Setup
PAYPAL_CLIENT_ID=
PAYPAL_SECRET_KEY=
PAYPAL_API_URL=

```
### Start the app
```shell
npm install
```
or 
```shell
yarn or yarn install
```
then
```shell
npm run start
```
or 

```shell
yarn start
```

### Build the app
```shell
npm run build
```
or 

```shell
yarn build
```