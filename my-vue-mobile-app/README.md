# My Vue Mobile App

This is a mobile application built using Vue.js. The app includes features for user authentication, basic information management, and address management.

## Project Structure

```
my-vue-mobile-app
├── public
│   ├── index.html          # Main HTML file
├── src
│   ├── assets              # Static assets (images, fonts, styles)
│   ├── components          # Vue components
│   │   ├── Login.vue       # Login component
│   │   ├── Signup.vue      # Signup component
│   │   ├── BasicInfo.vue   # Basic information component
│   │   ├── Address.vue      # Address management component
│   ├── router              # Vue Router configuration
│   │   └── index.js        # Routes definition
│   ├── views               # View components
│   │   ├── Home.vue        # Home view component
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point of the application
├── package.json            # npm configuration
├── babel.config.js         # Babel configuration
├── vue.config.js           # Vue CLI configuration
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-vue-mobile-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm run serve
   ```

5. Open your browser and go to `http://localhost:8080` to see the app in action.

## Features

- User login and signup functionality
- Basic information management
- Address management
- Responsive design for mobile devices

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see!